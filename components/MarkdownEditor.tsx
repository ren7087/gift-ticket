import React, { useMemo, useState, FormEvent, useEffect } from 'react'
import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})
import { v4 as uuidv4 } from 'uuid'
import 'easymde/dist/easymde.min.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import supabase from '../utils/supabase-client'
import {
  Button,
  InputBase,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import FastForwardIcon from '@mui/icons-material/FastForward'
import UseUser from '../hooks/useUser'
import { useAppMutate } from '../hooks/useAppMutate'
import { useSelector, useDispatch } from 'react-redux'
import { setEditedArticle, selectArticle } from '../slices/article'
import Navbar from './Navbar'
import { Session } from '@supabase/supabase-js'

interface inputData {
  [prop: string]: any
}

const MarkdownEditor = () => {
  //loginUser取得
  const [loginUser, setLoginUser] = useState<Session | null>()
  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session) {
      setLoginUser(session)
    }
  }
  useEffect(() => {
    getSession()
  }, [])

  // const [markdownValue, setMarkdownValue] = useState('')
  const [switchBoolean, setSwitchBoolean] = useState(false)
  const { session } = UseUser()
  const dispatch = useDispatch()
  const editedArticle = useSelector(selectArticle)
  const { createArticleMutation } = useAppMutate()

  {
    session && console.log('session', session)
  }

  // storage の key から bucket 名を取り除く
  const removeBucketPath = (key: string, bucketName: string) => {
    return key.slice(bucketName.length + 1) // "/"の分だけ加算している
  }

  const imageUploadFunction = async (
    file:
      | string
      | File
      | Blob
      | ArrayBuffer
      | ArrayBufferView
      | Buffer
      | FormData
      | NodeJS.ReadableStream
      | ReadableStream<Uint8Array>
      | URLSearchParams
  ) => {
    const uuid = uuidv4()
    const newImageKey = uuid.split('-')[uuid.split('-').length - 1]

    const { data: inputData }: inputData = await supabase.storage
      .from('images')
      .upload(`${loginUser?.user.id}/${newImageKey}`, file, {
        cacheControl: '3600',
        upsert: true,
      })

    const key = `images/${loginUser?.user.id}/${newImageKey}`

    if (!key) {
      throw new Error('Error')
    }

    // .from() で bucket 指定しているので、getPublicUrl() に渡すパスからは、bucket 名は取り除く必要がある
    // NG: images/25aea8bc-aa5e-42ce-b099-da8815c2a50f/fdf945886dfd
    // OK: 25aea8bc-aa5e-42ce-b099-da8815c2a50f/fdf945886dfd
    const publicURL = supabase.storage
      .from('images')
      .getPublicUrl(removeBucketPath(key, 'images'))

    // DBにレコード作成
    await supabase.from('images').insert([
      {
        userId: loginUser?.user.id,
        src: publicURL,
      },
    ])
    alert(
      'FileName [ ' +
        publicURL.data.publicUrl +
        ' ] コピーし、エディター内で入力してください。'
    )
  }

  const autoUploadImage = useMemo(() => {
    return {
      uploadImage: true,
      imageUploadFunction,
    }
  }, [])

  // const onChange = (value: React.SetStateAction<string>) => {
  // 	setMarkdownValue(value)
  // }
  // const onChange = (e: any) => {
  // 	dispatch(setEditedArticle({ ...editedArticle, content: e.target.value }))
  // }

  const handleSwitch = (e: any) => {
    e.preventDefault()
    setSwitchBoolean(!switchBoolean)
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createArticleMutation.mutate(editedArticle)
  }

  // const toolbar = [
  //   'bold',
  //   'italic',
  //   'heading',
  //   '|',
  //   'quote',
  //   'unordered-list',
  //   'ordered-list',
  //   '|',
  //   'link',
  //   'image',
  //   '|',
  //   'preview',
  //   'side-by-side',
  //   'fullscreen',
  //   '|',
  //   'guide',
  // ]

  if (createArticleMutation.error) {
    return <div>{'Error'}</div>
  }

  if (!loginUser) {
    return <p>このページはログイン必須です</p>
  }
  return (
    <div>
      <Navbar />

      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Title"
        value={editedArticle.title}
        onChange={(e) =>
          dispatch(
            setEditedArticle({ ...editedArticle, title: e.target.value })
          )
        }
        style={{ width: '80%', margin: '20px 10% 5px', fontSize: '30px' }}
      />

      {/* {editedArticle.userId !== '' ? (
        <InputBase
          disabled
          value={editedArticle.userId}
          onChange={() =>
            dispatch(
              setEditedArticle({
                ...editedArticle,
                // @ts-ignore
                userId: session?.user.id,
              })
            )
          }
          style={{ width: '80%', margin: '0 10%', fontSize: '15px' }}
        />
      ) : ( */}
      <InputBase
        // disabled
        value={editedArticle.userId}
        placeholder="IDを入力 : プロフィール欄から確認できます"
        onChange={(e) =>
          dispatch(
            setEditedArticle({
              ...editedArticle,
              userId: e.target.value,
            })
          )
        }
        style={{ width: '80%', margin: '0 10%', fontSize: '15px' }}
      />
      {/* )} */}

      <div style={{ display: 'flex' }}>
        {switchBoolean === false ? (
          <SimpleMDE
            // value={markdownValue}
            // onChange={onChange}
            value={editedArticle.content}
            onChange={(value: any) =>
              dispatch(setEditedArticle({ ...editedArticle, content: value }))
            }
            // options={{ autoUploadImage, toolbar: toolbar }}
            // @ts-ignore
            options={{ autoUploadImage }}
            style={{ width: '70%', margin: '0 5% 0 10%' }}
          />
        ) : (
          <div style={{ width: '70%', margin: '0 5% 0 10%' }}>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              remarkPlugins={[remarkGfm]}
            >
              {/* {markdownValue} */}
              {editedArticle.content}
            </ReactMarkdown>
          </div>
        )}
        <div style={{ width: '10%', marginRight: ' 5%' }}>
          <ToggleButtonGroup
            exclusive
            onChange={handleSwitch}
            aria-label="text alignment"
          >
            <ToggleButton
              value="false"
              selected={!switchBoolean}
              aria-label="left aligned"
            >
              <CreateIcon />
            </ToggleButton>
            <ToggleButton
              value="true"
              selected={switchBoolean}
              aria-label="centered"
            >
              <FastForwardIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          <form onSubmit={submitHandler}>
            <Button
              variant="contained"
              style={{
                marginTop: '20px',
                height: '48px',
                width: '96px',
                backgroundColor: 'black',
              }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditor
