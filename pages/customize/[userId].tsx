import { GetServerSideProps } from 'next'
import { useState } from 'react'
import MarkdownEditor from '../../components/MarkdownEditor'

type Props = {
  userId: string
}

const Index = (props: Props) => {
  return <MarkdownEditor userId={props.userId} />
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
