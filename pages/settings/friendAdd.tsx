import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Navbar from '../../components/Navbar'
import SettingNavbar from '../../components/SettingNavbar'

const friendAdd = () => {
  return (
    <div>
      <Navbar />
      <SettingNavbar />
      <div
        style={{
          margin: '2% 30% 10% 30%',
          backgroundColor: '#F1F5F9',
          padding: '10%',
          height: '100px',
          width: '20%',
          textAlign: 'center',
          borderRadius: '10px',
        }}
      >
        <div style={{ marginBottom: '30px' }}>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </div>
        <Button variant="contained">Contained</Button>
      </div>
    </div>
  )
}

export default friendAdd
