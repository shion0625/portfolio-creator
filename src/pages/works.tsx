import React from 'react'
import { UserPagination, User } from '~/models/types'
import { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { GetWorksServer } from '~/repositories/work'

type Props = {
  works: UserPagination
}

const Works: NextPage<Props> = ({ works }) => {
  const { data: session, status } = useSession()
  console.log(works)
  return (
    <>
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
