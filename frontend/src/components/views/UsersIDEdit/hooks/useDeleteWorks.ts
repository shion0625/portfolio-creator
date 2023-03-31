import { useMutation } from '@apollo/client'
import { Session } from 'next-auth'
import { DeleteWorksMutation, DeleteWorksDocument } from '~/models/client'

type useDeleteWorksProps = {
  onCompleted?: (data: DeleteWorksMutation) => void
  onError?: (error: Error) => void
}

const getValidWorkIds = (ids: string[]) => ids.filter(Boolean)

export const useDeleteWorks = ({ onCompleted, onError }: useDeleteWorksProps = {}) => {
  const [deleteWorks, { loading, error }] = useMutation<DeleteWorksMutation>(DeleteWorksDocument, {
    onCompleted,
    onError,
  })

  const handleDeleteWorks = async (session: Session, workIds: string[]) => {
const validWorkIds = getValidWorkIds(workIds)
    if (!session.user || !validWorkIds.length) {
      return
    }
    await deleteWorks({ variables: { id: validWorkIds } })
  }

  return { deleteWorks: handleDeleteWorks, loading, error }
}
