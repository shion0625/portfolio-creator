import React from 'react'
import type { NextPage } from 'next'
import { WorkForms } from '../components/WorkForms'

type Props = {
  users: string
}

const myPageEdit: NextPage<Props> = ({ users }) => {
  return (
    <>
      <WorkForms />
    </>
  )
}

export default myPageEdit
