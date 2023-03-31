import { createContext } from 'react'
// 利用したい React Hook Form のフックをimport
import { Control, UseFormRegister } from 'react-hook-form'
import { WorkFormInput } from '~/models/Work'

type TWorkFormContext = {
  register: UseFormRegister<WorkFormInput>
  control: Control<WorkFormInput>
  workIndex: number
  errors: any
}

export const WorkFormContext = createContext({} as TWorkFormContext)
