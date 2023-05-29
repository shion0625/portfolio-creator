import { renderHook, waitFor, act } from '@testing-library/react'
import { createFakeWorkPagination, createFakeUserPagination } from '__mocks__'
import { useFetchSearchWorks, INITIAL_STATE } from '~/components/templates/SearchInfScroll/hooks'
import useQuerySearch, {
  SearchResult,
  Variables,
  SearchDataState,
} from '~/components/templates/SearchInfScroll/hooks/useQuerySearch'
import { Work, WorkPagination } from '~/models/client'
import { Model, SortBy } from '~/models/types'

jest.mock('~/components/templates/SearchInfScroll/hooks/useQuerySearch')

const mockUseQuerySearch = useQuerySearch as jest.MockedFunction<typeof useQuerySearch>

describe('useFetchSearchWorks', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuerySearch.mockImplementationOnce(() => ({
      searchResult: createFakeWorkPagination(),
      loading: false,
      error: null,
      refetch: jest.fn(),
    }))
  })

  it('should initialize variables on mount', () => {
    const target = Model.Work
    const sortBy = SortBy.Create
    const keyword = 'test'
    const fakeWorkPagination = createFakeWorkPagination()

    ;(useQuerySearch as jest.Mock).mockImplementation(() => ({
      searchResult: fakeWorkPagination,
      loading: false,
      error: null,
      refetch: jest.fn(),
    }))

    const { result } = renderHook(() => useFetchSearchWorks(target, sortBy, keyword))

    expect(result.current.searchData.type).toBe(target)
    expect(result.current.searchData.pageInfo).toMatchObject(fakeWorkPagination.pageInfo)
    expect(result.current.searchData.nodes).toEqual(fakeWorkPagination.nodes)
    expect(result.current.onScroll).toBeDefined()
  })

  it('should update searchData on successful query at Model Work', async () => {
    const target = Model.Work
    const sortBy = SortBy.Create
    const keyword = 'keyword'
    const fakeWorkPagination = createFakeWorkPagination()

    const expectedData: SearchDataState<typeof target> = fakeWorkPagination

    ;(useQuerySearch as jest.Mock).mockImplementation(() => ({
      searchResult: expectedData,
      loading: false,
      error: null,
      refetch: jest.fn(),
    }))
    const { result } = renderHook(() => useFetchSearchWorks(target, sortBy, keyword))

    waitFor(() => {
      expect(result.current.searchData.nodes).toEqual(expectedData.nodes)
      expect(result.current.searchData.pageInfo).toEqual(expectedData.pageInfo)
    })
  })

  it('should update searchData on successful query at Model User', async () => {
    const target = Model.User
    const sortBy = SortBy.Create
    const keyword = 'keyword'
    const fakeUserPagination = createFakeUserPagination()

    const expectedData: SearchDataState<typeof target> = fakeUserPagination

    ;(useQuerySearch as jest.Mock).mockImplementation(() => ({
      searchResult: expectedData,
      loading: false,
      error: null,
      refetch: jest.fn(),
    }))
    const { result } = renderHook(() => useFetchSearchWorks(target, sortBy, keyword))

    waitFor(() => {
      expect(result.current.searchData.nodes).toEqual(expectedData.nodes)
      expect(result.current.searchData.pageInfo).toEqual(expectedData.pageInfo)
    })
  })

  it('should update variables on scroll at SortBy Create', () => {
    const target = Model.Work
    const sortBy = SortBy.Create
    const keyword = 'keyword'
    const fakeWorkPagination = createFakeWorkPagination()

    ;(useQuerySearch as jest.Mock).mockImplementation(() => ({
      searchResult: fakeWorkPagination,
      loading: false,
      error: null,
      refetch: jest.fn(),
    }))

    const { result } = renderHook(() => useFetchSearchWorks(target, sortBy, keyword))

    const lastData = fakeWorkPagination.nodes[fakeWorkPagination.nodes.length - 1]
    act(() => {
      result.current.onScroll()
    })
    const expectedVariables = {
      target,
      sortBy,
      keyword,
      limit: Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES),
      searchedAt: lastData.created_at,
      num: lastData.serial_number,
    }
    waitFor(() => {
      expect(mockUseQuerySearch).toHaveBeenCalledTimes(2)
      expect(mockUseQuerySearch).toHaveBeenLastCalledWith(expectedVariables)
    })
  })

  it('should update variables on scroll at SortBy Update', () => {
    const target = Model.Work
    const sortBy = SortBy.Update
    const keyword = 'keyword'
    const fakeWorkPagination = createFakeWorkPagination()

    ;(useQuerySearch as jest.Mock).mockImplementation(() => ({
      searchResult: fakeWorkPagination,
      loading: false,
      error: null,
      refetch: jest.fn(),
    }))

    const { result } = renderHook(() => useFetchSearchWorks(target, sortBy, keyword))

    const lastData = fakeWorkPagination.nodes[fakeWorkPagination.nodes.length - 1]
    act(() => {
      result.current.onScroll()
    })
    const expectedVariables = {
      target,
      sortBy,
      keyword,
      limit: Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES),
      searchedAt: lastData.updated_at,
      num: lastData.serial_number,
    }
    waitFor(() => {
      expect(mockUseQuerySearch).toHaveBeenCalledTimes(2)
      expect(mockUseQuerySearch).toHaveBeenLastCalledWith(expectedVariables)
    })
  })

  it('should update variables on scroll twice', () => {
    let count = 0
    const target = Model.Work
    const sortBy = SortBy.Create
    const keyword = 'keyword'
    const fakeWorkPagination = createFakeWorkPagination()
    const fakeWorkPaginationSecond = createFakeWorkPagination()

    ;(useQuerySearch as jest.Mock).mockImplementation(() => {
      count++
      if (count == 1) {
        return {
          searchResult: createFakeWorkPagination(),
          loading: false,
          error: null,
          refetch: jest.fn(),
        }
      } else if (count == 2) {
        return {
          searchResult: fakeWorkPagination,
          loading: false,
          error: null,
          refetch: jest.fn(),
        }
      } else {
        return {
          searchResult: fakeWorkPaginationSecond,
          loading: false,
          error: null,
          refetch: jest.fn(),
        }
      }
    })

    const { result } = renderHook(() => useFetchSearchWorks(target, sortBy, keyword))

    act(() => {
      result.current.onScroll()
    })

    const lastData = fakeWorkPagination.nodes[fakeWorkPagination.nodes.length - 1]
    const expectedVariables = {
      target,
      sortBy,
      keyword,
      limit: Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES),
      searchedAt: lastData.created_at,
      num: lastData.serial_number,
    }
    waitFor(() => {
      expect(mockUseQuerySearch).toHaveBeenCalledTimes(2)
      expect(mockUseQuerySearch).toHaveBeenLastCalledWith(expectedVariables)
    })

    act(() => {
      result.current.onScroll()
    })
    const lastDataSecond = fakeWorkPaginationSecond.nodes[fakeWorkPaginationSecond.nodes.length - 1]

    const expectedVariablesSecond = {
      target,
      sortBy,
      keyword,
      limit: Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES),
      searchedAt: lastDataSecond.created_at,
      num: lastDataSecond.serial_number,
    }
    waitFor(() => {
      expect(mockUseQuerySearch).toHaveBeenCalledTimes(3)
      expect(mockUseQuerySearch).toHaveBeenLastCalledWith(expectedVariablesSecond)
    })
  })

  it('should return empty array when searchResult is undefined', () => {
    const target = Model.Work
    const sortBy = SortBy.Create
    const keyword = 'keyword'

    ;(useQuerySearch as jest.Mock).mockImplementation(() => ({
      searchResult: undefined,
      loading: false,
      error: null,
      refetch: jest.fn(),
    }))

    const { result } = renderHook(() => useFetchSearchWorks(target, sortBy, keyword))

    waitFor(() => {
      expect(result.current.searchData.nodes).toEqual([])
      expect(result.current.searchData.pageInfo).toEqual(INITIAL_STATE.pageInfo)
    })
  })

  it('should throw error when loading failed', () => {
    const target = Model.Work
    const sortBy = SortBy.Create
    const keyword = 'keyword'

    const error = new Error('Failed to load')
    mockUseQuerySearch.mockImplementationOnce(() => ({
      searchResult: undefined,
      loading: false,
      error,
      refetch: jest.fn(),
    }))

    const { result } = renderHook(() => useFetchSearchWorks(target, sortBy, keyword))

    expect(result.current.error).toEqual(error)
  })
})
