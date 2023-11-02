import BackButton from '@components/BackButton/BackButton';
import Navigation from '@components/Navigation/Navigation';
import SearchCardList from '@components/SearchCardList/SearchCardList';
import { Account } from '@entities/account';
import { useLocalStorageState } from '@utils/hooks/useLocalStorage';

const FavouritePage = () => {
  const [favouriteProfiles, setFavouriteProfiles] = useLocalStorageState({}, 'work_4_all');

  const currentAccounts = Object.values(favouriteProfiles) as Account[];

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
        <BackButton />
        <h2 className="w-full self-center">Favourite Page</h2>
      </Navigation>
      <main className="p-4">
        {currentAccounts.length ? (
          <SearchCardList accounts={currentAccounts} onClick={handleUserClick} />
        ) : (
          <p className="pt-2 text-center">No search Cards Favourited</p>
        )}
      </main>
    </>
  );
};

export default FavouritePage;
