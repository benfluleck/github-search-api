import { FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBox from '@components/SearchBox/SearchBox';
import SearchCardList from '@components/SearchCardList/SearchCardList';
import { transformAccounts, useGHAccounts } from '@utils/hooks/useFetch';
import Navigation from '@components/Navigation/Navigation';
import useIntersectionObserver from '@utils/hooks/useIntersectionObserver';
import { useLocalStorageState } from '@utils/hooks/useLocalStorage';
import { debounce } from '@utils/debounce';

const BASE_URL = 'https://api.github.com/search/users';

const HomePage: FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const query = searchParams.get('search') ?? '';
  const [favouriteProfiles, setFavouriteProfiles] = useLocalStorageState({}, 'work_4_all');

  const ref = useRef(null);
  const observerTarget = useIntersectionObserver(ref);

  const URL = query.length >= 3 ? `${BASE_URL}?q=${query}&page=${page}` : '';

  const { status, accounts, setAccounts } = useGHAccounts(URL);

  const searchedAccounts = transformAccounts(accounts, favouriteProfiles);

  useEffect(() => {
    if (observerTarget?.isIntersecting) {
      debounce(setPage)(page + 1);
    }
  }, [observerTarget?.isIntersecting]);

  const isLoading = status === 'loading';

  const handleSearchFilter = (value: string) => {
    setSearchParams({ search: value });
    setPage(1);
    setAccounts([]);
  };

  const handleUserClick = async (account) => {
    if (favouriteProfiles[account.id]) {
      delete favouriteProfiles[account.id];
      setFavouriteProfiles({ ...favouriteProfiles });
    } else {
      setFavouriteProfiles({
        ...favouriteProfiles,
        [account.id]: { ...account, isFavourited: true }
      });
    }
  };

  return (
    <>
      <Navigation>
        <SearchBox searchValue={query} handleFormChange={handleSearchFilter} />
      </Navigation>
      <main className="p-4">
        {searchedAccounts.length ? (
          <SearchCardList accounts={searchedAccounts} onClick={handleUserClick} />
        ) : (
          <p className="pt-2 text-center">No search results...</p>
        )}
        {isLoading && <p className='pt-2 text-center'>Loading...</p>}
        <div ref={ref}></div>
      </main>
    </>
  );
};

export default HomePage;
