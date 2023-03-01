import { useSearch } from '../hook'
import { Pagination } from '@mui/material'
import React, { memo } from 'react'
import { UserList } from '~/components/templates/UserList'
import { Model } from '~/models/types'

type Props = {
  keyword: string
  limit: number
  page: number
  setPage: (page: number) => void
}

export const UserPagination: React.FC<Props> = memo(({ keyword, limit, page, setPage }): JSX.Element => {
  const { search } = useSearch(Model.User, keyword, limit, '2023-02-23 02:30:46.510146', 9999)

  if (!search) return <div>loading</div>
  return (
    <>
      <UserList users={search.nodes} />
      <Pagination
        size='large'
        count={10} //総ページ数
        color='primary' //ページネーションの色
        onChange={(e, page) => setPage(page)} //変更されたときに走る関数。第2引数にページ番号が入る
        page={page} //現在のページ番号
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
    </>
  )
})
