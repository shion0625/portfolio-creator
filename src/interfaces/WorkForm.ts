import { Weaken } from '../lib/extendType'
import { CreateWorkInput } from '../graphql/types'

interface GetChangeInput extends Weaken<CreateWorkInput, 'language'> {
  language?: string[]
}

interface GetWorkInput extends Weaken<GetChangeInput, 'url'> {
  url: string[]
}
interface workFormInput extends GetWorkInput {
  id: string
}

export type WorkForm = {
  works: workFormInput[]
}

export const addNewWork = {
  id: '',
  title: '',
  url: [''],
  summary: '',
  duration: '',
  number_of_people: 1,
  language: [''],
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
      url: [''],
      summary: '',
      duration: '',
      number_of_people: 1,
      language: [''],
      role: '',
      brief_story: '',
      image_url: '',
      user_id: '',
    },
  ],
}
