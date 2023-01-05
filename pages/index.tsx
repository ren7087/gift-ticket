import type { NextPage } from 'next'
import Head from 'next/head'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Image from 'next/image'
import { Layout } from '../components/Layout'
import Typography from '@mui/material/Typography'
import { Button, Container, Grid } from '@mui/material'
import { Box } from '@mui/system'
import CardCreate from '../components/Card/Create'
import CardTransfer from '../components/Card/Transfer'
import CardGet from '../components/Card/Get'
import UseUser from '../hooks/useUser'
import GoogleIcon from '@mui/icons-material/Google'
import supabase from '../utils/supabase-client'
import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Home: NextPage = () => {
  const { signOut, signInWithGoogle } = UseUser()
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
    <Layout title="home">
      <Container
        maxWidth="xl"
        style={{
          textAlign: 'center',
          backgroundColor: 'white',
          width: '100%',
          display: 'flex',
        }}
      >
        <div style={{ width: '50%' }}>
          <Image
            src="/img/top/top.jpg"
            width={600}
            height={600}
            alt="head img"
          />
        </div>
        <div style={{ width: '50%', marginLeft: '10%' }}>
          <Typography
            variant="h3"
            style={{
              fontWeight: 'bold',
              marginBottom: '5%',
              marginTop: '190px',
            }}
          >
            GIFTticket
          </Typography>
          <Typography variant="h3" style={{ fontWeight: 'bold', margin: '5%' }}>
            「 GIFT 」
          </Typography>
          {loginUser ? (
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              size="large"
              onClick={() => {
                signOut()
                setLoginUser(null)
              }}
              style={{ backgroundColor: 'white' }}
            >
              サインアウト
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              size="large"
              onClick={() => signInWithGoogle()}
              style={{ backgroundColor: 'black' }}
            >
              ログイン
            </Button>
          )}
        </div>
      </Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item style={{ padding: 0 }}>
              <CardCreate />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{ padding: 0 }}>
              <CardTransfer userId={loginUser?.user.id || ''} />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{ padding: 0 }}>
              <CardGet />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Home
