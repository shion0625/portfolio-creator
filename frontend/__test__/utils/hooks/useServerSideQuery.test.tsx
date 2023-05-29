import {
  createFakeUser,
  createFakeWorkPaginationWithoutType,
  createFakeIds,
  createFakeUserPaginationWithoutType,
} from '__mocks__'
import { GraphQLClient } from 'graphql-request'
import sinon from 'sinon'
import {
  GetUserDocument,
  GetUserQuery,
  GetUserQueryVariables,
  GetUserIdsDocument,
  GetUserIdsQuery,
  GetUserIdsQueryVariables,
  GetUsersNameDocument,
  GetUsersNameQuery,
  GetUsersNameQueryVariables,
} from '~/models/client'
import { executeQuery } from '~/utils/hooks/useServerSideQuery'

describe('executeQuery', () => {
  let requestStub: sinon.SinonStub

  beforeEach(() => {
    // GraphQLClientのリクエストをスタブ化
    requestStub = sinon.stub(GraphQLClient.prototype, 'request')
  })

  afterEach(() => {
    // スタブ化したものを解除
    requestStub.restore()
  })

  it('should execute query at GetUser', async () => {
    // スタブ化したGraphQLClient.requestに渡す値として返却するデータを定義
    const fakeUser = createFakeUser()
    const expectedData: GetUserQuery = {
      user: {
        ...fakeUser,
        works: createFakeWorkPaginationWithoutType(),
      },
    }
    const variables: GetUserQueryVariables = { id: fakeUser.id }

    requestStub.resolves(expectedData)

    const result = await executeQuery('GetUser', variables)

    expect(result).toEqual(expectedData)
    expect(requestStub.calledOnce).toBe(true)
    expect(requestStub.args[0][0]).toEqual(GetUserDocument)
  })

  it('should execute query at GetUserIds', async () => {
    // スタブ化したGraphQLClient.requestに渡す値として返却するデータを定義
    const fakeIds = createFakeIds()
    const expectedData: GetUserIdsQuery = {
      users: fakeIds,
    }
    const variables: GetUserIdsQueryVariables = { limit: fakeIds.nodes.length, offset: 0 }

    requestStub.resolves(expectedData)

    const result = await executeQuery('GetUserIds', variables)

    expect(result).toEqual(expectedData)
    expect(requestStub.calledOnce).toBe(true)
    expect(requestStub.args[0][0]).toEqual(GetUserIdsDocument)
  })

  it('should execute query at GetUsersName', async () => {
    // スタブ化したGraphQLClient.requestに渡す値として返却するデータを定義
    const fakeUserPaginationWithoutType = createFakeUserPaginationWithoutType()
    const expectedData: GetUsersNameQuery = {
      users: fakeUserPaginationWithoutType,
    }

    const variables: GetUsersNameQueryVariables = { limit: fakeUserPaginationWithoutType.nodes.length, offset: 0 }

    requestStub.resolves(expectedData)

    const result = await executeQuery('GetUsersName', variables)

    expect(result).toEqual(expectedData)
    expect(requestStub.calledOnce).toBe(true)
    expect(requestStub.args[0][0]).toEqual(GetUsersNameDocument)
  })

  it('should show alert when data is not returned', async () => {
    const variables: GetUserQueryVariables = { id: createFakeUser().id }

    requestStub.resolves(null) // データが取得できない場合

    // alertをスタブ化
    const alertStub = sinon.stub(window, 'alert')

    const result = await executeQuery('GetUser', variables)

    expect(result).toBe(undefined) // undefinedが返ることを確認
    expect(alertStub.calledOnceWithExactly('error')).toBe(true) // alertが1回呼ばれ、'error'が渡されることを確認
    expect(requestStub.calledOnce).toBe(true) // GraphQLClientのrequestが1回呼ばれることを確認

    alertStub.restore() // スタブ化したalertを元に戻す
  })

  //[TODO] variableがなくてもいいものがあったらそれに置き換える。GetUserを
  it('should execute query when variable is not defined', async () => {
    const expectedData: GetUserQuery = {
      user: {
        ...createFakeUser(),
        works: createFakeWorkPaginationWithoutType(),
      },
    }

    requestStub.resolves(expectedData)

    const result = await executeQuery('GetUser')

    expect(result).toEqual(expectedData)
    expect(requestStub.calledOnce).toBe(true)
    expect(requestStub.args[0][0]).toEqual(GetUserDocument)
  })
})
