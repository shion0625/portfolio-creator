import { render, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Search from '~/components/screens/Search'
import { currentTabState } from '~/stores/CurrentTab'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('Search', () => {
  let mockRouter: {
    push: jest.Mock
    pathname: string
  }

  it('should call router.push when the enter key is pressed, file name is works...', () => {
    mockRouter = {
      push: jest.fn(),
      pathname: '/works',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { getByLabelText } = render(
      <RecoilRoot>
        <Search />
      </RecoilRoot>,
    )

    const inputElement = getByLabelText('search') as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: 'test keyword' } })
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/search',
      query: {
        target: 'works',
        keyword: 'test keyword',
      },
    })
  })

  it('should call router.push when the enter key is pressed file name is users...', () => {
    mockRouter = {
      push: jest.fn(),
      pathname: '/users',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    const { getByLabelText } = render(
      <RecoilRoot>
        <Search />
      </RecoilRoot>,
    )

    const inputElement = getByLabelText('search') as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: 'test keyword' } })
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/search',
      query: {
        target: 'users',
        keyword: 'test keyword',
      },
    })
  })

  it('should call router.push when the enter key is pressed file name is other...', () => {
    mockRouter = {
      push: jest.fn(),
      pathname: '/test',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    const { getByLabelText } = render(
      <RecoilRoot>
        <Search />
      </RecoilRoot>,
    )

    const inputElement = getByLabelText('search') as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: 'test keyword' } })
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/search',
      query: {
        target: 'works',
        keyword: 'test keyword',
      },
    })
  })

  it('should call router.push when the enter key is pressed file name is search..., tab is works', () => {
    mockRouter = {
      push: jest.fn(),
      pathname: '/search',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    const currentTab = 'works'
    const { getByLabelText } = render(
      <RecoilRoot initializeState={(snap) => snap.set(currentTabState, currentTab)}>
        <Search />
      </RecoilRoot>,
    )

    const inputElement = getByLabelText('search') as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: 'test keyword' } })
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/search',
      query: {
        target: currentTab,
        keyword: 'test keyword',
      },
    })
  })

  it('should call router.push when the enter key is pressed file name is search..., tab is users', () => {
    mockRouter = {
      push: jest.fn(),
      pathname: '/search',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    const currentTab = 'users'
    const { getByLabelText } = render(
      <RecoilRoot initializeState={(snap) => snap.set(currentTabState, currentTab)}>
        <Search />
      </RecoilRoot>,
    )

    const inputElement = getByLabelText('search') as HTMLInputElement

    fireEvent.change(inputElement, { target: { value: 'test keyword' } })
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' })

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/search',
      query: {
        target: currentTab,
        keyword: 'test keyword',
      },
    })
  })
})
