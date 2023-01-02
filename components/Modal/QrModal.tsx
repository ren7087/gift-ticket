import { Box, Modal, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import QRCode from 'react-qr-code'

type Props = {
  open: boolean
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
}

const QrModal: FC<Props> = (props) => {
  const { open, handleCloseQrModal } = props

  return (
    <Modal
      open={open}
      onClose={handleCloseQrModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <QRCode
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value="https://qiita.com/"
          viewBox={`0 0 256 256`}
        />
      </Box>
    </Modal>
  )
}

export default QrModal
