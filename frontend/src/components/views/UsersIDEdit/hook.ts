import { Session } from 'next-auth'
import { WorkFormI } from '~/models/WorkForm'
import { CreateWorkInput, UpdateWorkInput, User } from '~/models/types'
import { createWorkDB, updateWorkDB, deleteWorksDB } from '~/services/work'

export const resultCreateWork = async (session: Session, work: WorkFormI, createWork: any): Promise<void> => {
  await createWorkDB(session, work, createWork)
  return
}

export const resultUpdateWork = async (session: Session, work: WorkFormI, updateWork: any): Promise<void> => {
  await updateWorkDB(session, work, updateWork)
  return
}

export const resultDeleteWork = async (session: Session, ids: string[], deleteWorks: any): Promise<void> => {
  await deleteWorksDB(session, ids, deleteWorks)
  return
}
