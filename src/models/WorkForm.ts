import { CreateWorkInput } from '~/models/types'
import { Weaken } from '~/utils/extendType'

export interface WorkFormI extends CreateWorkInput {
  id: string
  urls?: string[]
  languages?: string[]
}

export type WorkFormInterface = {
  works?: WorkFormI[]
}

export type DirtyWork = {
  id?: boolean,
  title?: boolean,
  urls?: boolean[],
  summary?: boolean,
  duration?: boolean,
  number_of_people?: boolean,
  languages?: boolean[],
  role?: boolean,
  brief_story?: boolean,
  image_url?: boolean,
  user_id?: boolean,
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
