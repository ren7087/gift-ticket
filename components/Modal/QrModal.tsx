import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import QRCode from 'react-qr-code'

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
            style={{ paddingBottom: '5%' }}
          >
            送信先
          </Typography>
          <TextField
            id="outlined-basic"
            label="user"
            variant="outlined"
            style={{ paddingBottom: '5%' }}
          />
          <Button variant="contained">submit</Button>
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
