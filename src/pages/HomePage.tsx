import { FC, useEffect, useRef, useState } from 'react';
import SearchBox from '@components/SearchBox/SearchBox';
import SearchCardList from '@components/SearchCardList/SearchCardList';
import { useSearchParams } from 'react-router-dom';
import {
  REQUEST_STATUSES,
  transformAccounts,
  useAbortableFetch,
} from '@utils/hooks/useFetchUsers';
import Navigation from '@components/Navigation/Navigation';
import useIntersectionObserver from '@utils/hooks/useIntersectionObserver';
import { useFetchFavouriteProfiles } from '@utils/hooks/useFetchFavouriteProfiles';
import { GithubAccount } from '@entities/account';


const HomePage: FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState(searchParams.get('search') ?? '');

  const { favouriteIds, favouriteProfiles } = useFetchFavouriteProfiles();

  const ref = useRef(null);
  const observerTarget = useIntersectionObserver(ref);

  const URL = query ? `https://api.github.com/search/users?q=${query}&page=${page}` : '';

  const { status, error, accounts, fetchData } = useAbortableFetch<GithubAccount[]>(URL);

  const searchedAccounts = transformAccounts(accounts, favouriteIds);

  const fetchCurrentData = async () => {
    await fetchData(URL);
    setPage((page) => page + 1);
  };


  useEffect(() => {
    if (observerTarget?.isIntersecting) {
      fetchCurrentData();
    }
  }, [observerTarget?.isIntersecting, query]);

  const isLoading = status === REQUEST_STATUSES.LOADING;

  const handleSearchFilter = (value: string) => {
    if (value.length >= 3) {
      setSearchParams({ search: value });
      setQuery(value);
    } else {
      setSearchParams({});
      setQuery('');
    }
  };

  return (
    <>
      <Navigation>
        <SearchBox searchValue={query} handleFormChange={handleSearchFilter} />
      </Navigation>
      <main className="p-4">
        {searchedAccounts.length ? (
          <SearchCardList
            accounts={searchedAccounts}
            savedFavouriteProfiles={favouriteProfiles}
            isLoading={isLoading}
          />
        ) : (
          <p className="pt-2 text-center">No search results...</p>
        )}
        {isLoading && <p>Loading...</p>}
        <div id="benny" ref={ref}></div>
      </main>
    </>
  );
};

export default HomePage;
