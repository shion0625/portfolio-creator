import { Session } from 'next-auth'
import { WorkFormI } from '~/models/Work'
import { UpdateWorkInput } from '~/models/types'

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

export const resultUpdateWork = async (session: Session, work: WorkFormI, updateWork: any): Promise<void> => {
  await updateWorkDB(session, work, updateWork)
  return
}
