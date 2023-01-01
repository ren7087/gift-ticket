import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import GoogleIcon from '@mui/icons-material/Google'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import React from 'react'
import UseUser from '../hooks/useUser'
import { useRouter } from 'next/router'

const Navbar = () => {
	const router = useRouter()
	const { session, signOut, signInWithGoogle } = UseUser()
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<ArrowBackIosIcon onClick={() => router.push('/')} />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Create
					</Typography>
					{session ? (
						<Button
							variant="outlined"
							startIcon={<GoogleIcon />}
							size="large"
							onClick={() => signOut()}
						>
							サインアウト
						</Button>
					) : (
						<Button
							variant="contained"
							startIcon={<GoogleIcon />}
							size="large"
							onClick={() => signInWithGoogle()}
						>
							googleでログイン
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar
