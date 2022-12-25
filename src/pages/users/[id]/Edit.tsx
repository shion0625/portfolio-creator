import { useMutation } from '@apollo/client'
import Box from '@mui/material/Box'
import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useSession } from 'next-auth/react'
import React from 'react'
import PrimarySearchAppBar from '~/components/NavBar'
import { WorkForms } from '~/components/WorkForms'
import { WorkFormInterface } from '~/models/WorkForm'
import { CreateWorkMutation, UpdateWorkMutation, CreateWorkDocument, UpdateWorkDocument } from '~/models/client'
import { GetUser, GetUserIds } from '~/repositories/user'
import { UpdateWorkService, CreateWorkService } from '~/services/work'
import { GetUserQuery } from '~/models/client'

const MyPageEdit: NextPage<GetUserQuery> = ({user}) => {
  const { data: session, status } = useSession()

  const [CreateWork] = useMutation<CreateWorkMutation>(CreateWorkDocument)

  const [UpdateWork] = useMutation<UpdateWorkMutation>(UpdateWorkDocument)

  const OnSubmit = (input: WorkFormInterface) => {
    input.works?.map((work) => {
      //データの更新
      if (work.id) {
        UpdateWorkService(session, work, UpdateWork)
      }
      //新規作成
      if (!work.id) {
        CreateWorkService(session, work, CreateWork)
      }
    })
  }
  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <WorkForms onSubmit={OnSubmit} user={user} />
      </Box>
    </>
  )
}

export default MyPageEdit

export const getStaticPaths: GetStaticPaths = async () => {
  const { users } = await GetUserIds(10,0)
  const paths = users.nodes.map((user: {id: string}) => ({
    params: {
      id: user.id,
    },
  }))
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { user } = await GetUser(params?.id)
  return {
    props: {
      user,
    },
    revalidate: 1,
    notFound: !user,
  }
}
