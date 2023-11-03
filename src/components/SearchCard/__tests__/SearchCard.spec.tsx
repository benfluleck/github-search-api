import { render, screen, fireEvent } from '@helpers/test-utils';

import SearchCard from '../SearchCard';

const defaultProps = {
  id: '333',
  avatarUrl: 'https://test-url',
  githubId: 'testId',
  isFavourited: false,
  onClick: () => {}
};

describe('SearchCard component', () => {
  it('renders SearchCard component', () => {
    render(<SearchCard {...defaultProps} />, '');

    expect(screen.getByTestId('search-card-component')).toBeDefined();
  });

  it('renders SearchCard attributes', () => {
    render(<SearchCard {...defaultProps} />, '');

    expect(screen.getByText('testId')).toBeDefined();
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument;
    expect(screen.getByRole('link', { name: 'Search card' })).toBeInTheDocument;
  });

  it('should fire Event when button is clicked', () => {
    const mockOnClick = jest.fn();

    render(<SearchCard {...defaultProps} onClick={mockOnClick} />, '');

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
