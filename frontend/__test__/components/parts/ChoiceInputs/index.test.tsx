import { render, screen, fireEvent } from '@testing-library/react';
import { Controller, useForm } from 'react-hook-form';
import ChoiceInputs from '~/components/parts/ChoiceInputs';

describe('ChoiceInputs', () => {

    const renderComponent = (defaultValues?: any) => {
    const Wrapper = ({ children }: any) => {
      const methods = useForm({defaultValues})
      return children(methods)
    }

    return render(
      <Wrapper>
        {(methods: any) => (
          <ChoiceInputs targetName="choices" label="Choices" register={methods.register} control={methods.control} />
        )}
      </Wrapper>,
    )
    }


  it('should add new ChoiceInput on click of add button', () => {
    renderComponent({ choices: ['choice 1'] });

    const addButton = screen.getByRole('button', { name: 'add' });
    fireEvent.click(addButton);

    expect(screen.getAllByRole('textbox')).toHaveLength(2); // 1 ChoiceInput is already there
  });

  it('should remove ChoiceInput on click of remove button', () => {
    renderComponent({ choices: ['choice 1', 'choice 2'] });

    const removeButton = screen.getAllByRole('button', { name: 'delete' })[0];
    fireEvent.click(removeButton);

    expect(screen.getAllByRole('textbox')).toHaveLength(1);
    expect(screen.queryByDisplayValue('choice 1')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('choice 2')).toBeInTheDocument();
  });
});
