import { createContext } from 'react'
// 利用したい React Hook Form のフックをimport
import { Control, UseFormRegister } from 'react-hook-form'
import { Work } from '~/models/types'

type TWorkContext = {
  work: Work
}

export const WorkContext = createContext({} as TWorkContext)
