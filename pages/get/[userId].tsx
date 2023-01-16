import React, { useEffect, useState } from 'react'
import DesignCard from '../../components/Card/DesignCard'
import UseQueryArticle from '../../hooks/useQueryArticle'
import { Articles } from '../../types/type'
import Navbar from '../../components/Navbar'
import { Box, CircularProgress, Grid, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectArticleStatus,
  setEditedArticleStatus,
} from '../../slices/article'
import { GetServerSideProps } from 'next'

// propsの型を定義する
type Props = {
  userId: string
}

const Index = (props: Props) => {
  const dispatch = useDispatch()
  const editedArticleStatus = useSelector(selectArticleStatus)
  const { useQueryArticleReceiver } = UseQueryArticle()

  const { status: articleReceiverLoading, data: articleReceiver } =
    useQueryArticleReceiver(props.userId)

  const [getPage, setGetPage] = useState(false)

  useEffect(() => {
    setGetPage(true)
    dispatch(
      setEditedArticleStatus({
        ...editedArticleStatus,
        receiverId: props.userId,
      })
    )
  }, [])

  const matches: boolean = useMediaQuery('(min-width:639px)')

  if (articleReceiverLoading === 'loading')
    return (
      <Box sx={{ display: 'flex', margin: '40% 0 0 45%' }}>
        <CircularProgress />
      </Box>
    )
  if (articleReceiverLoading === 'error') return <div>{'Error'}</div>
  return (
    <div>
      <Navbar />
      <Grid container spacing={2} style={{ margin: '1%' }}>
        {/* @ts-ignore */}
        {articleReceiver?.articles?.map(
          (article: Articles) =>
            article.userId == props.userId && (
              <Grid item xs={matches ? 4 : 12} key={article.id}>
                <DesignCard
                  article={article}
                  key={article.id}
                  label={'カートに追加する'}
                  price={'1000'}
                  title={article.title}
                  size={'100'}
                  borderRadius={'20px'}
                  width={'90%'}
                  color={'#F8C4CF'}
                  backgroundColor={'#F8C4CF'}
                  fontWeight={'bold'}
                  marginTop={'15px'}
                  marginRight={'15%'}
                  marginLeft={'5%'}
                  margin={'5%'}
                  getPage={getPage}
                />
              </Grid>
            )
        )}
      </Grid>
    </div>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = {
    userId: context.query.userId,
  }

  return {
    props: props,
  }
}
