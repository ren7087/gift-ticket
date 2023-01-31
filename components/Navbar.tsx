import {
  AppBar,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Box } from '@mui/system'
import GoogleIcon from '@mui/icons-material/Google'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import React, { FC, useEffect, useState } from 'react'
import UseUser from '../hooks/useUser'
import { useRouter } from 'next/router'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Session } from '@supabase/supabase-js'
import supabase from '../utils/supabase-client'
import CreateIcon from '@mui/icons-material/Create'
import AccessibilityIcon from '@mui/icons-material/Accessibility'
import Diversity3Icon from '@mui/icons-material/Diversity3'

type Props = {
  page?: string
}

const Navbar: FC<Props> = (props) => {
  const matches: boolean = useMediaQuery('(min-width:639px)')
  const { page } = props
  const router = useRouter()
  const { session, signOut, signInWithGoogle } = UseUser()
  const [loginUser, setLoginUser] = useState<Session | null>(null)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setLoginUser(session)
  }
  useEffect(() => {
    getSession()
  }, [])

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const signOutNav = () => {
    signOut()
  }
  const signInWithGoogleNav = () => {
    signInWithGoogle()
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        style={{ backgroundColor: 'white' }}
      >
        <Toolbar>
          {page !== 'home' && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              style={{ color: 'black' }}
            >
              <ArrowBackIosIcon onClick={() => router.push('/')} />
            </IconButton>
          )}
          {matches && (
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ color: 'black', fontWeight: 'bold' }}
            >
              Gift
            </Typography>
          )}

          <Link
            href={`/customize/${loginUser?.user.id}`}
            underline="none"
            style={{ color: 'black', fontWeight: 'bold', margin: '0 2%' }}
          >
            Create
          </Link>
          <Link
            href={`/transfer/${loginUser?.user.id}`}
            underline="none"
            style={{ color: 'black', fontWeight: 'bold', margin: '0 2%' }}
          >
            Transfer
          </Link>
          <Link
            href={`/get/${loginUser?.user.id}`}
            underline="none"
            style={{ color: 'black', fontWeight: 'bold', margin: '0 2%' }}
          >
            Get
          </Link>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            style={{ color: 'black', margin: '0 4%' }}
            onClick={handleMenu}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {!loginUser && (
              <MenuItem
                onClick={signInWithGoogleNav}
                style={{ textAlign: 'center' }}
              >
                <GoogleIcon style={{ padding: '3% 5% 3% 1%' }} />
                ログイン
              </MenuItem>
            )}
            <MenuItem
              onClick={() => router.push(`/settings`)}
              style={{ textAlign: 'center' }}
            >
              <AccessibilityIcon style={{ padding: '3% 5% 3% 1%' }} />
              setting
            </MenuItem>
            <MenuItem
              onClick={() => router.push(`/settings/friends`)}
              style={{ textAlign: 'center' }}
            >
              <Diversity3Icon style={{ padding: '3% 5% 3% 1%' }} />
              friends
            </MenuItem>
            <MenuItem
              onClick={() => router.push(`/settings/friendAdd`)}
              style={{ textAlign: 'center' }}
            >
              <CreateIcon style={{ padding: '3% 5% 3% 1%' }} />
              Add
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
