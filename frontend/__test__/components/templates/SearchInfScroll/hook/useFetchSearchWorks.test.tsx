import { renderHook } from '@testing-library/react'
import useQuerySearch from '~/components/templates/SearchInfScroll/hook/useQuerySearch'
import { useFetchSearchWorks } from '~/components/templates/SearchInfScroll/hook/useFetchSearchWorks'
import { Model, SortBy } from '~/models/types'
import { fakeWorkPagination } from '__mocks__'

jest.mock('~/components/templates/SearchInfScroll/hook/useQuerySearch')

const mockUseQuerySearch = useQuerySearch as jest.MockedFunction<typeof useQuerySearch>

describe('useFetchSearchWorks', () => {
  beforeEach(() => {
    mockUseQuerySearch.mockClear()
  })

  it('calls useQuerySearch when variables change', () => {
    const Props = {
      keyword: 'test',
      sortBy: SortBy.Create,
      target: Model.Work,
    }
    mockUseQuerySearch.mockImplementationOnce(() => ({
      searchResult: fakeWorkPagination,
      loading: false,
      error: null,
      refetch: jest.fn(),
    }))


    const { result } = renderHook(() =>
      useFetchSearchWorks(Props.target, Props.sortBy, Props.keyword)
    )

    const variables = {
      keyword: Props.keyword,
      target: Props.target,
      sortBy: Props.sortBy,
      searchedAt: expect.any(String),
      num: 9999,
      limit: Number(process.env.NEXT_PUBLIC_DEFAULT_VOLUMES),
    }

    expect(result.current.searchData).toEqual(fakeWorkPagination)

    expect(mockUseQuerySearch).toHaveBeenCalledTimes(1)
    expect(mockUseQuerySearch).toHaveBeenCalledWith(
      variables,
      expect.any(Function),
      expect.any(Object)
    )

    // const newKeyword = 'updated'
    // const newVariables = {
    //   ...variables,
    //   keyword: newKeyword,
    // }

    // rerender()

    // expect(result.current.searchData).toEqual(fakeWorkPagination)

    // expect(mockUseQuerySearch).toHaveBeenCalledTimes(2)
    // expect(mockUseQuerySearch).toHaveBeenCalledWith(
    //   newVariables,
    //   expect.any(Function),
    //   expect.any(Object)
    // )
  })
})
