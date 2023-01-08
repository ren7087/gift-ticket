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

export const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      userId
      title
      content
    }
  }
`

export const GET_ARTICLE_SELECTED = gql`
  query GetArticleSelected($id: uuid!) {
    articles_by_pk(id: $id) {
      id
      userId
      title
      content
    }
  }
`

//user一覧のデータを取得したい
export const GET_ARTICLE_SELECTED_USER = gql`
  query GetArticleSelectedUser($userId: uuid! = "") {
    articles(where: { userId: { _eq: $userId } }) {
      id
      userId
      title
      content
    }
  }
`

export const CREATE_ARTICLE_STATUS = gql`
  mutation CreateArtcleStatus(
    $articleId: uuid!
    $receiverId: uuid!
    $isDone: Boolean
  ) {
    insert_articles_status_one(
      object: {
        articleId: $articleId
        receiverId: $receiverId
        isDone: $isDone
      }
    ) {
      id
      articleId
      receiverId
      isDone
      created_at
    }
  }
`
