/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "articles" */
export type Articles = {
  __typename?: 'articles';
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  title?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "articles" */
export type Articles_Aggregate = {
  __typename?: 'articles_aggregate';
  aggregate?: Maybe<Articles_Aggregate_Fields>;
  nodes: Array<Articles>;
};

/** aggregate fields of "articles" */
export type Articles_Aggregate_Fields = {
  __typename?: 'articles_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Articles_Max_Fields>;
  min?: Maybe<Articles_Min_Fields>;
};


/** aggregate fields of "articles" */
export type Articles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Articles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "articles". All fields are combined with a logical 'AND'. */
export type Articles_Bool_Exp = {
  _and?: InputMaybe<Array<Articles_Bool_Exp>>;
  _not?: InputMaybe<Articles_Bool_Exp>;
  _or?: InputMaybe<Array<Articles_Bool_Exp>>;
  content?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  userId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "articles" */
export enum Articles_Constraint {
  /** unique or primary key constraint on columns "id" */
  ArticlesPkey = 'articles_pkey'
}

/** input type for inserting data into table "articles" */
export type Articles_Insert_Input = {
  content?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Articles_Max_Fields = {
  __typename?: 'articles_max_fields';
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Articles_Min_Fields = {
  __typename?: 'articles_min_fields';
  content?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "articles" */
export type Articles_Mutation_Response = {
  __typename?: 'articles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Articles>;
};

/** on_conflict condition type for table "articles" */
export type Articles_On_Conflict = {
  constraint: Articles_Constraint;
  update_columns?: Array<Articles_Update_Column>;
  where?: InputMaybe<Articles_Bool_Exp>;
};

/** Ordering options when selecting data from "articles". */
export type Articles_Order_By = {
  content?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: articles */
export type Articles_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "articles" */
export enum Articles_Select_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "articles" */
export type Articles_Set_Input = {
  content?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "articles" */
export type Articles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Articles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Articles_Stream_Cursor_Value_Input = {
  content?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "articles" */
export enum Articles_Update_Column {
  /** column name */
  Content = 'content',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
  /** column name */
  UserId = 'userId'
}

export type Articles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Articles_Set_Input>;
  where: Articles_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "articles" */
  delete_articles?: Maybe<Articles_Mutation_Response>;
  /** delete single row from the table: "articles" */
  delete_articles_by_pk?: Maybe<Articles>;
  /** insert data into the table: "articles" */
  insert_articles?: Maybe<Articles_Mutation_Response>;
  /** insert a single row into the table: "articles" */
  insert_articles_one?: Maybe<Articles>;
  /** update data of the table: "articles" */
  update_articles?: Maybe<Articles_Mutation_Response>;
  /** update single row of the table: "articles" */
  update_articles_by_pk?: Maybe<Articles>;
  /** update multiples rows of table: "articles" */
  update_articles_many?: Maybe<Array<Maybe<Articles_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_ArticlesArgs = {
  where: Articles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Articles_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_ArticlesArgs = {
  objects: Array<Articles_Insert_Input>;
  on_conflict?: InputMaybe<Articles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Articles_OneArgs = {
  object: Articles_Insert_Input;
  on_conflict?: InputMaybe<Articles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ArticlesArgs = {
  _set?: InputMaybe<Articles_Set_Input>;
  where: Articles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Articles_By_PkArgs = {
  _set?: InputMaybe<Articles_Set_Input>;
  pk_columns: Articles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Articles_ManyArgs = {
  updates: Array<Articles_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "articles" */
  articles: Array<Articles>;
  /** fetch aggregated fields from the table: "articles" */
  articles_aggregate: Articles_Aggregate;
  /** fetch data from the table: "articles" using primary key columns */
  articles_by_pk?: Maybe<Articles>;
};


export type Query_RootArticlesArgs = {
  distinct_on?: InputMaybe<Array<Articles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Articles_Order_By>>;
  where?: InputMaybe<Articles_Bool_Exp>;
};


export type Query_RootArticles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Articles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Articles_Order_By>>;
  where?: InputMaybe<Articles_Bool_Exp>;
};


export type Query_RootArticles_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "articles" */
  articles: Array<Articles>;
  /** fetch aggregated fields from the table: "articles" */
  articles_aggregate: Articles_Aggregate;
  /** fetch data from the table: "articles" using primary key columns */
  articles_by_pk?: Maybe<Articles>;
  /** fetch data from the table in a streaming manner: "articles" */
  articles_stream: Array<Articles>;
};


export type Subscription_RootArticlesArgs = {
  distinct_on?: InputMaybe<Array<Articles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Articles_Order_By>>;
  where?: InputMaybe<Articles_Bool_Exp>;
};


export type Subscription_RootArticles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Articles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Articles_Order_By>>;
  where?: InputMaybe<Articles_Bool_Exp>;
};


export type Subscription_RootArticles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootArticles_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Articles_Stream_Cursor_Input>>;
  where?: InputMaybe<Articles_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type CreateArtcleMutationVariables = Exact<{
  userId: Scalars['uuid'];
  title: Scalars['String'];
  content: Scalars['String'];
}>;


export type CreateArtcleMutation = { __typename?: 'mutation_root', insert_articles_one?: { __typename?: 'articles', id: any, userId?: any | null, title?: string | null, content?: string | null, created_at?: any | null } | null };

export type GetArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetArticlesQuery = { __typename?: 'query_root', articles: Array<{ __typename?: 'articles', id: any, userId?: any | null, title?: string | null, content?: string | null }> };

export type GetArticleSelectedQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetArticleSelectedQuery = { __typename?: 'query_root', articles_by_pk?: { __typename?: 'articles', id: any, userId?: any | null, title?: string | null, content?: string | null } | null };

export type GetArticleSelectedUserQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type GetArticleSelectedUserQuery = { __typename?: 'query_root', articles: Array<{ __typename?: 'articles', id: any, userId?: any | null, title?: string | null, content?: string | null }> };


export const CreateArtcleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateArtcle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_articles_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<CreateArtcleMutation, CreateArtcleMutationVariables>;
export const GetArticlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<GetArticlesQuery, GetArticlesQueryVariables>;
export const GetArticleSelectedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetArticleSelected"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articles_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<GetArticleSelectedQuery, GetArticleSelectedQueryVariables>;
export const GetArticleSelectedUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetArticleSelectedUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<GetArticleSelectedUserQuery, GetArticleSelectedUserQueryVariables>;