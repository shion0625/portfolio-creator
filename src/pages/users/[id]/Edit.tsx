import React from 'react'
import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { GraphQLClient } from 'graphql-request'
import { assertIsDefined } from '../../../lib/assert'
import { getSdk } from '../../../graphql/ssr.generated'
import { WorkForms } from '../../../components/WorkForms'
import { WorkFormInterface } from '../../../interfaces/WorkForm'
import { useMutation } from '@apollo/client'
import { CreateWorkDocument, GetUserQuery } from '../../../graphql/client'
import { CreateWorkMutation } from '../../../graphql/client'
import { CreateWorkInput } from '../../../graphql/types'
import Box from '@mui/material/Box'
import PrimarySearchAppBar from '../../../components/NavBar'
import { useSession } from 'next-auth/react'
import { User } from '../../../graphql/types'

const MyPageEdit: NextPage<GetUserQuery> = ({ user }) => {
  const { data: session, status } = useSession()
  const [CreateWork, { data, loading, error }] =
    useMutation<CreateWorkMutation>(CreateWorkDocument)
  const OnSubmit = (input: WorkFormInterface) => {
    input.works?.map((work) => {
      if (work.id != null && session && session.user) {
        if (work.languages != undefined) {
          work.language = JSON.stringify(work.languages)
        }
        if (work.urls != undefined) {
          work.url = JSON.stringify(work.urls)
        }
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
        CreateWork({ variables: { input: createWorkInput } })
        console.log(work)
        console.log(data)
        console.log(error)
        console.log(loading)
      }
    })
  }
  return (
    <>
      <PrimarySearchAppBar />
      <Box component='main' sx={{ m: 2 }}>
        <WorkForms onSubmit={OnSubmit} user={ user } />
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
  const { users } = await sdk.GetUserIds({ limit: 100, offset: 0 })

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
