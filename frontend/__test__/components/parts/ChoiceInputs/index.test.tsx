import { render, screen, fireEvent } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import ChoiceInputs from '~/components/parts/ChoiceInputs'

describe('ChoiceInputs', () => {
  const renderComponent = (defaultValues?: any) => {
    const Wrapper = ({ children }: any) => {
      const methods = useForm({ defaultValues })
      return children(methods)
    }

    return render(
      <Wrapper>
        {(methods: any) => (
          <ChoiceInputs targetName='choices' label='Choices' register={methods.register} control={methods.control} />
        )}
      </Wrapper>,
    )
  }

  it('should add new ChoiceInput on click of add button', () => {
    renderComponent({ choices: ['choice 1'] })

    const addButton = screen.getByRole('button', { name: 'add' })
    fireEvent.click(addButton)

    // テキストボックスの数が2であることを確認
    expect(screen.getAllByRole('textbox')).toHaveLength(2)
  })

  it('should remove ChoiceInput on click of remove button', () => {
    renderComponent({ choices: ['choice 1', 'choice 2'] })

    const removeButton = screen.getAllByRole('button', { name: 'delete' })[0]
    fireEvent.click(removeButton)

    // テキストボックスの数が1であることを確認
    expect(screen.getAllByRole('textbox')).toHaveLength(1)

    // 削除されたchoice 1が存在しないことを確認
    expect(screen.queryByDisplayValue('choice 1')).not.toBeInTheDocument()

    // 残っているchoice 2が存在することを確認
    expect(screen.getByDisplayValue('choice 2')).toBeInTheDocument()
  })
})
