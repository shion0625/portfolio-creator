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

export function UpdateWork() {
  const [UpdateWork] = useMutation<UpdateWorkMutation>(UpdateWorkDocument)
  return UpdateWork
}

export function DeleteWorks() {
  const [DeleteWorks] = useMutation<DeleteWorksMutation>(DeleteWorksDocument)
  return DeleteWorks
}

export function CreateWork(id?: string | string[]) {
  const [CreateWork] = useMutation<CreateWorkMutation>(CreateWorkDocument, {
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
  return CreateWork
}
