import { screen, fireEvent, render } from '@helpers/test-utils';
import BackButton from '../BackButton';

describe('BackButton component', () => {
  it('renders BackButton component', () => {
    render(<BackButton />, '');

    expect(screen.getByLabelText('goBack')).toBeInTheDocument;
  });

  it('should fire Event when button is clicked', () => {
    render(<BackButton />, '');

    const button = screen.getByLabelText('goBack');

    fireEvent.click(button);

    expect(window.location.pathname).toBe('/');
  });
});
