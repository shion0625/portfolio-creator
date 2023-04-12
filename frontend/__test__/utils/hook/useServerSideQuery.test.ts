import { executeQuery } from '~/utils/hook/useServerSideQuery'

describe('executeQuery', () => {
  const mockGetSdk = jest.fn()
  const mockClient = { request: jest.fn() }

  // beforeAll(() => {
  //   jest.mock('graphql-request', () => ({
  //     GraphQLClient: jest.fn(() => mockClient),
  //   }))

  //   jest.mock('~/models/client', () => ({
  //     getSdk: jest.fn(() => mockGetSdk),
  //   }))
  // })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should execute a query with given variables', async () => {
    const mockData = { someData: 'data' }
    const query = 'GetUser'
    const variables = { id: '123' }

    mockGetSdk.mockReturnValueOnce({
      GetUser: jest.fn().mockResolvedValueOnce(mockData),
    })

    const result = await executeQuery(query, variables)

    expect(mockClient.request).toHaveBeenCalledWith(query, variables)
    expect(result).toEqual(mockData)
  })

  it('should return alert if data is not found', async () => {
    const mockData = undefined
    const query = 'GetUser'
    const variables = { id: '123' }

    mockGetSdk.mockReturnValueOnce({
      GetUser: jest.fn().mockResolvedValueOnce(mockData),
    })

    const alertSpy = jest.spyOn(window, 'alert').mockImplementationOnce(() => {})

    const result = await executeQuery(query, variables)

    expect(mockClient.request).toHaveBeenCalledWith(query, variables)
    expect(alertSpy).toHaveBeenCalledWith('error')
    expect(result).toBeUndefined()
  })

  it('should sleep if delay is given', async () => {
    const mockData = { someData: 'data' }
    const query = 'GetUser'
    const variables = { id: '123' }
    const delay = 500

    mockGetSdk.mockReturnValueOnce({
      GetUser: jest.fn().mockResolvedValueOnce(mockData),
    })

    const result = await executeQuery(query, variables, delay)

    expect(mockClient.request).toHaveBeenCalledWith(query, variables)
    expect(result).toEqual(mockData)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), delay)
  })
})
