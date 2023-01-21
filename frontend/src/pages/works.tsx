import { Box } from '@mui/material'
import { GetStaticProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import React from 'react'
import NavBar from '~/components/templates/NavBar'
import { WorkList } from '~/components/templates/WorkList'
import { WorkPagination } from '~/models/types'
import { GetWorksServer } from '~/repositories/work'

type Props = {
  works: WorkPagination
}

const Works: NextPage<Props> = ({ works }) => {
  const { data: session, status } = useSession()
  return (
    <>
      <NavBar />
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
