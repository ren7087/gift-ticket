import { FC, useEffect, useState } from 'react'
import { GraphQLClient, Variables } from 'graphql-request'
import { useQuery } from 'react-query'
import {
  Articles,
  QueryArticleUserSelected,
  ArticleStatus,
} from '../types/type'
import {
  GET_ARTICLES,
  GET_ARTICLE_STATUS,
  GET_ARTICLE_SELECTED_USER,
  GET_ARTICLE_SELECTED,
  GET_ARTICLE_RECEIVER,
} from '../queries/queries'
import supabase from '../utils/supabase-client'
import { Session } from '@supabase/supabase-js'

const UseQueryArticle = () => {
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

  const endpoint: any = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
  let graphQLClient: GraphQLClient

  interface ArticlesRes {
    articles: Articles[]
  }

  interface ArticlesStatusRes {
    articleStatus: ArticleStatus[]
  }

  interface ArticlesResDetail {
    articles_by_pk: Articles[]
  }

  const fetchArticle = async () => {
    const data: any = await graphQLClient.request<ArticlesRes>(GET_ARTICLES)
    return data
  }

  const fetchArticleStatus = async () => {
    const data: any = await graphQLClient.request<ArticlesStatusRes>(
      GET_ARTICLE_STATUS
    )
    return data
  }

  //   {} イラナイ
  const fetchArticleUser = async (userId: any) => {
    const data: any = await graphQLClient.request<ArticlesRes>(
      GET_ARTICLE_SELECTED_USER,
      { userId: userId }
    )
    return data
  }

  const fetchArticleDetail = async (id: any) => {
    const articles_by_pk: any = await graphQLClient.request<ArticlesResDetail>(
      GET_ARTICLE_SELECTED,
      {
        id: id,
      }
    )
    return articles_by_pk
  }

  const fetchArticleReceiver = async (receiverId: string) => {
    const data: any = await graphQLClient.request<ArticleStatus>(
      GET_ARTICLE_RECEIVER,
      {
        receiverId: receiverId,
      }
    )
    return data
  }

  //article全て取得
  const useQueryArticle = () => {
    useEffect(() => {
      graphQLClient = new GraphQLClient(endpoint)
    }, [])
    return useQuery<Articles[], Error>({
      queryKey: 'articles',
      queryFn: fetchArticle,
      staleTime: 0,
    })
  }

  //status全て取得
  const useQueryArticleStatus = () => {
    useEffect(() => {
      graphQLClient = new GraphQLClient(endpoint)
    }, [])
    return useQuery<ArticleStatus[], Error>({
      queryKey: 'articleStatus',
      queryFn: fetchArticleStatus,
      staleTime: 0,
    })
  }

  //userごとで絞り込み
  const useQueryArticleUserSelected = (userId: any) => {
    useEffect(() => {
      graphQLClient = new GraphQLClient(endpoint)
    }, [])
    return useQuery<Articles[], Error>({
      queryKey: 'article',
      queryFn: fetchArticleUser,
      staleTime: 0,
    })
  }

  //投稿ごとに絞り込み
  // export const useQueryArticleSelected = (id: any) => {
  //   useEffect(() => {
  //     graphQLClient = new GraphQLClient(endpoint)
  //   }, [])
  //   return useQuery<Articles[], Error>({
  //     queryKey: ['article_detail', id],
  //     queryFn: fetchArticleDetail(id),
  //     staleTime: 0,
  //   })
  // }

  //get一覧取得
  const useQueryArticleReceiver = (receiverId: string) => {
    useEffect(() => {
      graphQLClient = new GraphQLClient(endpoint)
      console.log('receiverId', receiverId)
    }, [])
    return useQuery<ArticleStatus[], Error>({
      queryKey: ['articleReceiver', receiverId],
      queryFn: () => fetchArticleReceiver(receiverId),
      staleTime: 0,
    })
  }

  return {
    useQueryArticleUserSelected,
    useQueryArticle,
    useQueryArticleStatus,
    useQueryArticleReceiver,
  }
}

export default UseQueryArticle
