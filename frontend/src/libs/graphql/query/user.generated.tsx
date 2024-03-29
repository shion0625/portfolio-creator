import * as Types from '../../../models/types'
import { PaginationFragmentFragmentDoc } from './common.generated'
import { WorkFragmentFragmentDoc } from './work.generated'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

const defaultOptions = {} as const
export type UserFragmentFragment = {
  id: string
  name?: string | null
  email?: string | null
  created_at: any
  updated_at: any
  serial_number: number
}

export type GetUserQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetUserQuery = {
  user: {
    id: string
    name?: string | null
    email?: string | null
    created_at: any
    updated_at: any
    serial_number: number
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
        created_at: any
        updated_at: any
        serial_number: number
      }>
    } | null
  }
}

export type GetUserAuthQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetUserAuthQuery = {
  userAuth: {
    id: string
    name?: string | null
    email?: string | null
    created_at: any
    updated_at: any
    serial_number: number
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
        created_at: any
        updated_at: any
        serial_number: number
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
      hasNextPage: boolean
      count: number
      totalCount: number
      paginationLength: number
      hasPreviousPage: boolean
    }
    nodes: Array<{
      id: string
      name?: string | null
      email?: string | null
      created_at: any
      updated_at: any
      serial_number: number
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
          created_at: any
          updated_at: any
          serial_number: number
          user: {
            id: string
            name?: string | null
            email?: string | null
            created_at: any
            updated_at: any
            serial_number: number
          }
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
      hasNextPage: boolean
      count: number
      totalCount: number
      paginationLength: number
      hasPreviousPage: boolean
    }
    nodes: Array<{
      id: string
      name?: string | null
      email?: string | null
      created_at: any
      updated_at: any
      serial_number: number
    }>
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

export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on User {
    id
    name
    email
    created_at
    updated_at
    serial_number
  }
`
export const GetUserDocument = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserFragment
      works {
        pageInfo {
          ...PaginationFragment
        }
        nodes {
          ...WorkFragment
        }
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${PaginationFragmentFragmentDoc}
  ${WorkFragmentFragmentDoc}
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options)
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>
export const GetUserAuthDocument = gql`
  query GetUserAuth($id: ID!) {
    userAuth(id: $id) {
      ...UserFragment
      works {
        pageInfo {
          ...PaginationFragment
        }
        nodes {
          ...WorkFragment
        }
      }
    }
  }
  ${UserFragmentFragmentDoc}
  ${PaginationFragmentFragmentDoc}
  ${WorkFragmentFragmentDoc}
`

/**
 * __useGetUserAuthQuery__
 *
 * To run a query within a React component, call `useGetUserAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAuthQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserAuthQuery(baseOptions: Apollo.QueryHookOptions<GetUserAuthQuery, GetUserAuthQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserAuthQuery, GetUserAuthQueryVariables>(GetUserAuthDocument, options)
}
export function useGetUserAuthLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserAuthQuery, GetUserAuthQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserAuthQuery, GetUserAuthQueryVariables>(GetUserAuthDocument, options)
}
export type GetUserAuthQueryHookResult = ReturnType<typeof useGetUserAuthQuery>
export type GetUserAuthLazyQueryHookResult = ReturnType<typeof useGetUserAuthLazyQuery>
export type GetUserAuthQueryResult = Apollo.QueryResult<GetUserAuthQuery, GetUserAuthQueryVariables>
export const GetUsersDocument = gql`
  query GetUsers($limit: Int!, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      pageInfo {
        ...PaginationFragment
      }
      nodes {
        ...UserFragment
        works {
          nodes {
            ...WorkFragment
            user {
              ...UserFragment
            }
          }
        }
      }
    }
  }
  ${PaginationFragmentFragmentDoc}
  ${UserFragmentFragmentDoc}
  ${WorkFragmentFragmentDoc}
`

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options)
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>
export const GetUsersNameDocument = gql`
  query GetUsersName($limit: Int!, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      pageInfo {
        ...PaginationFragment
      }
      nodes {
        ...UserFragment
      }
    }
  }
  ${PaginationFragmentFragmentDoc}
  ${UserFragmentFragmentDoc}
`

/**
 * __useGetUsersNameQuery__
 *
 * To run a query within a React component, call `useGetUsersNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersNameQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUsersNameQuery(
  baseOptions: Apollo.QueryHookOptions<GetUsersNameQuery, GetUsersNameQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersNameQuery, GetUsersNameQueryVariables>(GetUsersNameDocument, options)
}
export function useGetUsersNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUsersNameQuery, GetUsersNameQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersNameQuery, GetUsersNameQueryVariables>(GetUsersNameDocument, options)
}
export type GetUsersNameQueryHookResult = ReturnType<typeof useGetUsersNameQuery>
export type GetUsersNameLazyQueryHookResult = ReturnType<typeof useGetUsersNameLazyQuery>
export type GetUsersNameQueryResult = Apollo.QueryResult<GetUsersNameQuery, GetUsersNameQueryVariables>
export const GetUserIdsDocument = gql`
  query GetUserIds($limit: Int!, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      nodes {
        id
      }
    }
  }
`

/**
 * __useGetUserIdsQuery__
 *
 * To run a query within a React component, call `useGetUserIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIdsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUserIdsQuery(baseOptions: Apollo.QueryHookOptions<GetUserIdsQuery, GetUserIdsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserIdsQuery, GetUserIdsQueryVariables>(GetUserIdsDocument, options)
}
export function useGetUserIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserIdsQuery, GetUserIdsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserIdsQuery, GetUserIdsQueryVariables>(GetUserIdsDocument, options)
}
export type GetUserIdsQueryHookResult = ReturnType<typeof useGetUserIdsQuery>
export type GetUserIdsLazyQueryHookResult = ReturnType<typeof useGetUserIdsLazyQuery>
export type GetUserIdsQueryResult = Apollo.QueryResult<GetUserIdsQuery, GetUserIdsQueryVariables>
export const LoginDocument = gql`
  mutation Login($id: String!, $email: String!) {
    login(id: $id, email: $email)
  }
`
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      id: // value for 'id'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options)
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>
