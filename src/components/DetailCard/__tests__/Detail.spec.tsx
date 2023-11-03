import { render, screen, fireEvent } from '@helpers/test-utils';

import DetailCard from '../DetailCard';

const defaultProps = {
  id: '333',
  fullName: 'Test Name',
  avatarUrl: 'https://test-url',
  githubId: 'testId',
  bio: 'This is a test Bio',
  followersCount: 55,
  followingCount: 60,
  repoCount: 30,
  htmlLink: 'https://github.ben',
  isFavourited: false,
  onClick: () => {}
};

describe('DetailCard component', () => {
  it('renders DetailCard component', () => {
    render(<DetailCard {...defaultProps} />, '');

    expect(screen.getByTestId('detailCard-component')).toBeDefined();
  });

  it('renders DetailCard attributes', () => {
    render(<DetailCard {...defaultProps} />, '');

    expect(screen.getByText('@testId')).toBeInTheDocument;
    expect(screen.getByText('Test Name')).toBeInTheDocument;
    expect(screen.getByText('55')).toBeInTheDocument;
    expect(screen.getByText('60')).toBeInTheDocument;
    expect(screen.getByText('30')).toBeInTheDocument;
    expect(screen.getByText('This is a test Bio')).toBeInTheDocument;
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument;
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://github.ben');
  });

  it('should fire Event when button is clicked on Detail Card', () => {
    const mockOnClick = jest.fn();

    render(<DetailCard {...defaultProps} onClick={mockOnClick} />, '');

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
