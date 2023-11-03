import { render, screen, fireEvent } from '@helpers/test-utils';

import SearchBox from '../SearchBox';

const defaultProps = {
  searchValue: '',
  handleFormChange: () => {}
};

describe('SearchBox component', () => {
  it('renders SearchCard component', () => {
    render(<SearchBox {...defaultProps} />, '');

    expect(screen.getByTestId('search-input')).toBeDefined();

    expect(screen.getByPlaceholderText('Search for your favourite github users')).toBeDefined();
  });

  it('should change value in the SearchBox component', () => {
    const mockOnChange = jest.fn();

    render(<SearchBox {...defaultProps} handleFormChange={mockOnChange} />, '');

    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, {
      target: {
        value: 'This is a test!'
      }
    });

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(searchInput).toHaveAttribute('value', 'This is a test!');
  });

  it('renders inital value in the SearchBox component', () => {
    render(<SearchBox {...defaultProps} searchValue="Test" />, '');

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toHaveAttribute('value', 'Test');
  });
});
