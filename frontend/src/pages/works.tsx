import { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React from 'react'
import WorksView from '~/components/views/Works'
import { WorkPagination } from '~/models/types'
import { GetWorksServer } from '~/repositories/work'

type Props = {
  works: WorkPagination
}

const Works: NextPage<Props> = ({ works }) => {
  const { data: session, status } = useSession()
  return <WorksView works={works} />
}

export default Works

// export const getStaticProps: GetStaticProps = async () => {
//   const { works } = await GetWorksServer()
//   return {
//     props: { works: works },
//     revalidate: 1,
//   }
// }
