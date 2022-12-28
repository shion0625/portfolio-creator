import { Session } from 'next-auth'
import { WorkFormI } from '~/models/WorkForm'
import { CreateWorkInput, UpdateWorkInput, User } from '~/models/types'

export function CreateWorkService(session: Session, work: WorkFormI, createWork: any): boolean {
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
  return true
}

export function UpdateWorkService(session: Session, work: WorkFormI, updateWork: any): boolean {
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
  return true
}

export function DeleteWorksService(session: Session, id: string[], deleteWorks: any) {
  if (!session.user) {
    return false
  }
  id = id.filter(function (workId: string) {
    return workId != ''
  })
  deleteWorks({
    variables: { id: id },
  })
}
