import { createContext } from 'react'
// 利用したい React Hook Form のフックをimport
import { Control, UseFormRegister } from 'react-hook-form'
import { WorkFormInterface } from '~/models/Work'

type TWorkFormContext = {
  register: UseFormRegister<WorkFormInterface>
  control: Control<WorkFormInterface>
  workIndex: number
  errors: any
}

export const WorkFormContext = createContext({} as TWorkFormContext)
