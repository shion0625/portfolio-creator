import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Timestamp: any
}

export type CreateUserInput = {
  email: Scalars['String']
  is_admin: Scalars['Boolean']
  name: Scalars['String']
  password: Scalars['String']
}

export type CreateWorkInput = {
  brief_story?: InputMaybe<Scalars['String']>
  duration?: InputMaybe<Scalars['String']>
  image_url?: InputMaybe<Scalars['String']>
  language?: InputMaybe<Scalars['String']>
  number_of_people?: InputMaybe<Scalars['Int']>
  role?: InputMaybe<Scalars['String']>
  summary?: InputMaybe<Scalars['String']>
  title: Scalars['String']
  url: Scalars['String']
  user_id: Scalars['String']
}

export type Mutation = {
  createUser: User
  createWork: Work
  deleteUser?: Maybe<Scalars['Boolean']>
  deleteWork?: Maybe<Scalars['Boolean']>
  updateUser: User
  updateWork: Work
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationCreateWorkArgs = {
  input: CreateWorkInput
}

export type MutationDeleteUserArgs = {
  id: Scalars['ID']
}

export type MutationDeleteWorkArgs = {
  id: Scalars['ID']
}

export type MutationUpdateUserArgs = {
  input: UpdateUserInput
}

export type MutationUpdateWorkArgs = {
  input: UpdateWorkInput
}

export type Node = {
  id: Scalars['ID']
}

export type Pagination = {
  nodes: Array<Node>
  pageInfo: PaginationInfo
}

export type PaginationInfo = {
  count: Scalars['Int']
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  page: Scalars['Int']
  paginationLength: Scalars['Int']
  totalCount: Scalars['Int']
}

export type Query = {
  user: User
  users: UserPagination
  work?: Maybe<Work>
  works: WorkPagination
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type QueryUsersArgs = {
  limit: Scalars['Int']
  offset?: InputMaybe<Scalars['Int']>
}

export type QueryWorkArgs = {
  id: Scalars['ID']
}

export type QueryWorksArgs = {
  limit: Scalars['Int']
  offset?: InputMaybe<Scalars['Int']>
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Viewer = 'VIEWER',
}

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  is_admin?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
}

export type UpdateWorkInput = {
  brief_story?: InputMaybe<Scalars['String']>
  duration?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
  image_url?: InputMaybe<Scalars['String']>
  language?: InputMaybe<Scalars['String']>
  number_of_people?: InputMaybe<Scalars['Int']>
  role?: InputMaybe<Scalars['String']>
  summary?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  url?: InputMaybe<Scalars['String']>
}

export type User = Node & {
  email: Scalars['String']
  id: Scalars['ID']
  is_able: Scalars['Boolean']
  is_admin: Scalars['Boolean']
  name: Scalars['String']
  password: Scalars['String']
  works?: Maybe<WorkPagination>
}

export type UserPagination = Pagination & {
  nodes: Array<User>
  pageInfo: PaginationInfo
}

export type Work = Node & {
  brief_story?: Maybe<Scalars['String']>
  duration?: Maybe<Scalars['String']>
  id: Scalars['ID']
  image_url?: Maybe<Scalars['String']>
  language?: Maybe<Scalars['String']>
  number_of_people?: Maybe<Scalars['Int']>
  role?: Maybe<Scalars['String']>
  summary?: Maybe<Scalars['String']>
  title: Scalars['String']
  url: Scalars['String']
  user: User
}

export type WorkPagination = Pagination & {
  nodes: Array<Work>
  pageInfo: PaginationInfo
}

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetUserQuery = {
  user: {
    id: string
    is_admin: boolean
    name: string
    email: string
    works?: {
      pageInfo: {
        page: number
        hasNextPage: boolean
        count: number
        totalCount: number
        paginationLength: number
        hasPreviousPage: boolean
      }
      nodes: Array<{
        id: string
        title: string
        summary?: string | null
        image_url?: string | null
        duration?: string | null
        number_of_people?: number | null
        language?: string | null
        role?: string | null
        url: string
        brief_story?: string | null
      }>
    } | null
  }
}

export type GetUsersQueryVariables = Exact<{
  limit: Scalars['Int']
  offset?: InputMaybe<Scalars['Int']>
}>

export type GetUsersQuery = {
  users: {
    pageInfo: {
      page: number
      paginationLength: number
      hasNextPage: boolean
      hasPreviousPage: boolean
      count: number
      totalCount: number
    }
    nodes: Array<{
      id: string
      name: string
      works?: {
        nodes: Array<{
          id: string
          title: string
          summary?: string | null
          image_url?: string | null
          duration?: string | null
          number_of_people?: number | null
          language?: string | null
          role?: string | null
          url: string
          brief_story?: string | null
          user: { id: string; name: string }
        }>
      } | null
    }>
  }
}

export type GetUsersNameQueryVariables = Exact<{
  limit: Scalars['Int']
  offset?: InputMaybe<Scalars['Int']>
}>

export type GetUsersNameQuery = {
  users: {
    pageInfo: {
      page: number
      paginationLength: number
      hasNextPage: boolean
      hasPreviousPage: boolean
      count: number
      totalCount: number
    }
    nodes: Array<{ id: string; name: string }>
  }
}

export type GetUserIdsQueryVariables = Exact<{
  limit: Scalars['Int']
  offset?: InputMaybe<Scalars['Int']>
}>

export type GetUserIdsQuery = { users: { nodes: Array<{ id: string }> } }

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput
}>

