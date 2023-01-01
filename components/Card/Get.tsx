import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'

const CardGet = () => {
	const router = useRouter()
	const handleRoute = () => {
		router.push('/get')
	}
	return (
		<Card
			sx={{ minWidth: 275 }}
			style={{ border: '10px solid #c3b58a' }}
			onClick={handleRoute}
		>
			<CardContent>
				<Image
					src="/img/card/get.jpg"
					width={200}
					height={200}
					alt="head img"
				/>
				<Typography variant="h4" style={{ fontWeight: 'bold' }}>
					GET
				</Typography>
			</CardContent>
		</Card>
	)
}

export default CardGet
