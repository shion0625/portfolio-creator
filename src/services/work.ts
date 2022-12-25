import { WorkFormI } from '~/models/WorkForm'
import { CreateWorkInput, UpdateWorkInput, User } from '~/models/types'

export function UpdateWorkService(session: any, work: WorkFormI, UpdateWork: any): boolean {

  if (!session || !session.user) { return false }
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
  UpdateWork({ variables: { input: updateWorkInput } })
  return true
}

export function CreateWorkService(session: any, work: WorkFormI, CreateWork: any): boolean {

  if (!session || !session.user) { return false }
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
  CreateWork({
    variables: { input: createWorkInput },
  })
  return true
}
