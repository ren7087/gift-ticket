import {
  AppBar,
  Button,
  IconButton,
  Link,
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

type Props = {
  page?: string
}

const Navbar: FC<Props> = (props) => {
  const matches: boolean = useMediaQuery('(min-width:639px)')
  const { page } = props
  const router = useRouter()
  const { session, signOut, signInWithGoogle } = UseUser()
  const [loginUser, setLoginUser] = useState<Session | null>(null)
  const getSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setLoginUser(session)
  }
  useEffect(() => {
    getSession()
  }, [])
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
          >
            <AccountCircleIcon onClick={() => router.push(`/settings/`)} />
          </IconButton>

          {loginUser ? (
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              size="large"
              onClick={() => signOut()}
              style={{ backgroundColor: 'white' }}
            >
              {matches && 'サインアウト'}
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              size="large"
              onClick={() => signInWithGoogle()}
              style={{ backgroundColor: 'black' }}
            >
              {matches && 'ログイン'}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
