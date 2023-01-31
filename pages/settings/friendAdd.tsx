import { Button, TextField } from '@mui/material'
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
          margin: '2% 20% 10% 20%',
          backgroundColor: '#F1F5F9',
          padding: '20%',
          height: '100px',
          width: '20%',
          textAlign: 'center',
          borderRadius: '10px',
        }}
      >
        <h3 style={{ marginTop: '-25%' }}>友人を追加</h3>
        <div style={{ marginBottom: '30px' }}>
          <TextField id="outlined-basic" label="userId" variant="outlined" />
        </div>
        <Button variant="contained">register</Button>
      </div>
    </div>
  )
}

export default friendAdd
