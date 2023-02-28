import React, {useState} from 'react'

import { ModelPagination , WorkPagination as WorkInfo, UserPagination} from '~/models/types'
import {Pagination} from '@mui/material'
import { WorkList } from '~/components/templates/WorkList'
import { useQuery } from '@apollo/client'
import { SearchQuery, SearchDocument } from '~/models/client'

type Props = {
  keyword: string
  limit: number
}

export const WorkPagination: React.FC<Props> = ({keyword, limit}): JSX.Element => {
  const [page, setPage] = useState<number>(1)
  const { data, loading, error } = useQuery<SearchQuery>(SearchDocument, {
    variables: {
      target: "work",
      keyword: keyword,
      limit: limit,
      searched: "2023-02-23 02:30:46.510146",
      num: 9999
    }
  })

function isWork(searchResult: ModelPagination): searchResult is WorkInfo {
  return (searchResult as WorkInfo).type == 'work';
}

  if (!data) return <div>loading</div>
  console.log(isWork(data.search))
  return (
    <>
      {isWork(data.search) &&
        <>
        <WorkList works={data.search.nodes}/>
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
