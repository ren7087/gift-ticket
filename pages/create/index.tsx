import { FormEvent, SetStateAction, useEffect, useMemo, useState } from 'react'
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  RichUtils,
  AtomicBlockUtils,
} from 'draft-js'
import 'draft-js/dist/Draft.css'
import createImagePlugin from '@draft-js-plugins/image'

const Index = () => {
  const plugins = useMemo(() => {
    const imagePlugin = createImagePlugin()
    return imagePlugin
  }, [])

  const [editorEnable, setEditorEnable] = useState(false)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const saveContent = () => {
    const contentState = editorState.getCurrentContent()
    const raw = convertToRaw(contentState)
    console.log(raw)
    localStorage.setItem('test', JSON.stringify(raw, null, 2))
  }

  const toggleBold = (e: any) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  const toggleHeaderOne = (e: any) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'))
  }

  const onChange = (value: SetStateAction<EditorState>) => {
    setEditorState(value)
  }

  const handleDroppedFiles = (selection: any, files: any) => {
    console.log(files)
    //サーバに保存する処理　画像のURLが戻される
    insertImage()
  }

  const insertImage = () => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { url: 'https://placehold.jp/600x600.png' }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    })
    onChange(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))
  }

  useEffect(() => {
    setEditorEnable(true)
    const raw = localStorage.getItem('test')
    if (raw) {
      const contentState = convertFromRaw(JSON.parse(raw))
      const newEditorState = EditorState.createWithContent(contentState)
      setEditorState(newEditorState)
    }
  }, [])

  return (
    <div>
      <div>
        <button onClick={saveContent}>保存</button>
        <button onClick={toggleBold}>太字</button>
        <button onClick={toggleHeaderOne}>h1</button>
      </div>
      {editorEnable && (
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder="ここから入力を行ってください。"
          plugins={plugins}
          //@ts-ignore
          handleDroppedFiles={handleDroppedFiles}
        />
      )}
    </div>
  )
}
export default Index
