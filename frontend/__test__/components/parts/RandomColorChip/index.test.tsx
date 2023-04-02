import { render, screen } from '@testing-library/react';
import RandomColorChip from '~/components/parts/RandomColorChip';

describe('RandomColorChip', () => {
  test('renders label correctly', () => {
    const content = 'Test Content';
    render(<RandomColorChip content={content} />);
    const labelElement = screen.getByText(content);
    expect(labelElement).toBeInTheDocument();
  });
});
