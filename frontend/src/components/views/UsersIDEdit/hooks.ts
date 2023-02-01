import { Session } from 'next-auth'
import { WorkFormI } from '~/models/WorkForm'
import { CreateWorkInput, UpdateWorkInput, User } from '~/models/types'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  GetUserAuthQuery,
  GetUserAuthDocument,
} from '~/models/client'


export const useForceUpdate = () => {
  const [count, setCount] = useState(0);
  return () => setCount(e => count + 1);
}

const createWorkDB = (session: Session, work: WorkFormI, createWork: any): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!session.user) {
      return false
    }
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
    createWork({
      variables: { input: createWorkInput },
    })
    resolve()
  })

const updateWorkDB = (session: Session, work: WorkFormI, updateWork: any): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!session.user) {
      return false
    }
    if (work.languages != undefined) {
      work.language = JSON.stringify(work.languages)
    }
    if (work.urls != undefined) {
      work.url = JSON.stringify(work.urls)
    }

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
    updateWork({ variables: { input: updateWorkInput } })
    resolve()
  })

const deleteWorksDB = (session: Session, ids: string[], deleteWorks: any): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!session.user) {
      return false
    }
    ids = ids.filter(Boolean)

    deleteWorks({
      variables: { id: ids },
    })
    resolve()
  })

export const resultCreateWork = async (session: Session, work: WorkFormI, createWork: any): Promise<void> => {
  await createWorkDB(session, work, createWork)
  return
}

export const resultUpdateWork = async (session: Session, work: WorkFormI, updateWork: any): Promise<void> => {
  await updateWorkDB(session, work, updateWork)
  return
}

export const resultDeleteWork = async (session: Session, ids: string[], deleteWorks: any): Promise<void> => {
  await deleteWorksDB(session, ids, deleteWorks)
  return
}

export function GetUserAuth(id?: string | string[]) {
  const { data, loading, error } = useQuery<GetUserAuthQuery>(GetUserAuthDocument, {
    variables: { id: id },
  })

  console.log('auth')
  return data?.userAuth
}
