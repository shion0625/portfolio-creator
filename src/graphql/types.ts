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
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  page: Scalars['Int'];
  paginationLength: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Query = {
  user: User;
  users: UserPagination;
  work?: Maybe<Work>;
  works: WorkPagination;
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
  email: Scalars['String'];
  id: Scalars['ID'];
  is_able: Scalars['Boolean'];
  is_admin: Scalars['Boolean'];
  name: Scalars['String'];
  password: Scalars['String'];
  works?: Maybe<WorkPagination>;
};

export type UserPagination = Pagination & {
  nodes: Array<User>;
  pageInfo: PaginationInfo;
};

export type Work = Node & {
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
  nodes: Array<Work>;
  pageInfo: PaginationInfo;
};
