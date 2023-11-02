import { FC, useEffect, useState } from 'react';
import SearchCard from '@components/SearchCard/SearchCard';
import styles from './searchCardList.module.css';
import { Account } from '@entities/account';


interface SearchCardListDrops {
  accounts?: Account[];
  onClick: (account: Account) => void;
}

const SearchCardList: FC<SearchCardListDrops> = ({ accounts, onClick }) => {
  return (
    <div data-testid="searchCardList-component" className={`${styles.searchCardList} flex justify-center items-center flex-col`}>
      {accounts.map((account) => (
        <SearchCard
          key={account.id}
          id={account.id}
          githubId={account.githubId}
          avatarUrl={account.avatarUrl}
          bio={account.bio}
          isFavourited={account.isFavourited}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default SearchCardList;
