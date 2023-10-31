import { FC, useState } from 'react';
import styles from './searchCard.module.css';
import Star from '@components/Star/Star';
import { Account } from '@entities/account';

interface SearchCardProps {
  avatarUrl?: string;
  id: string;
  githubId: string;
  description?: string;
  isFavourited?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement,MouseEvent>, a: Account) => void;
}

const SearchCard: FC<SearchCardProps> = ({
  id,
  avatarUrl,
  githubId,
  description,
  isFavourited,
  // onClick
}) => {
  const [isStarred, setIsStarred] = useState(isFavourited);

  return (
    <>
      <img
        src={avatarUrl}
        aria-hidden="true"
        alt={`${githubId} avatar`}
        className="align-middle w-10 h-10 rounded-full border-gray-400"
      />
      <div className="grow">
        <h4>{githubId}</h4>
        <p>{description}</p>
      </div>
      <button
        id={id}
        aria-label="favourite"
        onClick={() => setIsStarred(!isStarred)}
      >
        <Star isStared={isStarred} />
      </button>
    </>
  );
};

export default SearchCard;
