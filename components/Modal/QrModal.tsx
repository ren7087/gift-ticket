import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React, { FC, FormEvent, useState } from 'react'
import QRCode from 'react-qr-code'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useAppMutate } from '../../hooks/useAppMutate'
import {
  selectArticleStatus,
  setEditedArticleStatus,
} from '../../slices/articleStatus'

type Props = {
  open: boolean
  articleId: string
  display: string
  handleCloseQrModal: () => void
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
  display: 'flex',
}

const QrModal: FC<Props> = (props) => {
  const { open, articleId, handleCloseQrModal } = props

  console.log('articleId', articleId)

  const dispatch = useDispatch()
  const editedArticleStatus = useSelector(selectArticleStatus)
  const { createArticleStatusMutation } = useAppMutate()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createArticleStatusMutation.mutate(editedArticleStatus)
  }

  return (
    <Modal
      open={open}
      onClose={handleCloseQrModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <Typography
            id="modal-modal-title"
            variant="body1"
            style={{ paddingBottom: '5%', fontWeight: 'bold' }}
          >
            送信先
          </Typography>
          <TextField
            label="email"
            variant="outlined"
            value={editedArticleStatus.receiverId}
            onChange={(e) =>
              dispatch(
                setEditedArticleStatus({
                  ...editedArticleStatus,
                  receiverId: e.target.value,
                })
              )
            }
            style={{ paddingBottom: '5%' }}
          />
          <TextField
            label="article"
            variant="outlined"
            value={editedArticleStatus.articleId}
            onChange={(e) =>
              dispatch(
                setEditedArticleStatus({
                  ...editedArticleStatus,
                  articleId: e.target.value,
                })
              )
            }
            style={{ paddingBottom: '5%' }}
          />
          <form onSubmit={submitHandler}>
            <Button
              variant="contained"
              style={{
                backgroundColor: 'black',
              }}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
        <div style={{ margin: '10% 10%' }}>
          <p>or</p>
        </div>
        <QRCode
          size={100}
          style={{ height: 'auto', maxWidth: '100%', width: '200px' }}
          value={articleId}
          viewBox={`0 0 256 256`}
        />
      </Box>
    </Modal>
  )
}

export default QrModal
