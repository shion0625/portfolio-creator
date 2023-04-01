import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import ChoiceInput from '~/components/parts/ChoiceInput'

describe('ChoiceInput component', () => {
  const name = 'choice'
  const label = 'Label'
  const placeholder = 'PlaceHolder'
  const mockRegister = jest.fn()
  const mockOnAction = jest.fn()

  const renderComponent = (type = 'text') => {
    const Wrapper = ({ children }: any) => {
      const methods = useForm()
      return children(methods)
    }

    return render(
      <Wrapper>
        {(methods: any) => (
          <ChoiceInput
            name={name}
            label={label}
            placeholder={placeholder}
            register={mockRegister}
            onAction={mockOnAction}
            type={type}
          />
        )}
      </Wrapper>,
    )
  }

  it('should render a label and text input field with delete button', () => {
    renderComponent()
    expect(screen.getByLabelText(label)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument()
  })

  it('should call register with the correct name', () => {
    const { getByLabelText } = renderComponent();
    const input = getByLabelText(label);
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockRegister).toBeCalledWith(name);
  })

  it('should call onAction when delete button is clicked', () => {
    renderComponent()
    fireEvent.click(screen.getByLabelText('delete'))
    expect(mockOnAction).toBeCalledTimes(1)
  })

  it('should update input value on user typing', async() => {
    renderComponent()
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'New Choice')
    expect(input).toHaveValue('New Choice')
  })

  it('should render input with correct type', () => {
    renderComponent('number')
    const input = screen.getByLabelText(label)
    expect(input).toHaveAttribute('type', 'number')
  })

  it('should render input with correct placeholder', () => {
    renderComponent()
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', placeholder)
  })
})
