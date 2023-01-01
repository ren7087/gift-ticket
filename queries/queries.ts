import { gql } from 'graphql-request'

export const CREATE_ARTICLE = gql`
	mutation CreateArtcle($userId: uuid!, $title: String!, $content: String!) {
		insert_articles_one(
			object: { userId: $userId, title: $title, content: $content }
		) {
			id
			userId
			title
			content
			created_at
		}
	}
`
