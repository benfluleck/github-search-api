import { FC, useState } from 'react';
import styles from './searchCard.module.css';
import Star from '@components/Star/Star';
import { Account } from '@entities/account';
import { useNavigate } from 'react-router-dom';

interface SearchCardProps {
  avatarUrl?: string;
  id: string;
  githubId: string;
  bio?: string;
  isFavourited?: boolean;
  onClick: (account: Account) => void;
}

const SearchCard: FC<SearchCardProps> = ({
  id,
  avatarUrl,
  githubId,
  bio,
  isFavourited,
  onClick
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${githubId}`);
  };

  return (
    <div
      data-testid="search-card-component"
      role="link"
      aria-label="Search card"
      onClick={handleClick}
      className={`cursor-pointer bg-white md:w-6/12 flex items-center gap-6 px-4 py-6 ${styles.searchCard}`}
    >
      <img
        src={avatarUrl}
        aria-hidden="true"
        alt={`${githubId} avatar`}
        className="align-middle w-10 h-10 rounded-full border-gray-400"
      />
      <div className="grow">
        <h4>{githubId}</h4>
        <p>{bio}</p>
      </div>
      <button
        id={id}
        aria-label="favourite"
        onClick={(event) => {
          event.stopPropagation();
          onClick({
            id,
            avatarUrl,
            githubId,
            bio,
            isFavourited
          });
        }}
      >
        <Star isStared={isFavourited} />
      </button>
    </div>
  );
};

export default SearchCard;
