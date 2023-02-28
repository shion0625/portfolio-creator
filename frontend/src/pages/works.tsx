import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React from 'react'
import WorksView from '~/components/views/Works'

const Works: NextPage = () => {
  const { data: session, status } = useSession()
  return <WorksView />
}

export default Works
