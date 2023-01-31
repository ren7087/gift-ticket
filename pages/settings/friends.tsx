import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../../components/Navbar'
import SettingNavbar from '../../components/SettingNavbar'

const Friends = () => {
  return (
    <div>
      <Navbar />
      <SettingNavbar />
      <div style={{ margin: '10%' }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Friends
