import { useMutation } from '@apollo/client'
import { UpdateWorkMutation, UpdateWorkDocument } from '~/models/client'

// update work mutation
export const useUpdateWork = () => {
  const [UpdateWork, { loading, error }] = useMutation<UpdateWorkMutation>(UpdateWorkDocument)

  return [UpdateWork, loading, error]
}
