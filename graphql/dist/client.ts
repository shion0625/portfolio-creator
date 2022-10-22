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
  Timestamp: any;
};

export type CreateUserInput = {
  email: Scalars['String'];
  is_admin: Scalars['Boolean'];
  name: Scalars['String'];
  password: Scalars['String'];
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
  url: Scalars['String'];
  user_id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  createWork: Work;
  deleteUser?: Maybe<Scalars['Boolean']>;
  deleteWork?: Maybe<Scalars['Boolean']>;
  updateUser: User;
  updateWork: Work;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWorkArgs = {
  input: CreateWorkInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteWorkArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateWorkArgs = {
  input: UpdateWorkInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type Pagination = {
  nodes: Array<Node>;
  pageInfo: PaginationInfo;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  page: Scalars['Int'];
  paginationLength: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users?: Maybe<UserPagination>;
  work?: Maybe<Work>;
  works?: Maybe<WorkPagination>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryWorkArgs = {
  id: Scalars['ID'];
};


export type QueryWorksArgs = {
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Viewer = 'VIEWER'
}

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  is_admin?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
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
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  is_able: Scalars['Boolean'];
  is_admin: Scalars['Boolean'];
  name: Scalars['String'];
  password: Scalars['String'];
  works?: Maybe<WorkPagination>;
};

export type UserPagination = Pagination & {
  __typename?: 'UserPagination';
  nodes: Array<User>;
  pageInfo: PaginationInfo;
};

export type Work = Node & {
  __typename?: 'Work';
  brief_story?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image_url?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  number_of_people?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  url: Scalars['String'];
  user: User;
};

export type WorkPagination = Pagination & {
  __typename?: 'WorkPagination';
  nodes: Array<Work>;
  pageInfo: PaginationInfo;
};

export type GetUserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, is_admin: boolean, name: string, email: string, works?: { __typename?: 'WorkPagination', pageInfo: { __typename?: 'PaginationInfo', page: number, hasNextPage: boolean, count: number, totalCount: number, paginationLength: number, hasPreviousPage: boolean }, nodes: Array<{ __typename?: 'Work', title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url: string, brief_story?: string | null }> } | null } | null };

export type GetUsersQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users?: { __typename?: 'UserPagination', pageInfo: { __typename?: 'PaginationInfo', page: number, paginationLength: number, hasNextPage: boolean, hasPreviousPage: boolean, count: number, totalCount: number }, nodes: Array<{ __typename?: 'User', name: string, works?: { __typename?: 'WorkPagination', nodes: Array<{ __typename?: 'Work', title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url: string, brief_story?: string | null, user: { __typename?: 'User', id: string, name: string } }> } | null }> } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string } };

export type GetWorkQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetWorkQuery = { __typename?: 'Query', work?: { __typename?: 'Work', id: string, title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url: string, brief_story?: string | null, user: { __typename?: 'User', id: string, name: string } } | null };

export type GetWorksQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetWorksQuery = { __typename?: 'Query', works?: { __typename?: 'WorkPagination', pageInfo: { __typename?: 'PaginationInfo', page: number, paginationLength: number, hasPreviousPage: boolean, hasNextPage: boolean, count: number, totalCount: number }, nodes: Array<{ __typename?: 'Work', title: string, summary?: string | null, image_url?: string | null, duration?: string | null, number_of_people?: number | null, language?: string | null, role?: string | null, url: string, brief_story?: string | null, user: { __typename?: 'User', id: string, name: string } }> } | null };


export const GetUserDocument = gql`
    query GetUser($userId: ID!) {
  user(id: $userId) {
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
    `;
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
      name
      works {
        nodes {
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
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
  }
}
    `;
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
    `;
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
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUser', 'query');
    },
    GetUsers(variables: GetUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersQuery>(GetUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetUsers', 'query');
    },
    CreateUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateUser', 'mutation');
    },
    GetWork(variables: GetWorkQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetWorkQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWorkQuery>(GetWorkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetWork', 'query');
    },
    GetWorks(variables: GetWorksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetWorksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWorksQuery>(GetWorksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetWorks', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;