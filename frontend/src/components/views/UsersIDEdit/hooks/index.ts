import { Session } from 'next-auth'
import { WorkFormI } from '~/models/Work'
import { resultCreateWork } from './createWorkDB'
import { resultUpdateWork } from './updateWorkDB'
import { resultDeleteWork } from './deleteWorksDB'

type Database = {
  createWork:  (session: Session, work: WorkFormI, createWork: any) => Promise<void>,
  updateWork: (session: Session, work: WorkFormI, updateWork: any) => Promise<void>,
  deleteWork: (session: Session, ids: string[], deleteWorks: any) => Promise<void>,
}

const databases = {}
export const database: Database = Object.assign(databases,
  {
    createWork: resultCreateWork,
    updateWork: resultUpdateWork,
    deleteWork: resultDeleteWork,
  }
)
export * from './useCreateWork'
export * from './useUpdateWork'
export * from './useDeleteWorks'
export * from './useForceUpdate'
export * from './useGetUserWork'
