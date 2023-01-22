import { useMutation } from '@apollo/client'
import {
  GetUserQuery,
  CreateWorkMutation,
  UpdateWorkMutation,
  DeleteWorksMutation,
  CreateWorkDocument,
  UpdateWorkDocument,
  DeleteWorksDocument,
  GetUserDocument,
} from '~/models/client'

// update work mutation
export const useUpdateWork = () => {
  const [UpdateWork, { loading, error }] = useMutation<UpdateWorkMutation>(UpdateWorkDocument)

  return [UpdateWork, loading, error]
}

// delete work mutation
export function useDeleteWorks() {
  const [DeleteWorks, { loading, error }] = useMutation<DeleteWorksMutation>(DeleteWorksDocument)
  return [DeleteWorks, loading, error]
}

// create work mutation
export function useCreateWork(id: string) {
  const [CreateWork, {loading, error}] = useMutation<CreateWorkMutation>(CreateWorkDocument, {
    // ミューテーション後に実行される処理
    update(cache, { data }) {
      const newWork = data?.createWork // ミューテーションのレスポンス
      const existingUser = cache.readQuery<GetUserQuery>({
        query: GetUserDocument,
        variables: { id: id },
      })
      if (newWork) {
        let existingUserCopy = Object.assign({}, JSON.parse(JSON.stringify(existingUser)))
        existingUserCopy?.user?.works?.nodes.push(newWork)
        // FETCH_ALL_TASKSのキャッシュに新規タスクを追加
        cache.writeQuery({
          query: GetUserDocument,
          data: existingUserCopy,
        })
      }
    },
  })
  return [CreateWork, loading, error]
}
