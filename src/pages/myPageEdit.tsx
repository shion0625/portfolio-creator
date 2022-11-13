import React from 'react'
import type { NextPage } from 'next'
import { WorkForms } from '../components/WorkForms'
import { WorkForm } from '../interfaces/WorkForm'
import { useMutation } from '@apollo/client';
import { CreateWorkDocument } from '../graphql/client'
import { CreateWorkMutation } from '../graphql/client'
import { CreateWorkInput } from '../graphql/types'

type Props = {
  users: string
}

const MyPageEdit: NextPage<Props> = ({ users }) => {
  const [CreateWork, { data, loading, error }] = useMutation<CreateWorkMutation>(CreateWorkDocument)

  const OnSubmit = (input: WorkForm) => {
    input.works.map((work, index) => {
      let language, url
      if (work.language != undefined) {
        language = work.language.join('*&*')
      }
      if (work.url != undefined) {
        url = work.url.join('*&*')
      }

      if (work.id === null || work.id != null) {
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
          user_id: work.user_id
        }
        CreateWork({ variables: { input: createWorkInput } })
        console.log(data)
        console.log(error)
        console.log(loading)
      }
    })


  }
  return (
    <>
      <WorkForms onSubmit={OnSubmit} />
    </>
  )
}

export default MyPageEdit
