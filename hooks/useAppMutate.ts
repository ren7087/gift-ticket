import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import { CREATE_ARTICLE } from '../queries/queries'
import { Articles, EditArticle } from '../types/type'
import { useDispatch } from 'react-redux'
import { resetEditedArticle } from '../slices/uiSlice'

const endpoint: any = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
let graphQLClient: GraphQLClient

export const useAppMutate = () => {
	const dispatch = useDispatch()
	const queryClient = useQueryClient()

	useEffect(() => {
		graphQLClient = new GraphQLClient(endpoint)
	}, [])

	const createArticleMutation = useMutation(
		(article: EditArticle) => graphQLClient.request(CREATE_ARTICLE, article),
		{
			onSuccess: (res) => {
				const previousTodos = queryClient.getQueryData<Articles[]>('articles')
				if (previousTodos) {
					queryClient.setQueryData('articles', [
						...previousTodos,
						res.insert_articles_one,
					])
				}
				dispatch(resetEditedArticle())
			},
			onError: () => {
				dispatch(resetEditedArticle())
			},
		}
	)
	return {
		createArticleMutation,
	}
}
