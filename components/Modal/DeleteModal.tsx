import { Box, Button, Modal, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useAppMutate } from '../../hooks/useAppMutate'

type Props = {
  open: boolean
  articleId: string
  handleCloseDeleteModal: () => void
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

const DeleteModal: FC<Props> = (props) => {
  const { open, articleId, handleCloseDeleteModal } = props
  const { deleteArticleMutation } = useAppMutate()
  const router = useRouter()

  const deleteArticle = () => {
    try {
      deleteArticleMutation.mutate(articleId)
      router.reload()
    } catch (e) {
      alert('削除が成功しませんでした。')
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleCloseDeleteModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          本当に削除してよろしいですか？
        </Typography>
        <div style={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            onClick={handleCloseDeleteModal}
            style={{
              margin: '5% 5% 0 5%',
              backgroundColor: 'white',
              color: '#1976D2',
            }}
          >
            いいえ
          </Button>
          <Button
            variant="contained"
            onClick={deleteArticle}
            style={{ margin: '5% 5% 0 5%' }}
          >
            はい
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default DeleteModal
