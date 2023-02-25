import { Session } from 'next-auth'
import { WorkFormI } from '~/models/Work'
import { CreateWorkInput } from '~/models/types'

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

export const resultCreateWork = async (session: Session, work: WorkFormI, createWork: any): Promise<void> => {
  await createWorkDB(session, work, createWork)
  return
}
