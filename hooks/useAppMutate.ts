import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import {
  CREATE_ARTICLE,
  CREATE_ARTICLE_STATUS,
  UPDATE_ARTICLE_STATUS,
  DELETE_ARTICLE,
} from '../queries/queries'
import {
  Articles,
  ArticleStatus,
  EditArticle,
  EditArticleStatus,
} from '../types/type'
import { useDispatch } from 'react-redux'
import { resetEditedArticle, resetEditedArticleStatus } from '../slices/article'

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
        const previousArticles =
          queryClient.getQueryData<Articles[]>('articles')
        if (previousArticles) {
          queryClient.setQueryData('articles', [
            ...previousArticles,
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

  const createArticleStatusMutation = useMutation(
    (articleStatus: EditArticleStatus) =>
      graphQLClient.request(CREATE_ARTICLE_STATUS, articleStatus),
    {
      onSuccess: (res) => {
        const previousArticleStatus =
          queryClient.getQueryData<ArticleStatus[]>('articleStatus')
        if (previousArticleStatus) {
          queryClient.setQueryData('articleStatus', [
            ...previousArticleStatus,
            res.insert_articles_status_one,
          ])
        }
        dispatch(resetEditedArticleStatus())
      },
      onError: () => {
        dispatch(resetEditedArticleStatus())
        console.log('error')
      },
    }
  )

  const updateArticleStatusMutation = useMutation(
    (articleStatus: EditArticleStatus) =>
      graphQLClient.request(UPDATE_ARTICLE_STATUS, articleStatus),
    {
      onSuccess: (res, variables) => {
        const previousArticleStatus =
          queryClient.getQueryData<ArticleStatus[]>('articleStatus')
        if (previousArticleStatus) {
          queryClient.setQueryData(
            'articleStatus',
            previousArticleStatus.map((articleStatusSelected) =>
              articleStatusSelected.articleId === variables.articleId &&
              articleStatusSelected.receiverId === variables.receiverId
                ? res.update_articles_status
                : articleStatusSelected
            )
          )
        }
        dispatch(resetEditedArticleStatus())
      },
      onError: () => {
        dispatch(resetEditedArticleStatus())
        console.log('error')
      },
    }
  )
  const deleteArticleMutation = useMutation(
    (id: string) => graphQLClient.request(DELETE_ARTICLE, { id: id }),
    {
      onSuccess: (res, variables) => {
        const previousArticles =
          queryClient.getQueryData<Articles[]>('articles')
        if (previousArticles) {
          queryClient.setQueryData<Articles[]>(
            'articles',
            previousArticles.filter((articles) => articles.id !== variables)
          )
        }
        dispatch(resetEditedArticle())
      },
    }
  )
  return {
    createArticleMutation,
    deleteArticleMutation,
    createArticleStatusMutation,
    updateArticleStatusMutation,
  }
}
