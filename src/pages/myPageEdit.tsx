import React from 'react'
import type { NextPage } from 'next'
import { WorkForm } from '../components/WorkForm'

type Props = {
  users: string
}

const myPageEdit: NextPage<Props> = ({ users }) => {
  return (
    <>
      <WorkForm />
    </>
  )
}

export default myPageEdit
