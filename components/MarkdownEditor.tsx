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
  Alert,
  AlertTitle,
  Button,
  IconButton,
  InputBase,
  Snackbar,
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
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import CloseIcon from '@mui/icons-material/Close'

interface inputData {
  [prop: string]: any
}

type Props = {
  userId: string
}

const MarkdownEditor = (props: Props) => {
  const { userId } = props
  // 初期描画
  const [loading, setLoading] = useState(true)
  //loginUser取得
  const [loginUser, setLoginUser] = useState<Session | null>()
  const [writing, setWriting] = useState<boolean>(true)
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

    dispatch(
      setEditedArticle({
        ...editedArticle,
        userId: userId,
        content: localStorage.getItem('EditorContent') || '',
      })
    )
  }, [])

  const [switchBoolean, setSwitchBoolean] = useState(false)
  // const { session } = UseUser()
  const dispatch = useDispatch()
  const editedArticle = useSelector(selectArticle)
  const { createArticleMutation } = useAppMutate()
  console.log(userId)
  console.log('editedArticle.userId', editedArticle.userId)

  // {
  //   session && console.log('session', session)
  // }

  // storage の key から bucket 名を取り除く
  const removeBucketPath = (key: string, bucketName: string) => {
    return key.slice(bucketName.length + 1) // "/"の分だけ加算している
  }

  const imageUploadFunction = async (event: any) => {
    const uuid = uuidv4()
    const newImageKey = uuid.split('-')[uuid.split('-').length - 1]

    const file = event.target.files[0] // 選択された画像を取得

    try {
      const { data: inputData }: inputData = await supabase.storage
        .from('images')
        .upload(`${loginUser?.user.id}/${newImageKey}`, file, {
          cacheControl: '3600',
          upsert: true,
        })
    } catch (e) {
      console.log(e)
    }

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
    dispatch(
      setEditedArticle({
        ...editedArticle,
        content:
          editedArticle.content +
          `<img src=${publicURL.data.publicUrl} width='250px' height='250px' />`,
      })
    )
  }

  const autoUploadImage = useMemo(() => {
    return {
      uploadImage: true,
      imageUploadFunction,
    }
  }, [])

  const localstorageRegister = () => {
    setWriting(!writing)
    console.log(editedArticle.content)
    if (writing) {
      localStorage.setItem('EditorContent', editedArticle.content)
    }
  }

  const handleSwitch = (e: any) => {
    e.preventDefault()
    setSwitchBoolean(!switchBoolean)
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createArticleMutation.mutate(editedArticle)
    // 投稿成功した時のアラート
    setOpen(true)
  }

  // 投稿成功した時のアラート  TODO : アラート系は一つにまとめたい
  const [open, setOpen] = React.useState(false)
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  if (createArticleMutation.error) {
    return <div>{'Error'}</div>
  }

  if (!loginUser) {
    return <p>このページはログイン必須です</p>
  }
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="投稿完了しました！"
        action={action}
      />

      <Navbar />

      <Alert severity="success" style={{ width: '50%', margin: '2% 0 0 10%' }}>
        <AlertTitle>記載の流れ</AlertTitle>
        内容を記載する
        <br /> &gt; 内容を保存する
        <br /> &gt; タイトルを記入する
        <br /> &gt; 完成ボタンをクリック！
      </Alert>

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

      <div style={{ display: 'flex' }}>
        {switchBoolean === false ? (
          <SimpleMDE
            value={editedArticle.content}
            onChange={(value: any) =>
              dispatch(setEditedArticle({ ...editedArticle, content: value }))
            }
            // options={{ autoUploadImage, toolbar: toolbar }}
            // @ts-ignore
            options={{ autoUploadImage, autofocus: writing ? true : '' }}
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
          <IconButton
            color="inherit"
            aria-label="upload picture"
            component="label"
            size="large"
            style={{
              height: '48px',
              width: '96px',
            }}
          >
            <input hidden type="file" onChange={imageUploadFunction} />
            <PhotoCamera />
          </IconButton>

          <ToggleButtonGroup
            exclusive
            onChange={handleSwitch}
            aria-label="text alignment"
            style={{ marginTop: '20px' }}
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

          <Button
            variant="contained"
            style={{
              marginTop: '20px',
              height: '48px',
              width: '96px',
              backgroundColor: writing ? 'black' : 'white',
              color: writing ? 'white' : 'black',
              fontSize: '2px',
            }}
            type="button"
            onClick={localstorageRegister}
          >
            {writing ? '内容保存する' : '再度入力する'}
          </Button>

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
              完成！
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditor
