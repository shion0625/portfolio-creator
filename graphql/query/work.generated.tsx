import * as Types from '../../src/graphql/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
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
    url: string
    brief_story?: string | null
    user: { id: string; name: string }
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
      url: string
      brief_story?: string | null
      user: { id: string; name: string }
    }>
  }
}

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

/**
 * __useGetWorkQuery__
 *
 * To run a query within a React component, call `useGetWorkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWorkQuery(
  baseOptions: Apollo.QueryHookOptions<GetWorkQuery, GetWorkQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkQuery, GetWorkQueryVariables>(
    GetWorkDocument,
    options,
  )
}
export function useGetWorkLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWorkQuery,
    GetWorkQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkQuery, GetWorkQueryVariables>(
    GetWorkDocument,
    options,
  )
}
export type GetWorkQueryHookResult = ReturnType<typeof useGetWorkQuery>
export type GetWorkLazyQueryHookResult = ReturnType<typeof useGetWorkLazyQuery>
export type GetWorkQueryResult = Apollo.QueryResult<
  GetWorkQuery,
  GetWorkQueryVariables
>
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

/**
 * __useGetWorksQuery__
 *
 * To run a query within a React component, call `useGetWorksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorksQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetWorksQuery(
  baseOptions: Apollo.QueryHookOptions<GetWorksQuery, GetWorksQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorksQuery, GetWorksQueryVariables>(
    GetWorksDocument,
    options,
  )
}
export function useGetWorksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWorksQuery,
    GetWorksQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorksQuery, GetWorksQueryVariables>(
    GetWorksDocument,
    options,
  )
}
export type GetWorksQueryHookResult = ReturnType<typeof useGetWorksQuery>
export type GetWorksLazyQueryHookResult = ReturnType<
  typeof useGetWorksLazyQuery
>
export type GetWorksQueryResult = Apollo.QueryResult<
  GetWorksQuery,
  GetWorksQueryVariables
>
