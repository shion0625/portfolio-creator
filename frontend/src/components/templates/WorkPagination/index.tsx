import React, {useState} from 'react'
import {Pagination} from '@mui/material'
import { WorkList } from '~/components/templates/WorkList'
import { useSearch } from './hook'
import {Model} from '~/models/types'
type Props = {
  keyword: string
  limit: number
}

export const WorkPagination: React.FC<Props> = ({keyword, limit}): JSX.Element => {
  const [page, setPage] = useState<number>(1)
  const {search, isWork} = useSearch(Model.Work, keyword, limit, "2023-02-23 02:30:46.510146", 9999)

  if (!search) return <div>loading</div>
  return (
    <>
      {isWork(search) &&
        <>
        <WorkList works={search.nodes}/>
        <Pagination
          count={10}          //総ページ数
          color="primary"     //ページネーションの色
          onChange={(e, page) =>setPage(page)}  //変更されたときに走る関数。第2引数にページ番号が入る
          page={page}         //現在のページ番号
      />
        </>
      }
    </>
  )
}
