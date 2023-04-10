import { render } from '@testing-library/react'
import UserCard from '~/components/parts/UserCard'

const user = {
  id: '1',
  name: 'John Doe',
  serial_number: 1,
  created_at: new Date(Date.now()).toISOString(),
  updated_at: new Date(Date.now()).toISOString(),
}

test('renders user name', () => {
  const { getByText } = render(<UserCard user={user} />)
  const userName = getByText(user.name)
  expect(userName).toBeInTheDocument()
})

test('renders "名無しさん" if user name is null', () => {
  const { getByText } = render(<UserCard user={{ ...user, name: null }} />)
  const userName = getByText('名無しさん')
  expect(userName).toBeInTheDocument()
})

test('renders link with correct href', () => {
  const { getByRole } = render(<UserCard user={user} />)
  const link = getByRole('link')
  expect(link).toHaveAttribute('href', `/users/${user.id}`)
})
