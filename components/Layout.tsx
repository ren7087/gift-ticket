import { FC, ReactNode } from 'react'
import Head from 'next/head'

interface Props {
	children: ReactNode
	title: string
}

export const Layout: FC<Props> = ({ children, title = 'GIFT' }) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<header></header>
			<main>{children}</main>
		</div>
	)
}
