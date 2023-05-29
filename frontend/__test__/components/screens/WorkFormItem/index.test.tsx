import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import WorkFormItem from '~/components/screens/WorkFormItem'
import { WorkFormInput } from '~/models/Work'
import { WorkFormContext } from '~/stores/workForm'

jest.mock('~/components/parts/ChoiceInputs', () => ({
  __esModule: true,
  default: () => <div>Mock ChoiceInputs</div>,
}))

describe('WorkFormItem', () => {
  const defaultValues: WorkFormInput = {
    works: [
      {
        id: '1',
        title: '私の名前は',
        user_id: 'user1',
      },
    ],
  }

  const renderComponent = (defaultValues: WorkFormInput) => {
    const Wrapper = ({ children }: any) => {
      const methods = useForm({ defaultValues, mode: 'onBlur' })
      return children(methods)
    }
    return render(
      <Wrapper>
        {(methods: any) => {
          const mockContext = {
            register: methods.register,
            control: methods.control,
            errors: methods.formState.errors,
            workIndex: 0,
          }
          return (
            <WorkFormContext.Provider value={mockContext}>
              <WorkFormItem />
            </WorkFormContext.Provider>
          )
        }}
      </Wrapper>,
    )
  }

  it('should render all fields and error messages', () => {
    const { getByLabelText, queryByLabelText, getByText } = renderComponent(defaultValues)

    expect(getByLabelText('タイトル')).toBeInTheDocument()
    expect(getByLabelText('概要')).toBeInTheDocument()
    expect(getByLabelText('開発期間')).toBeInTheDocument()
    expect(getByLabelText('開発人数')).toBeInTheDocument()
    //ChoiceInputsはモック化（複数の入力があるもの）
    expect(queryByLabelText('開発言語・技術')).not.toBeInTheDocument()
    expect(getByLabelText('役割')).toBeInTheDocument()
    //ChoiceInputsはモック化（複数の入力があるもの）
    expect(queryByLabelText('URL')).not.toBeInTheDocument()
    expect(getByLabelText('小話')).toBeInTheDocument()
    expect(getByLabelText('画像')).toBeInTheDocument()
  })

  it('should not display error message when input is valid', () => {
    const { queryByText, getByLabelText } = renderComponent(defaultValues)

    const titleInput = getByLabelText('タイトル')
    fireEvent.change(titleInput, { target: { value: 'Valid Title' } })
    fireEvent.blur(titleInput) // フォームからフォーカスを外す

    waitFor(() => {
      expect(queryByText('⚠ タイトルを入力してください')).toBeNull()
    })

    const numberOfPeopleInput = getByLabelText('開発人数')
    fireEvent.change(numberOfPeopleInput, { target: { value: 10 } })
    fireEvent.blur(numberOfPeopleInput) // フォームからフォーカスを外す
    waitFor(() => {
      expect(queryByText('⚠ 1人以上100人以下で入力してください')).toBeNull()
    })
  })

  it('should display error message when input is invalid', () => {
    const { getByText, queryByText, getByLabelText } = renderComponent(defaultValues)

    const titleInput = getByLabelText('タイトル')
    expect(queryByText('⚠ タイトルを入力してください')).toBeNull()

    fireEvent.change(titleInput, { target: { value: '' } })
    fireEvent.blur(titleInput)
    waitFor(() => {
      expect(getByText('⚠ タイトルを入力してください')).toBeInTheDocument()
    })

    const numberOfPeopleInput = getByLabelText('開発人数')
    expect(queryByText('⚠ 1人以上100人以下で入力してください')).toBeNull()

    fireEvent.change(numberOfPeopleInput, { target: { value: 10000 } })
    fireEvent.blur(numberOfPeopleInput)
    waitFor(() => {
      expect(getByText('⚠ 1人以上100人以下で入力してください')).toBeInTheDocument()
    })
  })
})
