import { Box, Modal, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import { Articles } from '../../types/type'
import 'easymde/dist/easymde.min.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

type Props = {
  open: boolean
  article: string
  handleCloseDetailModal: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '6px',
  boxShadow: 24,
  p: 4,
}

const DetailModal: FC<Props> = (props) => {
  const { open, article, handleCloseDetailModal } = props
  return (
    <Modal
      open={open}
      onClose={handleCloseDetailModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          remarkPlugins={[remarkGfm]}
        >
          {article}
        </ReactMarkdown>
      </Box>
    </Modal>
  )
}

export default DetailModal
