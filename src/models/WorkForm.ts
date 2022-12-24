import { Weaken } from 'src/libs/extendType'
import { CreateWorkInput } from '~/models/types'

export interface WorkFormI extends CreateWorkInput {
  id: string
  urls?: string[]
  languages?: string[]
}

export type WorkFormInterface = {
  works?: WorkFormI[]
}

export const addNewWork = {
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

export const resetNewWorks = {
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
