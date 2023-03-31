import { useMutation } from '@apollo/client'
import { Session } from 'next-auth'
import { WorkFormData } from '~/models/Work'
import { UpdateWorkMutation, UpdateWorkDocument } from '~/models/client'
import { UpdateWorkInput } from '~/models/types'

type useUpdateWorkProps = {
  onCompleted?: (data: UpdateWorkMutation) => void
  onError?: (error: any) => void
}

export const updateWorkInputDTO = (session: Session, work: WorkFormData) => {
  if (!session.user) {
    return
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
  return updateWorkInput
}

export const useUpdateWork = ({ onCompleted, onError }: useUpdateWorkProps = {}) => {
  const [updateWork, { loading, error }] = useMutation<UpdateWorkMutation>(UpdateWorkDocument, {
    onCompleted,
    onError,
  })

  const handleUpdateWork = async (session: Session, work: WorkFormData) => {
    const updateWorkDTO = updateWorkInputDTO(session, work)
    if (updateWorkDTO) {
      await updateWork({ variables: { input: updateWorkDTO } })
    }
  }

  return { updateWork: handleUpdateWork, loading, error }
}
