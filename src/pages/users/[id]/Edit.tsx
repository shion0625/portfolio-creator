import React from 'react'
import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { GraphQLClient } from 'graphql-request'
import { assertIsDefined } from '../../../lib/assert'
import { getSdk } from '../../../graphql/ssr.generated'
import { WorkForms } from '../../../components/WorkForms'
import { WorkFormInterface } from '../../../interfaces/WorkForm'
import { useMutation } from '@apollo/client'
import { CreateWorkDocument, GetUserQuery, UpdateWorkDocument } from '../../../graphql/client'
import { CreateWorkMutation, UpdateWorkMutation } from '../../../graphql/client'
import { CreateWorkInput, UpdateWorkInput } from '../../../graphql/types'
import Box from '@mui/material/Box'
import PrimarySearchAppBar from '../../../components/NavBar'
import { useSession } from 'next-auth/react'
import { User } from '../../../graphql/types'

const MyPageEdit: NextPage<GetUserQuery> = ({ user }) => {
  const { data: session, status } = useSession()

  const [CreateWork] = useMutation<CreateWorkMutation>(CreateWorkDocument)

  const [UpdateWork] = useMutation<UpdateWorkMutation>(UpdateWorkDocument)

  const OnSubmit = (input: WorkFormInterface) => {
    input.works?.map((work) => {
      if (session && session.user) {
        if (work.languages != undefined) {
          work.language = JSON.stringify(work.languages)
        }
        if (work.urls != undefined) {
          work.url = JSON.stringify(work.urls)
        }
        //データの更新
        if (work.id) {
          let updateWorkInput: UpdateWorkInput = {
            id: work.id,
            brief_story: work.brief_story,
            duration: work.duration,
            image_url: work.image_url,
            language: work.language,
            number_of_people: work.number_of_people,
            role: work.role,
            summary: work.summary,
            title: work.title,
            url: work.url,
          }
          console.log('update')
          UpdateWork({ variables: { input: updateWorkInput } })
        }
        //新規作成
        if (!work.id) {
          let createWorkInput: CreateWorkInput = {
            brief_story: work.brief_story,
            duration: work.duration,
            image_url: work.image_url,
            language: work.language,
            number_of_people: work.number_of_people,
            role: work.role,
            summary: work.summary,
            title: work.title,
            url: work.url,
            user_id: session.user.id,
          }
          console.log('create')
          CreateWork({
            variables: { input: createWorkInput }
          })
        }
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
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  assertIsDefined(apiBaseUrl)
  const client = new GraphQLClient(apiBaseUrl)
  const sdk = getSdk(client)
  const { users } = await sdk.GetUserIds({ limit: 10, offset: 0 })

  const paths = users.nodes.map((user: User) => ({
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
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  assertIsDefined(apiBaseUrl)

  const client = new GraphQLClient(apiBaseUrl)
  const sdk = getSdk(client)
  const { user } = await sdk.GetUser({ id: params?.id })

  return {
    props: {
      user: user,
    },
    revalidate: 1,
    notFound: !user,
  }
}
