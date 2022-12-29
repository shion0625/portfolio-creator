import React from 'react'
import { WorkPagination } from '~/models/types'
import { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { GetWorksServer } from '~/repositories/work'
import { WorkList } from '~/components/WorkList'

type Props = {
  works: WorkPagination
}

const Works: NextPage<Props> = ({ works }) => {
  const { data: session, status } = useSession()
  return (
    <>
      <WorkList works={works} />
    </>
  )
}

export default Works

export const getStaticProps: GetStaticProps = async () => {
  const { works } = await GetWorksServer()
  return {
    props: { works: works },
    revalidate: 1,
  }
}
