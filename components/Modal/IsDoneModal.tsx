import { Box, Checkbox, Modal, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import 'easymde/dist/easymde.min.css'

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
  const [checked, setChecked] = React.useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  return (
    <Modal
      open={open}
      onClose={handleCloseIsDoneModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          使用済みにする
        </Typography>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Box>
    </Modal>
  )
}

export default IsDoneModal
