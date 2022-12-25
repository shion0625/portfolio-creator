import * as Types from '../../src/models/types'
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
    user: { id: string; name?: string | null }
  } | null
}

export type GetWorksQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int']
  offset?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetWorksQuery = {
  works: {
    pageInfo: { page: number; paginationLength: number; hasPreviousPage: boolean; hasNextPage: boolean; count: number; totalCount: number }
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
  }
}

export type UpdateWorkMutationVariables = Types.Exact<{
  input: Types.UpdateWorkInput
}>

export type UpdateWorkMutation = {
  updateWork: {
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
  }
}

export type DeleteWorkMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type DeleteWorkMutation = { deleteWork?: boolean | null }

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
  }
`
export const GetWorkDocument = gql`
  query GetWork($id: ID!) {
    work(id: $id) {
      ...WorkFragment
      user {
        id
        name
      }
    }
  }
  ${WorkFragmentFragmentDoc}
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
        ...WorkFragment
        user {
          id
          name
        }
      }
    }
  }
  ${WorkFragmentFragmentDoc}
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
    createWork(input: $input) {
      ...WorkFragment
    }
  }
  ${WorkFragmentFragmentDoc}
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
export function useCreateWorkMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkMutation, CreateWorkMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateWorkMutation, CreateWorkMutationVariables>(CreateWorkDocument, options)
}
export type CreateWorkMutationHookResult = ReturnType<typeof useCreateWorkMutation>
export type CreateWorkMutationResult = Apollo.MutationResult<CreateWorkMutation>
export type CreateWorkMutationOptions = Apollo.BaseMutationOptions<CreateWorkMutation, CreateWorkMutationVariables>
export const UpdateWorkDocument = gql`
  mutation UpdateWork($input: UpdateWorkInput!) {
    updateWork(input: $input) {
      ...WorkFragment
    }
  }
  ${WorkFragmentFragmentDoc}
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
export function useUpdateWorkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkMutation, UpdateWorkMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateWorkMutation, UpdateWorkMutationVariables>(UpdateWorkDocument, options)
}
export type UpdateWorkMutationHookResult = ReturnType<typeof useUpdateWorkMutation>
export type UpdateWorkMutationResult = Apollo.MutationResult<UpdateWorkMutation>
export type UpdateWorkMutationOptions = Apollo.BaseMutationOptions<UpdateWorkMutation, UpdateWorkMutationVariables>
export const DeleteWorkDocument = gql`
  mutation DeleteWork($id: ID!) {
    deleteWork(id: $id)
  }
`
export type DeleteWorkMutationFn = Apollo.MutationFunction<DeleteWorkMutation, DeleteWorkMutationVariables>

/**
 * __useDeleteWorkMutation__
 *
 * To run a mutation, you first call `useDeleteWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkMutation, { data, loading, error }] = useDeleteWorkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWorkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkMutation, DeleteWorkMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteWorkMutation, DeleteWorkMutationVariables>(DeleteWorkDocument, options)
}
export type DeleteWorkMutationHookResult = ReturnType<typeof useDeleteWorkMutation>
export type DeleteWorkMutationResult = Apollo.MutationResult<DeleteWorkMutation>
export type DeleteWorkMutationOptions = Apollo.BaseMutationOptions<DeleteWorkMutation, DeleteWorkMutationVariables>
