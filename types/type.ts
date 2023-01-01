export interface Articles {
	id: string
	userId: string
	title: string
	content: string
}

export interface EditArticle {
	userId: string
	title: string
	content: string
}
