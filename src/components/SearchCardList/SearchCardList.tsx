import { FC, useEffect, useState } from 'react';
import SearchCard from '@components/SearchCard/SearchCard';
import styles from './searchCardList.module.css';
import { Account } from '@entities/account';
import { storeJSON } from '@utils/fakeApi';

interface SearchCardListDrops {
  accounts?: Account[];
  savedFavouriteProfiles: string[];
  isLoading?: boolean;
}

const SearchCardList: FC<SearchCardListDrops> = ({
  accounts,
  savedFavouriteProfiles,
}) => {
  const [favouriteProfiles, setFavouriteProfiles] = useState(savedFavouriteProfiles);


  useEffect(() => {
    storeJSON({ key: 'work_4_all', data: favouriteProfiles });
  }, [JSON.stringify(favouriteProfiles)]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, account: Account) => {
    const { tagName, id } = event.target as HTMLDivElement;

    if (tagName === 'BUTTON') {
      if (!favouriteProfiles[id]) {
        setFavouriteProfiles({ ...favouriteProfiles, [id]: account });
      } else {
        const currentFavouriteProfiles = favouriteProfiles;

        console.log(currentFavouriteProfiles[id])
        delete currentFavouriteProfiles[id];
        setFavouriteProfiles({...currentFavouriteProfiles});
      }
    }
  };

  return (
    <div className={`${styles.searchCardList} flex justify-center items-center flex-col`}>
      {accounts.map((account, i) => (
        <div
          className={`bg-white md:w-6/12 flex items-center gap-6 px-4 py-6 ${styles.searchCard}`}
          onClick={(e) => handleClick(e, account)}
          key={account.id}
        >
          <SearchCard
            id={account.id}
            githubId={account.githubId}
            avatarUrl={account.avatarUrl}
            description={account.description}
            isFavourited={account.isFavourited}
          />
        </div>
      ))}
    </div>
  );
};

export default SearchCardList;
