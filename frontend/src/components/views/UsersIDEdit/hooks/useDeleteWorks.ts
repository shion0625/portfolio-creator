import { useMutation } from '@apollo/client'
import {
  DeleteWorksMutation,
  DeleteWorksDocument,
} from '~/models/client'

// delete work mutation
export function useDeleteWorks() {
  const [DeleteWorks, { loading, error }] = useMutation<DeleteWorksMutation>(DeleteWorksDocument)
  return [DeleteWorks, loading, error]
}
