import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { useForm } from 'react-hook-form'
import ChoiceInput, { Props as ChoiceInputProps } from '~/components/parts/ChoiceInput'

describe('ChoiceInput component', () => {
  // Define properties to be passed to the ChoiceInput component
  const props: ChoiceInputProps = {
    name: 'choice',
    label: 'Label',
    placeholder: 'PlaceHolder',
    register: jest.fn(),
    onAction: jest.fn(),
  }

  // Define a helper function to render the ChoiceInput component
  const renderComponent = (type?: React.HTMLInputTypeAttribute) => {
    const Wrapper = ({ children }: any) => {
      const methods = useForm()
      return children(methods)
    }

    return render(<Wrapper>{(methods: any) => <ChoiceInput {...props} type={type} />}</Wrapper>)
  }

  it('should render a label and text input field with delete button', () => {
    renderComponent()
    expect(screen.getByLabelText(props.label)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'delete' })).toBeInTheDocument()
  })

  it('should call register with the correct name', () => {
    const { getByLabelText } = renderComponent()
    const input = getByLabelText(props.label)
    fireEvent.change(input, { target: { value: 'test' } })
    expect(props.register).toBeCalledWith(name)
  })

  it('should call onAction when delete button is clicked', () => {
    renderComponent()
    fireEvent.click(screen.getByLabelText('delete'))
    expect(props.onAction).toBeCalledTimes(1)
  })

  it('should update input value on user typing', async () => {
    renderComponent()
    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'New Choice')
    expect(input).toHaveValue('New Choice')
  })

  it('should render input with correct type', () => {
    renderComponent('number')
    const input = screen.getByLabelText(props.label)
    expect(input).toHaveAttribute('type', 'number')
  })

  it('should render input with correct placeholder', () => {
    renderComponent()
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', props.placeholder)
  })
})
