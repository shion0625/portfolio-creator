export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Any: any
  DateTime: any
  Timestamp: any
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
  url?: InputMaybe<Scalars['String']>
  user_id: Scalars['String']
}

export enum Model {
  User = 'user',
  Work = 'work',
}

export type ModelPagination = UserPagination | WorkPagination

export type Mutation = {
  createWork: Scalars['Boolean']
  deleteWorks: Scalars['Boolean']
  login: Scalars['Any']
  updateProfile: User
  updateWork: Scalars['Boolean']
}

export type MutationCreateWorkArgs = {
  input: CreateWorkInput
}

export type MutationDeleteWorksArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>
}

export type MutationLoginArgs = {
  email: Scalars['String']
  id: Scalars['String']
}

export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput
}

export type MutationUpdateWorkArgs = {
  input: UpdateWorkInput
}

export type Node = {
  id: Scalars['ID']
}

export type Pagination = {
  nodes: Array<Maybe<Node>>
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

export type Profile = {
  birthday?: Maybe<Scalars['Timestamp']>
  comment?: Maybe<Scalars['String']>
  id: Scalars['ID']
  user: User
}

export type Query = {
  search: ModelPagination
  user: User
  userAuth: User
  users: UserPagination
  work?: Maybe<Work>
  works: WorkPagination
}

export type QuerySearchArgs = {
  keyword: Scalars['String']
  limit: Scalars['Int']
  num: Scalars['Int']
  searchedAt: Scalars['String']
  sortBy: SortBy
  target: Scalars['String']
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type QueryUserAuthArgs = {
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
  num: Scalars['Int']
  searchedAt: Scalars['String']
  sortBy: SortBy
}

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Viewer = 'VIEWER',
}

export enum SortBy {
  Create = 'create',
  Update = 'update',
}

export type UpdateProfileInput = {
  birthday?: InputMaybe<Scalars['String']>
  comment?: InputMaybe<Scalars['String']>
  id: Scalars['ID']
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
  created_at: Scalars['DateTime']
  email?: Maybe<Scalars['String']>
  emailVerified?: Maybe<Array<Maybe<Scalars['Timestamp']>>>
  id: Scalars['ID']
  image?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  profile?: Maybe<Profile>
  serial_number: Scalars['Int']
  updated_at: Scalars['DateTime']
  works?: Maybe<WorkPagination>
}

export type UserPagination = Pagination & {
  nodes: Array<User>
  pageInfo: PaginationInfo
  type: Model
}

export type Work = Node & {
  brief_story?: Maybe<Scalars['String']>
  created_at: Scalars['DateTime']
  duration?: Maybe<Scalars['String']>
  id: Scalars['ID']
  image_url?: Maybe<Scalars['String']>
  is_delete: Scalars['Boolean']
  language?: Maybe<Scalars['String']>
  number_of_people?: Maybe<Scalars['Int']>
  role?: Maybe<Scalars['String']>
  serial_number: Scalars['Int']
  summary?: Maybe<Scalars['String']>
  title: Scalars['String']
  updated_at: Scalars['DateTime']
  url?: Maybe<Scalars['String']>
  user: User
}

export type WorkPagination = Pagination & {
  nodes: Array<Work>
  pageInfo: PaginationInfo
  type: Model
}
