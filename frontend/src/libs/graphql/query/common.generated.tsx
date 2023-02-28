import * as Types from '../../../models/types';

import { gql } from '@apollo/client';
import { UserFragmentFragmentDoc } from './user.generated';
import { WorkFragmentFragmentDoc } from './work.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PaginationFragmentFragment = { page: number, hasNextPage: boolean, count: number, totalCount: number, paginationLength: number, hasPreviousPage: boolean };

export type SearchQueryVariables = Types.Exact<{
  target: Types.Scalars['String'];
  keyword: Types.Scalars['String'];
  limit: Types.Scalars['Int'];
  searched: Types.Scalars['String'];
  num: Types.Scalars['Int'];
}>;


export type SearchQuery = { search: { pageInfo: { page: number, hasNextPage: boolean, count: number, totalCount: number, paginationLength: number, hasPreviousPage: boolean }, nodes: Array<{ id: string, name?: string | null, email?: string | null }> } | { pageInfo: { page: number, hasNextPage: boolean, count: number, totalCount: number, paginationLength: number, hasPreviousPage: boolean }, nodes: Array<{ id: string, title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url?: string | null, brief_story?: string | null, created_at: any, updated_at: any, number_of_work?: number | null, is_delete: boolean }> } };

export const PaginationFragmentFragmentDoc = gql`
    fragment PaginationFragment on PaginationInfo {
  page
  hasNextPage
  count
  totalCount
  paginationLength
  hasPreviousPage
}
    `;
export const SearchDocument = gql`
    query Search($target: String!, $keyword: String!, $limit: Int!, $searched: String!, $num: Int!) {
  search(
    target: $target
    keyword: $keyword
    limit: $limit
    searched: $searched
    num: $num
  ) {
    ... on UserPagination {
      pageInfo {
        ...PaginationFragment
      }
      nodes {
        ...UserFragment
      }
    }
    ... on WorkPagination {
      pageInfo {
        ...PaginationFragment
      }
      nodes {
        ...WorkFragment
      }
    }
  }
}
    ${PaginationFragmentFragmentDoc}
${UserFragmentFragmentDoc}
${WorkFragmentFragmentDoc}`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      target: // value for 'target'
 *      keyword: // value for 'keyword'
 *      limit: // value for 'limit'
 *      searched: // value for 'searched'
 *      num: // value for 'num'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;