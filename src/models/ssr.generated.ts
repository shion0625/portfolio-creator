import * as Types from './types'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'

export type GetUserQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetUserQuery = {
  user: {
    id: string
    name?: string | null
    email?: string | null
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
        url?: string | null
        brief_story?: string | null
      }>
    } | null
  }
}

export type GetUsersQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int']
  offset?: Types.InputMaybe<Types.Scalars['Int']>
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
      name?: string | null
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
          url?: string | null
          brief_story?: string | null
          user: { id: string; name?: string | null }
        }>
      } | null
    }>
  }
}

export type GetUsersNameQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int']
  offset?: Types.InputMaybe<Types.Scalars['Int']>
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
    nodes: Array<{ id: string; name?: string | null }>
  }
}

export type GetUserIdsQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int']
  offset?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetUserIdsQuery = { users: { nodes: Array<{ id: string }> } }

export type LoginMutationVariables = Types.Exact<{
  id: Types.Scalars['String']
  email: Types.Scalars['String']
}>

export type LoginMutation = { login: any }

export type GetWorkQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
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
    url?: string | null
    brief_story?: string | null
    user: { id: string; name?: string | null }
  } | null
}

export type GetWorksQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int']
  offset?: Types.InputMaybe<Types.Scalars['Int']>
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
      url?: string | null
      brief_story?: string | null
      user: { id: string; name?: string | null }
    }>
  }
}

export type CreateWorkMutationVariables = Types.Exact<{
  input: Types.CreateWorkInput
}>

export type CreateWorkMutation = {
  createWork: {
    title: string
    summary?: string | null
    image_url?: string | null
    duration?: string | null
    number_of_people?: number | null
    language?: string | null
    role?: string | null
    url?: string | null
    brief_story?: string | null
    user: { id: string; name?: string | null }
  }
}

export type UpdateWorkMutationVariables = Types.Exact<{
  input: Types.UpdateWorkInput
}>

export type UpdateWorkMutation = {
  updateWork: {
    title: string
    summary?: string | null
    image_url?: string | null
    duration?: string | null
    number_of_people?: number | null
    language?: string | null
    role?: string | null
    url?: string | null
    brief_story?: string | null
    user: { id: string; name?: string | null }
  }
}

export type DeleteWorkMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type DeleteWorkMutation = { deleteWork?: boolean | null }

export const GetUserDocument = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
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
export const LoginDocument = gql`
  mutation Login($id: String!, $email: String!) {
    login(id: $id, email: $email)
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
export const CreateWorkDocument = gql`
  mutation CreateWork($input: CreateWorkInput!) {
    createWork(input: $input) {
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
export const UpdateWorkDocument = gql`
  mutation UpdateWork($input: UpdateWorkInput!) {
    updateWork(input: $input) {
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
export const DeleteWorkDocument = gql`
  mutation DeleteWork($id: ID!) {
    deleteWork(id: $id)
  }
`

export type SdkFunctionWrapper = <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action()

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetUser(variables: Types.GetUserQueryVariables, requestHeaders?: Dom.RequestInit['headers']): Promise<Types.GetUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Types.GetUserQuery>(GetUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUser',
        'query',
      )
    },
    GetUsers(variables: Types.GetUsersQueryVariables, requestHeaders?: Dom.RequestInit['headers']): Promise<Types.GetUsersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Types.GetUsersQuery>(GetUsersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUsers',
        'query',
      )
    },
    GetUsersName(variables: Types.GetUsersNameQueryVariables, requestHeaders?: Dom.RequestInit['headers']): Promise<Types.GetUsersNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.GetUsersNameQuery>(GetUsersNameDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'GetUsersName', 'query')
    },
    GetUserIds(variables: Types.GetUserIdsQueryVariables, requestHeaders?: Dom.RequestInit['headers']): Promise<Types.GetUserIdsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Types.GetUserIdsQuery>(GetUserIdsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetUserIds',
        'query',
      )
    },
    Login(variables: Types.LoginMutationVariables, requestHeaders?: Dom.RequestInit['headers']): Promise<Types.LoginMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Types.LoginMutation>(LoginDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'Login',
        'mutation',
      )
    },
    GetWork(variables: Types.GetWorkQueryVariables, requestHeaders?: Dom.RequestInit['headers']): Promise<Types.GetWorkQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Types.GetWorkQuery>(GetWorkDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetWork',
        'query',
      )
    },
    GetWorks(variables: Types.GetWorksQueryVariables, requestHeaders?: Dom.RequestInit['headers']): Promise<Types.GetWorksQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<Types.GetWorksQuery>(GetWorksDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetWorks',
        'query',
      )
    },
    CreateWork(variables: Types.CreateWorkMutationVariables, requestHeaders?: Dom.RequestInit['headers']): Promise<Types.CreateWorkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.CreateWorkMutation>(CreateWorkDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'CreateWork', 'mutation')
    },
    UpdateWork(variables: Types.UpdateWorkMutationVariables, requestHeaders?: Dom.RequestInit['headers']): Promise<Types.UpdateWorkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.UpdateWorkMutation>(UpdateWorkDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'UpdateWork', 'mutation')
    },
    DeleteWork(variables: Types.DeleteWorkMutationVariables, requestHeaders?: Dom.RequestInit['headers']): Promise<Types.DeleteWorkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Types.DeleteWorkMutation>(DeleteWorkDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'DeleteWork', 'mutation')
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