export type CreateUserMutation = { createUser: { id: string; name: string } }

export type GetWorkQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetWorkQuery = {
  work?: {
    id: string
    title: string
    summary?: string | null
    image_url?: string | null
    duration?: string | null
    number_of_people?: number | null
    language?: string | null
    role?: string | null
    url: string
    brief_story?: string | null
    user: { id: string; name: string }
  } | null
}

export type GetWorksQueryVariables = Exact<{
  limit: Scalars['Int']
  offset?: InputMaybe<Scalars['Int']>
}>

export type GetWorksQuery = {
  works: {
    pageInfo: {
      page: number
      paginationLength: number
      hasPreviousPage: boolean
      hasNextPage: boolean
      count: number
      totalCount: number
    }
    nodes: Array<{
      id: string
      title: string
      summary?: string | null
      image_url?: string | null
      duration?: string | null
      number_of_people?: number | null
      language?: string | null
      role?: string | null
      url: string
      brief_story?: string | null
      user: { id: string; name: string }
    }>
  }
}

export const GetUserDocument = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      is_admin
      name
      email
      works {
        pageInfo {
          page
          hasNextPage
          count
          totalCount
          paginationLength
          hasPreviousPage
        }
        nodes {
          id
          title
          summary
          image_url
          duration
          number_of_people
          language
          role
          url
          brief_story
        }
      }
    }
  }
`
export const GetUsersDocument = gql`
  query GetUsers($limit: Int!, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      pageInfo {
        page
        paginationLength
        hasNextPage
        hasPreviousPage
        count
        totalCount
      }
      nodes {
        id
        name
        works {
          nodes {
            id
            title
            summary
            image_url
            duration
            number_of_people
            language
            role
            url
            brief_story
            user {
              id
              name
            }
          }
        }
      }
    }
  }
`
export const GetUsersNameDocument = gql`
  query GetUsersName($limit: Int!, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      pageInfo {
        page
        paginationLength
        hasNextPage
        hasPreviousPage
        count
        totalCount
      }
      nodes {
        id
        name
      }
    }
  }
`
export const GetUserIdsDocument = gql`
  query GetUserIds($limit: Int!, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      nodes {
        id
      }
    }
  }
`
export const CreateUserDocument = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`
export const GetWorkDocument = gql`
  query GetWork($id: ID!) {
    work(id: $id) {
      id
      title
      summary
      image_url
      duration
      number_of_people
      language
      role
      url
      brief_story
      user {
        id
        name
      }
    }
  }
`
export const GetWorksDocument = gql`
  query GetWorks($limit: Int!, $offset: Int) {
    works(limit: $limit, offset: $offset) {
      pageInfo {
        page
        paginationLength
        hasPreviousPage
        hasNextPage
        count
        totalCount
      }
      nodes {
        id
        title
        summary
        image_url
        duration
        number_of_people
        language
        role
        url
        brief_story
        user {
          id
          name
        }
      }
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetUser(
      variables: GetUserQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserQuery>(GetUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUser',
        'query',
      )
    },
    GetUsers(
      variables: GetUsersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetUsersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUsersQuery>(GetUsersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUsers',
        'query',
      )
    },
    GetUsersName(
      variables: GetUsersNameQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetUsersNameQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUsersNameQuery>(GetUsersNameDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUsersName',
        'query',
      )
    },
    GetUserIds(
      variables: GetUserIdsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetUserIdsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserIdsQuery>(GetUserIdsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUserIds',
        'query',
      )
    },
    CreateUser(
      variables: CreateUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUserMutation>(CreateUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateUser',
        'mutation',
      )
    },
    GetWork(
      variables: GetWorkQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetWorkQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetWorkQuery>(GetWorkDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetWork',
        'query',
      )
    },
    GetWorks(
      variables: GetWorksQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetWorksQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetWorksQuery>(GetWorksDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetWorks',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
