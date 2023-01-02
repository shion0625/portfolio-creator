import React from 'react'
import { WorkPagination } from '~/models/types'
import { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { GetWorksServer } from '~/repositories/work'
import { WorkList } from '~/components/WorkList'
import PrimarySearchAppBar from '~/components/NavBar'
import { Box } from '@mui/material'

type Props = {
  works: WorkPagination
}

const Works: NextPage<Props> = ({ works }) => {
  const { data: session, status } = useSession()
  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <WorkList works={works} />
      </Box>
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
