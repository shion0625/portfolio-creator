import React from 'react'
import type { NextPage } from 'next'
import { GetStaticProps, GetStaticPaths } from 'next'
import { GraphQLClient } from 'graphql-request'
import { assertIsDefined } from '../../../lib/assert'
import { getSdk } from '../../../graphql/ssr.generated'
import { WorkForms } from '../../../components/WorkForms'
import { WorkForm } from '../../../interfaces/WorkForm'
import { useMutation } from '@apollo/client'
import { CreateWorkDocument } from '../../../graphql/client'
import { CreateWorkMutation } from '../../../graphql/client'
import { CreateWorkInput } from '../../../graphql/types'
import Box from '@mui/material/Box'
import PrimarySearchAppBar from '../../../components/NavBar'
import { useSession } from 'next-auth/react'
import { User } from '../../../graphql/types'

type Props = {
  user: string
}

const MyPageEdit: NextPage<Props> = ({ user }) => {
  const { data: session, status } = useSession()
  const [CreateWork, { data, loading, error }] =
    useMutation<CreateWorkMutation>(CreateWorkDocument)

  const OnSubmit = (input: WorkForm) => {
    input.works.map((work) => {
      let language, url
      if (work.language != undefined) {
        language = JSON.stringify(work.language)
      }
      if (work.url != undefined) {
        url = JSON.stringify(work.url)
      }

      if (work.id != null && session && session.user) {
        console.log("create")
        console.log(session.user.id)
        let createWorkInput: CreateWorkInput = {
          brief_story: work.brief_story,
          duration: work.duration,
          image_url: work.image_url,
          language: language,
          number_of_people: work.number_of_people,
          role: work.role,
          summary: work.summary,
          title: work.title,
          url: url,
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
        <WorkForms onSubmit={OnSubmit} userInfo={ user } />
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

// export const getStaticProps: GetStaticProps = async () => {
//   const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
//   assertIsDefined(apiBaseUrl)

//   const client = new GraphQLClient(apiBaseUrl)
//   const sdk = getSdk(client)
//   const { user } = await sdk.GetUser({ id: session?.user?.id })
//   return {
//     props: { user: user },
//     revalidate: 1,
//   }
// }
