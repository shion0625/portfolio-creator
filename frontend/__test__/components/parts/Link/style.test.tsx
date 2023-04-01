import { render } from '@testing-library/react';
import { MuiLink } from '~/components/parts/Link/style';
import { alpha } from '@mui/material/styles'

describe('MuiLink', () => {
  it('renders the component', () => {
    const { getByRole } = render(<MuiLink href="#">Link text</MuiLink>);
    const link = getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');
    expect(link).toHaveTextContent('Link text');
    expect(link).toHaveStyle(`
      text-decoration: none;
      cursor: pointer;
    `);
  });
});
