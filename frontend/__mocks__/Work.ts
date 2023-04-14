import { createFakeUser, createFakePageInfo } from './'
import { faker } from '@faker-js/faker'
import { Work, WorkPagination, Model } from '~/models/types'

export const createFakeWork = (): Work => {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.words(10),
    summary: faker.lorem.sentence(),
    image_url: faker.image.imageUrl(),
    duration: 'PT30M',
    number_of_people: faker.datatype.number(),
    language: JSON.stringify(Array.from({ length: 3 }, () => faker.lorem.words())),
    role: faker.name.jobTitle(),
    url: JSON.stringify(Array.from({ length: 3 }, () => faker.internet.url())),
    brief_story: faker.lorem.paragraph(),
    created_at: faker.date.recent().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    serial_number: faker.datatype.number(),
    is_delete: faker.datatype.boolean(),
    user: createFakeUser(),
  }
}

export const createFakeWorkPagination = (): WorkPagination => {
  return {
    nodes: Array.from({ length: 3 }, () => createFakeWork()),
    pageInfo: createFakePageInfo(),
    type: Model.Work,
  }
}

export const createFakeWorkPaginationWithoutType = (): Pick<WorkPagination, Exclude<keyof WorkPagination, 'type'>> => {
  return {
    nodes: Array.from({ length: 3 }, () => createFakeWork()),
    pageInfo: createFakePageInfo(),
  }
}
