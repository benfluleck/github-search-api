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
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const query = searchParams.get('search') ?? '';
  const [favouriteProfiles, setFavouriteProfiles] = useLocalStorageState({}, 'work_4_all');

  const ref = useRef(null);
  const observerTarget = useIntersectionObserver(ref);

  const URL = query.length >= 3 ? `${BASE_URL}?q=${query}&page=${page}` : '';

  const { status, accounts, reset } = useGHAccounts(URL);

  const searchedAccounts = transformAccounts(accounts, favouriteProfiles);

  useEffect(() => {
    if (observerTarget?.isIntersecting && accounts?.length >= 30) {
      debounce(setPage)(page + 1);
    }
  }, [observerTarget?.isIntersecting]);

  const isLoading = status === 'loading';

  const handleSearchFilter = (value: string) => {
    debounce(() => {
      reset();
      setSearchParams({ search: value });
      setPage(1);
    }, 3000)();
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
      <main className="p-4 h-screen">
        {searchedAccounts.length ? (
          <div className="grow p-4">
            <SearchCardList accounts={searchedAccounts} onClick={handleUserClick} />
          </div>
        ) : (
          <p className="pt-2 text-center">No search results...</p>
        )}
      </main>
      {isLoading && <p className="pt-2 text-center">Loading...</p>}
      <div ref={ref} />
    </>
  );
};

export default HomePage;
