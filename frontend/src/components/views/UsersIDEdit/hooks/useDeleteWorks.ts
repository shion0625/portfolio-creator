import { useMutation } from '@apollo/client'
import { Session } from 'next-auth'
import { DeleteWorksMutation, DeleteWorksDocument } from '~/models/client'

type useDeleteWorksProps = {
  onCompleted?: (data: DeleteWorksMutation) => void
  onError?: (error: any) => void
}

const deleteWorkInputDTO = (session: Session, ids: string[]) => {
  if (!session.user) {
    return
  }
  ids = ids.filter(Boolean)
  return ids
}

export const useDeleteWorks = ({ onCompleted, onError }: useDeleteWorksProps = {}) => {
  const [deleteWorks, { loading, error }] = useMutation<DeleteWorksMutation>(DeleteWorksDocument, {
    onCompleted,
    onError,
  })

  const handleDeleteWorks = async (session: Session, workIds: string[]) => {
    const deleteWorkDTO = deleteWorkInputDTO(session, workIds)
    await deleteWorks({ variables: { id: deleteWorkDTO } })
  }

  return { deleteWorks: handleDeleteWorks, loading, error }
}
