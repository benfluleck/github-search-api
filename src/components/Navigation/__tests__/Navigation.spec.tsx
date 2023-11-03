import { render, screen } from '@helpers/test-utils';

import Navigation from '../Navigation';

const defaultProps = {
  children: <h1>Benny</h1>
};

describe('Navigation component', () => {
  it('renders Navigation component', () => {
    render(<Navigation {...defaultProps} />, '');
    expect(screen.getByTestId('nav-component')).toBeDefined();
  });

  it('renders Navigation Component attributes', () => {
    render(<Navigation {...defaultProps} />, '');

    expect(screen.getByText('Benny')).toBeInTheDocument;
    expect(screen.getByRole('link', { name: 'favourite' })).toHaveAttribute('href', '/favourites');
  });
});
