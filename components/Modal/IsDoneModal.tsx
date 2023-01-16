import { Box, Button, Checkbox, Modal, Typography } from '@mui/material'
import React, { FC, FormEvent, useState } from 'react'
import 'easymde/dist/easymde.min.css'
import { useAppMutate } from '../../hooks/useAppMutate'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectArticleStatus,
  setEditedArticleStatus,
} from '../../slices/article'

type Props = {
  open: boolean
  articleId: string
  handleCloseIsDoneModal: () => void
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
  textAlign: 'center',
  p: 4,
}

const IsDoneModal: FC<Props> = (props) => {
  const { open, articleId, handleCloseIsDoneModal } = props

  const dispatch = useDispatch()
  const editedArticleStatus = useSelector(selectArticleStatus)
  const { updateArticleStatusMutation } = useAppMutate()

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateArticleStatusMutation.mutate(editedArticleStatus)
    handleCloseIsDoneModal() //これ必要ないかも
  }

  return (
    <Modal
      open={open}
      onClose={handleCloseIsDoneModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={submitHandler}>
          <Typography variant="h6" gutterBottom>
            使用済みにする
          </Typography>
          <Checkbox
            checked={editedArticleStatus.isDone}
            onChange={(event) =>
              dispatch(
                setEditedArticleStatus({
                  ...editedArticleStatus,
                  isDone: event.target.checked,
                })
              )
            }
            inputProps={{ 'aria-label': 'controlled' }}
          />
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
      </Box>
    </Modal>
  )
}

export default IsDoneModal
