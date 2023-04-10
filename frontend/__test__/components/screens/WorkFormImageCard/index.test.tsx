import { render, screen, fireEvent } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import ImageCard from '~/components/screens/WorkFormImageCard'
import { WorkFormInput } from '~/models/Work'

jest.mock('~/components/screens/WorkFormItem', () => ({
  __esModule: true,
  default: () => <div>Mock WorkFormItem</div>,
}))

jest.mock('~/components/parts/Modal', () => ({
  __esModule: true,
  default: () => <div>Mock Modal</div>,
}))

describe('ImageCard', () => {
  const Props = {
    workIndex: 0,
    removeWork: jest.fn(),
    getValues: jest.fn().mockReturnValue(0),
  }
  const defaultValues = {
    works: [
      {
        id: '1',
        title: 'works 1',
        summary: 'works',
        user_id: '1',
      },
    ],
  }

  const renderComponent = (defaultValues: WorkFormInput) => {
    const Wrapper = ({ children }: any) => {
      const methods = useForm({ defaultValues })
      return children(methods)
    }
    return render(<Wrapper>{(methods: any) => <ImageCard {...Props} control={methods.control} />}</Wrapper>)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders ImageCard component with correct props', () => {
    const { getByLabelText, getByText } = renderComponent(defaultValues)

    expect(getByText(defaultValues.works[Props.workIndex].title)).toBeInTheDocument()
    expect(getByText(defaultValues.works[Props.workIndex].summary)).toBeInTheDocument()

    expect(screen.getByText('画像の追加')).toBeInTheDocument()

    const deleteButton = getByLabelText('delete')
    fireEvent.click(deleteButton)
    expect(Props.removeWork).toHaveBeenCalledWith(Props.workIndex, Props.getValues(`works.${Props.workIndex}.id`))
  })
})
