import { render, screen } from '@helpers/test-utils';

import SearchCardList from '../SearchCardList';

const defaultProps = {
  accounts: [
    {
      id: '3333',
      avatarUrl: 'https://test-url1',
      githubId: 'testId1',
      isFavourited: false
    },
    {
      id: '33334',
      avatarUrl: 'https://test-url2',
      githubId: 'testId2',
      isFavourited: true
    },
    {
      id: '33335',
      avatarUrl: 'https://test-url3',
      githubId: 'testId3',
      isFavourited: false
    },
    {
      id: '33336',
      avatarUrl: 'https://test-url4',
      githubId: 'testId4',
      isFavourited: false
    }
  ],
  onClick: () => {}
};

describe('SearchCardList component', () => {
  it('renders 4 SearchCards component', () => {
    render(<SearchCardList {...defaultProps} />, '');

    expect(screen.getAllByTestId('searchCardList-component')).toBeInTheDocument;
    expect(screen.getAllByTestId('search-card-component')).toHaveLength(4);
  });
});
