import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'

const CardCreate = () => {
	const router = useRouter()
	const handleRoute = () => {
		router.push('/customize')
	}
	return (
		<Card
			sx={{ minWidth: 275 }}
			style={{ border: '10px solid #e7c9bd' }}
			onClick={handleRoute}
		>
			<CardContent>
				<Image
					src="/img/card/create.jpg"
					width={200}
					height={200}
					alt="head img"
				/>
				<Typography variant="h4" style={{ fontWeight: 'bold' }}>
					CREATE
				</Typography>
			</CardContent>
		</Card>
	)
}

export default CardCreate
