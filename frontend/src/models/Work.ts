import { Work, PaginationInfo, CreateWorkInput } from '~/models/types'
import { Weaken } from '~/utils/extendType'

export interface WorkFormData extends CreateWorkInput {
  id: string
  urls?: string[]
  languages?: string[]
}

export type WorkFormInput = {
  works?: WorkFormData[]
}

export type DirtyWork = {
  id?: boolean
  title?: boolean
  urls?: boolean[]
  summary?: boolean
  duration?: boolean
  number_of_people?: boolean
  languages?: boolean[]
  role?: boolean
  brief_story?: boolean
  image_url?: boolean
  user_id?: boolean
}

export const addNewWorkFormData = {
  id: '',
  title: '',
  urls: [''],
  summary: '',
  duration: '',
  number_of_people: 1,
  languages: [''],
  role: '',
  brief_story: '',
  image_url: '',
  user_id: '',
}

export const resetNewWorkFormInput = {
  works: [
    {
      id: '',
      title: '',
      urls: [''],
      summary: '',
      duration: '',
      number_of_people: 1,
      languages: [''],
      role: '',
      brief_story: '',
      image_url: '',
      user_id: '',
    },
  ],
}

export type Works = PaginationInfo & {
  contents: Work[]
}
