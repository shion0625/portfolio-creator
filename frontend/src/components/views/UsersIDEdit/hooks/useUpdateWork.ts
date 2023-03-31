import { useMutation } from '@apollo/client'
import { Session } from 'next-auth'
import { WorkFormData } from '~/models/Work'
import { UpdateWorkMutation, UpdateWorkDocument } from '~/models/client'
import { UpdateWorkInput } from '~/models/types'

type useUpdateWorkProps = {
  onCompleted?: (data: UpdateWorkMutation) => void
  onError?: (error: Error) => void
}

export const updateWorkInputDTO = (session: Session, work: WorkFormData): UpdateWorkInput | undefined => {
  if (!session.user) {
    return
  }
  const { id, brief_story, duration, image_url, languages, number_of_people, role, summary, title, urls } = work

  return {
    id,
    brief_story,
    duration,
    image_url,
    language: languages ? JSON.stringify(languages) : languages,
    number_of_people,
    role,
    summary,
    title,
    url: urls ? JSON.stringify(urls) : urls,
  }
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
