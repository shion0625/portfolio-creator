import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
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
  Any: any;
  DateTime: any;
  Timestamp: any;
};

export type CreateWorkInput = {
  brief_story?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['String']>;
  image_url?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  number_of_people?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
  user_id: Scalars['String'];
};

export enum Model {
  User = 'user',
  Work = 'work'
}

export type ModelPagination = UserPagination | WorkPagination;

export type Mutation = {
  createWork: Scalars['Boolean'];
  deleteWorks: Scalars['Boolean'];
  login: Scalars['Any'];
  updateProfile: User;
  updateWork: Scalars['Boolean'];
};


export type MutationCreateWorkArgs = {
  input: CreateWorkInput;
};


export type MutationDeleteWorksArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  id: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateWorkArgs = {
  input: UpdateWorkInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type Pagination = {
  nodes: Array<Maybe<Node>>;
  pageInfo: PaginationInfo;
};

export type PaginationInfo = {
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  page: Scalars['Int'];
  paginationLength: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Profile = {
  birthday?: Maybe<Scalars['Timestamp']>;
  comment?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  user: User;
};

export type Query = {
  search: ModelPagination;
  user: User;
  userAuth: User;
  users: UserPagination;
  work?: Maybe<Work>;
  workNodes: Array<Work>;
  works: WorkPagination;
};


export type QuerySearchArgs = {
  keyword: Scalars['String'];
  limit: Scalars['Int'];
  num: Scalars['Int'];
  searched: Scalars['String'];
  target: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserAuthArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryWorkArgs = {
  id: Scalars['ID'];
};


export type QueryWorkNodesArgs = {
  limit: Scalars['Int'];
  num: Scalars['Int'];
  order: Scalars['String'];
  searched: Scalars['String'];
};


export type QueryWorksArgs = {
  limit: Scalars['Int'];
  num: Scalars['Int'];
  order: Scalars['String'];
  searched: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Viewer = 'VIEWER'
}

export type UpdateProfileInput = {
  birthday?: InputMaybe<Scalars['String']>;
  comment?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateWorkInput = {
  brief_story?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  image_url?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  number_of_people?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type User = Node & {
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Array<Maybe<Scalars['Timestamp']>>>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  works?: Maybe<WorkPagination>;
};

export type UserPagination = Pagination & {
  nodes: Array<User>;
  pageInfo: PaginationInfo;
  type: Model;
};

export type Work = Node & {
  brief_story?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  duration?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image_url?: Maybe<Scalars['String']>;
  is_delete: Scalars['Boolean'];
  language?: Maybe<Scalars['String']>;
  number_of_people?: Maybe<Scalars['Int']>;
  number_of_work: Scalars['Int'];
  role?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updated_at: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
  user: User;
};

export type WorkPagination = Pagination & {
  nodes: Array<Work>;
  pageInfo: PaginationInfo;
  type: Model;
};

export type PaginationFragmentFragment = { page: number, hasNextPage: boolean, count: number, totalCount: number, paginationLength: number, hasPreviousPage: boolean };

export type SearchQueryVariables = Exact<{
  target: Scalars['String'];
  keyword: Scalars['String'];
  limit: Scalars['Int'];
  searched: Scalars['String'];
  num: Scalars['Int'];
}>;


export type SearchQuery = { search: { type: Model, pageInfo: { page: number, hasNextPage: boolean, count: number, totalCount: number, paginationLength: number, hasPreviousPage: boolean }, nodes: Array<{ id: string, name?: string | null, email?: string | null }> } | { type: Model, pageInfo: { page: number, hasNextPage: boolean, count: number, totalCount: number, paginationLength: number, hasPreviousPage: boolean }, nodes: Array<{ id: string, title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url?: string | null, brief_story?: string | null, created_at: any, updated_at: any, number_of_work: number, is_delete: boolean, user: { id: string, name?: string | null, email?: string | null } }> } };

export type UserFragmentFragment = { id: string, name?: string | null, email?: string | null };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserQuery = { user: { id: string, name?: string | null, email?: string | null, works?: { pageInfo: { page: number, hasNextPage: boolean, count: number, totalCount: number, paginationLength: number, hasPreviousPage: boolean }, nodes: Array<{ id: string, title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url?: string | null, brief_story?: string | null, created_at: any, updated_at: any, number_of_work: number, is_delete: boolean }> } | null } };

export type GetUserAuthQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserAuthQuery = { userAuth: { id: string, name?: string | null, email?: string | null, works?: { pageInfo: { page: number, hasNextPage: boolean, count: number, totalCount: number, paginationLength: number, hasPreviousPage: boolean }, nodes: Array<{ id: string, title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url?: string | null, brief_story?: string | null, created_at: any, updated_at: any, number_of_work: number, is_delete: boolean }> } | null } };

export type GetUsersQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetUsersQuery = { users: { pageInfo: { page: number, hasNextPage: boolean, count: number, totalCount: number, paginationLength: number, hasPreviousPage: boolean }, nodes: Array<{ id: string, name?: string | null, works?: { nodes: Array<{ id: string, title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url?: string | null, brief_story?: string | null, created_at: any, updated_at: any, number_of_work: number, is_delete: boolean, user: { id: string, name?: string | null } }> } | null }> } };

export type GetUsersNameQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetUsersNameQuery = { users: { pageInfo: { page: number, hasNextPage: boolean, count: number, totalCount: number, paginationLength: number, hasPreviousPage: boolean }, nodes: Array<{ id: string, name?: string | null }> } };

export type GetUserIdsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetUserIdsQuery = { users: { nodes: Array<{ id: string }> } };

export type LoginMutationVariables = Exact<{
  id: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { login: any };

export type WorkFragmentFragment = { id: string, title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url?: string | null, brief_story?: string | null, created_at: any, updated_at: any, number_of_work: number, is_delete: boolean };

export type GetWorkQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetWorkQuery = { work?: { id: string, title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url?: string | null, brief_story?: string | null, created_at: any, updated_at: any, number_of_work: number, is_delete: boolean, user: { id: string, name?: string | null } } | null };

export type GetWorksQueryVariables = Exact<{
  limit: Scalars['Int'];
  order: Scalars['String'];
  searched: Scalars['String'];
  num: Scalars['Int'];
}>;


export type GetWorksQuery = { works: { pageInfo: { page: number, paginationLength: number, hasPreviousPage: boolean, hasNextPage: boolean, count: number, totalCount: number }, nodes: Array<{ id: string, title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url?: string | null, brief_story?: string | null, created_at: any, updated_at: any, number_of_work: number, is_delete: boolean, user: { id: string, name?: string | null } }> } };

export type GetWorkNodesQueryVariables = Exact<{
  limit: Scalars['Int'];
  order: Scalars['String'];
  searched: Scalars['String'];
  num: Scalars['Int'];
}>;


export type GetWorkNodesQuery = { workNodes: Array<{ id: string, title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url?: string | null, brief_story?: string | null, created_at: any, updated_at: any, number_of_work: number, is_delete: boolean, user: { id: string, name?: string | null } }> };

export type CreateWorkMutationVariables = Exact<{
  input: CreateWorkInput;
}>;


export type CreateWorkMutation = { createWork: boolean };

export type UpdateWorkMutationVariables = Exact<{
  input: UpdateWorkInput;
}>;


export type UpdateWorkMutation = { updateWork: boolean };

export type DeleteWorksMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
}>;


export type DeleteWorksMutation = { deleteWorks: boolean };

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
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  name
  email
}
    `;
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
  number_of_work
  is_delete
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
      type
      pageInfo {
        ...PaginationFragment
      }
      nodes {
        ...UserFragment
      }
    }
    ... on WorkPagination {
      type
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
}
    ${PaginationFragmentFragmentDoc}
${UserFragmentFragmentDoc}
${WorkFragmentFragmentDoc}`;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
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
    ${PaginationFragmentFragmentDoc}
${WorkFragmentFragmentDoc}`;
export const GetUserAuthDocument = gql`
    query GetUserAuth($id: ID!) {
  userAuth(id: $id) {
    id
    name
    email
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
    ${PaginationFragmentFragmentDoc}
${WorkFragmentFragmentDoc}`;
export const GetUsersDocument = gql`
    query GetUsers($limit: Int!, $offset: Int) {
  users(limit: $limit, offset: $offset) {
    pageInfo {
      ...PaginationFragment
    }
    nodes {
      id
      name
      works {
        nodes {
          ...WorkFragment
          user {
            id
            name
          }
        }
      }
    }
  }
}
    ${PaginationFragmentFragmentDoc}
${WorkFragmentFragmentDoc}`;
export const GetUsersNameDocument = gql`
    query GetUsersName($limit: Int!, $offset: Int) {
  users(limit: $limit, offset: $offset) {
    pageInfo {
      ...PaginationFragment
    }
    nodes {
      id
      name
    }
  }
}
    ${PaginationFragmentFragmentDoc}`;
export const GetUserIdsDocument = gql`
    query GetUserIds($limit: Int!, $offset: Int) {
  users(limit: $limit, offset: $offset) {
    nodes {
      id
    }
  }
}
    `;
export const LoginDocument = gql`
    mutation Login($id: String!, $email: String!) {
  login(id: $id, email: $email)
}
    `;
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
    ${WorkFragmentFragmentDoc}`;
export const GetWorksDocument = gql`
    query GetWorks($limit: Int!, $order: String!, $searched: String!, $num: Int!) {
  works(limit: $limit, order: $order, searched: $searched, num: $num) {
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
    ${WorkFragmentFragmentDoc}`;
export const GetWorkNodesDocument = gql`
    query GetWorkNodes($limit: Int!, $order: String!, $searched: String!, $num: Int!) {
  workNodes(limit: $limit, order: $order, searched: $searched, num: $num) {
    ...WorkFragment
    user {
      id
      name
    }
  }
}
    ${WorkFragmentFragmentDoc}`;
export const CreateWorkDocument = gql`
    mutation CreateWork($input: CreateWorkInput!) {
  createWork(input: $input)
}
    `;
export const UpdateWorkDocument = gql`
    mutation UpdateWork($input: UpdateWorkInput!) {
  updateWork(input: $input)
}
    `;
export const DeleteWorksDocument = gql`
    mutation DeleteWorks($ids: [ID]!) {
  deleteWorks(ids: $ids)
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Search(variables: SearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchQuery>(SearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Search', 'query');
    },
    GetUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUser', 'query');
    },
    GetUserAuth(variables: GetUserAuthQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserAuthQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserAuthQuery>(GetUserAuthDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUserAuth', 'query');
    },
    GetUsers(variables: GetUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersQuery>(GetUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUsers', 'query');
    },
    GetUsersName(variables: GetUsersNameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersNameQuery>(GetUsersNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUsersName', 'query');
    },
    GetUserIds(variables: GetUserIdsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserIdsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserIdsQuery>(GetUserIdsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUserIds', 'query');
    },
    Login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Login', 'mutation');
    },
    GetWork(variables: GetWorkQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetWorkQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWorkQuery>(GetWorkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetWork', 'query');
    },
    GetWorks(variables: GetWorksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetWorksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWorksQuery>(GetWorksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetWorks', 'query');
    },
    GetWorkNodes(variables: GetWorkNodesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetWorkNodesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWorkNodesQuery>(GetWorkNodesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetWorkNodes', 'query');
    },
    CreateWork(variables: CreateWorkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateWorkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateWorkMutation>(CreateWorkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateWork', 'mutation');
    },
    UpdateWork(variables: UpdateWorkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateWorkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateWorkMutation>(UpdateWorkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateWork', 'mutation');
    },
    DeleteWorks(variables: DeleteWorksMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteWorksMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteWorksMutation>(DeleteWorksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteWorks', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;