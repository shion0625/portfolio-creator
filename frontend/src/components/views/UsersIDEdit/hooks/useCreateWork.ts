import { useMutation } from '@apollo/client'
import { Session } from 'next-auth'
import { WorkFormData } from '~/models/Work'
import { CreateWorkMutation, CreateWorkDocument } from '~/models/client'
import { CreateWorkInput } from '~/models/types'

type useCreateWorkProps = {
  onCompleted?: (data: CreateWorkMutation) => void
  onError?: (error: any) => void
}

const createWorkInputDTO = (session: Session, work: WorkFormData) => {
  if (!session.user) {
    return
  }
  if (work.languages != undefined) {
    work.language = JSON.stringify(work.languages)
  }
  if (work.urls != undefined) {
    work.url = JSON.stringify(work.urls)
  }

  const createWorkInput: CreateWorkInput = {
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
  return createWorkInput
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
