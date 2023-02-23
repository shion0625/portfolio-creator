import { Session } from 'next-auth'

const deleteWorksDB = (session: Session, ids: string[], deleteWorks: any): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!session.user) {
      return false
    }
    ids = ids.filter(Boolean)

    deleteWorks({
      variables: { id: ids },
    })
    resolve()
  })

export const resultDeleteWork = async (session: Session, ids: string[], deleteWorks: any): Promise<void> => {
  await deleteWorksDB(session, ids, deleteWorks)
  return
}
