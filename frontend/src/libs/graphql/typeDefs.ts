export const typeDefs = `scalar Timestamp
scalar DateTime
scalar Any
union ModelPagination = WorkPagination | UserPagination

interface Node {
  id: ID!
}

enum Model {
  user
  work
}

enum SortBy {
  create
  update
}

enum Role {
  ADMIN
  USER
  VIEWER
}

interface Pagination {
  pageInfo: PaginationInfo!
  nodes: [Node]!
}

type PaginationInfo {
  page: Int!
  paginationLength: Int!
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  count: Int!
  totalCount: Int!
}

type UpdateProfileInput {
  id: ID!
  birthday: String
  comment: String
}

input CreateWorkInput {
  title: String!
  summary: String
  image_url: String
  duration: String
  number_of_people: Int
  language: String
  role: String
  url: String
  brief_story: String
  user_id: String!
}

input UpdateWorkInput {
  id: ID!
  title: String
  summary: String
  image_url: String
  duration: String
  number_of_people: Int
  language: String
  role: String
  url: String
  brief_story: String
}

type Profile {
  id: ID!
  birthday: Timestamp
  comment: String
  user: User!
}

type Query {
  userAuth(id: ID!): User!
  user(id: ID!): User!
  users(limit: Int!, offset: Int): UserPagination!
  work(id: ID!): Work
  works(sortBy: SortBy!, searchedAt: String!, num: Int!, limit: Int!): WorkPagination!
  search(target: String!, keyword: String!, sortBy: SortBy!, searchedAt: String!, num: Int!, limit: Int!): UserPagination!
}

type Mutation {
  createWork(input: CreateWorkInput!): Boolean!
  updateWork(input: UpdateWorkInput!): Boolean!
  deleteWorks(ids: [ID]!): Boolean!
  login(id: String!, email: String!): Any!
}

type User implements Node {
  id: ID!
  name: String
  email: String
  emailVerified: [Timestamp]
  image: String
  created_at: DateTime!
  updated_at: DateTime!
  serial_number: Int!
  works: WorkPagination
  profile: Profile
}

type UserPagination implements Pagination {
  type: Model!
  pageInfo: PaginationInfo!
  nodes: [User!]!
}

type Work implements Node {
  id: ID!
  title: String!
  summary: String
  image_url: String
  duration: String
  number_of_people: Int
  language: String
  role: String
  url: String
  brief_story: String
  created_at: DateTime!
  updated_at: DateTime!
  is_delete: Boolean!
  serial_number: Int!
  user: User!
}

type WorkPagination implements Pagination {
  type: Model!
  pageInfo: PaginationInfo!
  nodes: [Work!]!
}
`
