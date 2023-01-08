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
export interface QueryArticle {
  id: string
}
export interface QueryArticleUserSelected {
  userId: string
}

export interface ArticleStatus {
  id: string
  articleId: string
  receiverId: string
  isDone?: boolean
}

export interface EditArticleStatus {
  articleId: string | undefined
  receiverId: string
  isDone?: boolean
}

export interface AvatarType {
  accessoriesType: string
  clotheColor: string
  clotheType: string
  eyeType: string
  eyebrowType: string
  facialHairColor: string
  facialHairType: string
  graphicType: string
  hairColor: string
  hatColor: string
  mouthType: string
  skinColor: string
  topType: string
}
