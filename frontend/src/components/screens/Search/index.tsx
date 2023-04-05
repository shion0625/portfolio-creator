import { useOnEnterKey } from './hooks'
import { useRouter } from 'next/router'
import React, { useRef, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import SearchArea from '~/components/parts/SearchArea'
import { currentTabState } from '~/stores/CurrentTab'

const Search: React.FC = () => {
  const router = useRouter()
  const currentPathName = router.pathname
  const [currentTab] = useRecoilState(currentTabState) // Recoil状態を使用する
  const searchElement = useRef<HTMLInputElement>(null) //searchAreaの入力DOM要素を取得

  const { onEnterKey, startComposition, endComposition } = useOnEnterKey(() => onSearchClick())

    const checkPath = useCallback((pathName: string): string => {
    const firstPath = pathName.split('/')[1]
    switch (firstPath) {
      case 'users':
        return 'users'
      case 'works':
        return 'works'
      case 'search':
        return currentTab
      default:
        return 'works'
    }
    }, [currentTab])

  const onSearchClick = useCallback((): void => {
    if (searchElement.current != null) {
      router.push({
        pathname: '/search',
        query: {
          target: checkPath(currentPathName),
          keyword: searchElement.current.value,
        },
      })
    }
  }, [checkPath, currentPathName, router])

  return (
  <SearchArea
    inputElement={searchElement}
    onEnterKey={onEnterKey}
    startComposition={startComposition}
    endComposition={endComposition}
  />
  )
}

export default Search
