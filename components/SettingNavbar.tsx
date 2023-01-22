import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CreateIcon from '@mui/icons-material/Create'
import AccessibilityIcon from '@mui/icons-material/Accessibility'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import { useRouter } from 'next/router'

const SettingNavbar = () => {
  const [value, setValue] = React.useState(0)
  const router = useRouter()
  useEffect(() => {
    if (router.pathname == '/settings/friends') {
      setValue(1)
    }
    if (router.pathname == '/settings/friendAdd') {
      setValue(2)
    }
  }, [])
  const handleRouteYourId = () => {
    router.push(`/settings`)
  }
  const handleRouteFriend = () => {
    router.push(`/settings/friends`)
  }
  const handleRouteFriendAdd = () => {
    router.push(`/settings/friendAdd`)
  }
  console.log(value)
  return (
    <Box style={{ margin: '3% 20%', width: '60%' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <BottomNavigationAction
          label="YourId"
          icon={<AccessibilityIcon />}
          onClick={handleRouteYourId}
        />
        <BottomNavigationAction
          label="Friend"
          icon={<Diversity3Icon />}
          onClick={handleRouteFriend}
        />
        <BottomNavigationAction
          label="Add"
          icon={<CreateIcon />}
          onClick={handleRouteFriendAdd}
        />
      </BottomNavigation>
    </Box>
  )
}

export default SettingNavbar
