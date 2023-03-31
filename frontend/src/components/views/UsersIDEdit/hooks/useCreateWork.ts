import { useMutation } from '@apollo/client'
import { Session } from 'next-auth'
import { WorkFormData } from '~/models/Work'
import { CreateWorkMutation, CreateWorkDocument } from '~/models/client'
import { CreateWorkInput } from '~/models/types'

type useCreateWorkProps = {
  onCompleted?: (data: CreateWorkMutation) => void
  onError?: (error: Error) => void
}

const createWorkInputDTO = (session: Session, work: WorkFormData): CreateWorkInput | undefined => {
  if (!session.user) {
    return
  }
  const { id } = session.user
  const { brief_story, duration, image_url, languages, number_of_people, role, summary, title, urls } = work

  return {
    brief_story,
    duration,
    image_url,
    language: languages ? JSON.stringify(languages) : languages,
    number_of_people,
    role,
    summary,
    title,
    url: urls ? JSON.stringify(urls) : urls,
    user_id: id,
  }
}

export const useCreateWork = ({ onCompleted, onError }: useCreateWorkProps = {}) => {
  const [createWork, { loading, error }] = useMutation<CreateWorkMutation>(CreateWorkDocument, {
    onCompleted,
    onError,
  })

  const handleCreateWork = async (session: Session, work: WorkFormData) => {
    const createWorkDTO = createWorkInputDTO(session, work)
    if (createWorkDTO) {
      await createWork({ variables: { input: createWorkDTO } })
    }
  }

  return { createWork: handleCreateWork, loading, error }
}
