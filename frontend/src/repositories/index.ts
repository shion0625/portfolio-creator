import { getUser } from './User/getUser'
import { getUserIds } from './User/getUserIds'
import { getUsersName } from './User/getUsersName'

export const userRepository = {
  getUser,
  getUserIds,
  getUsersName,
}

export * from './server'
