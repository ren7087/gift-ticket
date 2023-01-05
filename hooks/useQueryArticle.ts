import { FC, useEffect, useState } from 'react'
import { GraphQLClient, Variables } from 'graphql-request'
import { useQuery } from 'react-query'
import { Articles, QueryArticleUserSelected } from '../types/type'
import {
  GET_ARTICLES,
  GET_ARTICLE_SELECTED_USER,
  GET_ARTICLE_SELECTED,
} from '../queries/queries'
import supabase from '../utils/supabase-client'
import { Session } from '@supabase/supabase-js'

const UseQueryArticle = () => {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    const getInitialSession = async () => {
      const initialSession = (await supabase.auth.getSession())?.data.session
      setSession(initialSession)
    }

    getInitialSession()

    const authListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
      }
    )

    return () => {
      authListener.data.subscription.unsubscribe()
    }
  }, [])

  const endpoint: any = process.env.NEXT_PUBLIC_HASURA_ENDPOINT
  let graphQLClient: GraphQLClient

  interface ArticlesRes {
    artiicles: Articles[]
  }

  interface ArticlesResDetail {
    articles_by_pk: Articles[]
  }

  const fetchArticle = async () => {
    const data: any = await graphQLClient.request<ArticlesRes>(GET_ARTICLES)
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
    const { articles_by_pk: data } =
      await graphQLClient.request<ArticlesResDetail>(GET_ARTICLE_SELECTED, {
        id: id,
      })
    return data
  }

  //全て取得
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

  return { useQueryArticleUserSelected, useQueryArticle }
}

export default UseQueryArticle
