import * as Types from '../../../models/types'
import { PaginationFragmentFragmentDoc } from './common.generated'
import { UserFragmentFragmentDoc } from './user.generated'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

const defaultOptions = {} as const
export type WorkFragmentFragment = {
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
}

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
  } | null
}

export type GetWorksQueryVariables = Types.Exact<{
  sortBy: Types.SortBy
  searchedAt: Types.Scalars['String']
  num: Types.Scalars['Int']
  limit: Types.Scalars['Int']
}>

export type GetWorksQuery = {
  works: {
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
      user: {
        id: string
        name?: string | null
        email?: string | null
        created_at: any
        updated_at: any
        serial_number: number
      }
    }>
  }
}

export type CreateWorkMutationVariables = Types.Exact<{
  input: Types.CreateWorkInput
}>

export type CreateWorkMutation = { createWork: boolean }

export type UpdateWorkMutationVariables = Types.Exact<{
  input: Types.UpdateWorkInput
}>

export type UpdateWorkMutation = { updateWork: boolean }

export type DeleteWorksMutationVariables = Types.Exact<{
  ids: Array<Types.InputMaybe<Types.Scalars['ID']>> | Types.InputMaybe<Types.Scalars['ID']>
}>

export type DeleteWorksMutation = { deleteWorks: boolean }

export const WorkFragmentFragmentDoc = gql`
  fragment WorkFragment on Work {
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
    created_at
    updated_at
    serial_number
  }
`
export const GetWorkDocument = gql`
  query GetWork($id: ID!) {
    work(id: $id) {
      ...WorkFragment
      user {
        ...UserFragment
      }
    }
  }
  ${WorkFragmentFragmentDoc}
  ${UserFragmentFragmentDoc}
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
export function useGetWorkQuery(baseOptions: Apollo.QueryHookOptions<GetWorkQuery, GetWorkQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkQuery, GetWorkQueryVariables>(GetWorkDocument, options)
}
export function useGetWorkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkQuery, GetWorkQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkQuery, GetWorkQueryVariables>(GetWorkDocument, options)
}
export type GetWorkQueryHookResult = ReturnType<typeof useGetWorkQuery>
export type GetWorkLazyQueryHookResult = ReturnType<typeof useGetWorkLazyQuery>
export type GetWorkQueryResult = Apollo.QueryResult<GetWorkQuery, GetWorkQueryVariables>
export const GetWorksDocument = gql`
  query GetWorks($sortBy: SortBy!, $searchedAt: String!, $num: Int!, $limit: Int!) {
    works(sortBy: $sortBy, searchedAt: $searchedAt, num: $num, limit: $limit) {
      pageInfo {
        ...PaginationFragment
      }
      nodes {
        ...WorkFragment
        user {
          ...UserFragment
        }
      }
    }
  }
  ${PaginationFragmentFragmentDoc}
  ${WorkFragmentFragmentDoc}
  ${UserFragmentFragmentDoc}
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
 *      sortBy: // value for 'sortBy'
 *      searchedAt: // value for 'searchedAt'
 *      num: // value for 'num'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetWorksQuery(baseOptions: Apollo.QueryHookOptions<GetWorksQuery, GetWorksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorksQuery, GetWorksQueryVariables>(GetWorksDocument, options)
}
export function useGetWorksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorksQuery, GetWorksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorksQuery, GetWorksQueryVariables>(GetWorksDocument, options)
}
export type GetWorksQueryHookResult = ReturnType<typeof useGetWorksQuery>
export type GetWorksLazyQueryHookResult = ReturnType<typeof useGetWorksLazyQuery>
export type GetWorksQueryResult = Apollo.QueryResult<GetWorksQuery, GetWorksQueryVariables>
export const CreateWorkDocument = gql`
  mutation CreateWork($input: CreateWorkInput!) {
    createWork(input: $input)
  }
`
export type CreateWorkMutationFn = Apollo.MutationFunction<CreateWorkMutation, CreateWorkMutationVariables>

/**
 * __useCreateWorkMutation__
 *
 * To run a mutation, you first call `useCreateWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkMutation, { data, loading, error }] = useCreateWorkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWorkMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateWorkMutation, CreateWorkMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateWorkMutation, CreateWorkMutationVariables>(CreateWorkDocument, options)
}
export type CreateWorkMutationHookResult = ReturnType<typeof useCreateWorkMutation>
export type CreateWorkMutationResult = Apollo.MutationResult<CreateWorkMutation>
export type CreateWorkMutationOptions = Apollo.BaseMutationOptions<CreateWorkMutation, CreateWorkMutationVariables>
export const UpdateWorkDocument = gql`
  mutation UpdateWork($input: UpdateWorkInput!) {
    updateWork(input: $input)
  }
`
export type UpdateWorkMutationFn = Apollo.MutationFunction<UpdateWorkMutation, UpdateWorkMutationVariables>

/**
 * __useUpdateWorkMutation__
 *
 * To run a mutation, you first call `useUpdateWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkMutation, { data, loading, error }] = useUpdateWorkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWorkMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateWorkMutation, UpdateWorkMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateWorkMutation, UpdateWorkMutationVariables>(UpdateWorkDocument, options)
}
export type UpdateWorkMutationHookResult = ReturnType<typeof useUpdateWorkMutation>
export type UpdateWorkMutationResult = Apollo.MutationResult<UpdateWorkMutation>
export type UpdateWorkMutationOptions = Apollo.BaseMutationOptions<UpdateWorkMutation, UpdateWorkMutationVariables>
export const DeleteWorksDocument = gql`
  mutation DeleteWorks($ids: [ID]!) {
    deleteWorks(ids: $ids)
  }
`
export type DeleteWorksMutationFn = Apollo.MutationFunction<DeleteWorksMutation, DeleteWorksMutationVariables>

/**
 * __useDeleteWorksMutation__
 *
 * To run a mutation, you first call `useDeleteWorksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorksMutation, { data, loading, error }] = useDeleteWorksMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useDeleteWorksMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteWorksMutation, DeleteWorksMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteWorksMutation, DeleteWorksMutationVariables>(DeleteWorksDocument, options)
}
export type DeleteWorksMutationHookResult = ReturnType<typeof useDeleteWorksMutation>
export type DeleteWorksMutationResult = Apollo.MutationResult<DeleteWorksMutation>
export type DeleteWorksMutationOptions = Apollo.BaseMutationOptions<DeleteWorksMutation, DeleteWorksMutationVariables>
