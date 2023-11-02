import { FC } from 'react';
import Star from '@components/Star/Star';
import { DetailProps } from '@entities/userDetails';

const DetailCard: FC<DetailProps> = ({
  avatarUrl,
  fullName,
  githubId,
  bio,
  followersCount,
  followingCount,
  repoCount,
  htmlLink,
  isFavourited,
  id,
  onClick
}) => (
  <div data-testid="detailCard-component" className="flex h-64 gap-6 bg-white border-solid rounded shadow border-slate-600 p-8 max-[520px]:flex-col max-[520px]:h-full">
    <img src={avatarUrl} alt={`${githubId} avatar`} aria-hidden="true" className="w-48 h-48" />
    <div>
      <div className="flex justify-between mb-3">
        <h2 className="text-2xl">{fullName}</h2>
        <button
          aria-label="favourite"
          onClick={() => onClick({ id, avatarUrl, githubId, bio, isFavourited })}
        >
          <Star isStared={isFavourited} />
        </button>
      </div>
      <a className="text-blue-400" href={htmlLink}>
        @{githubId}
      </a>
      <p>{bio}</p>
      <div className="flex mt-8 gap-6">
        <div className="flex flex-col text-center">
          <span className="text-2xl">{followersCount}</span>
          <span className="text-xs text-slate-500">FOLLOWERS</span>
        </div>
        <div className="flex flex-col text-center">
          <span className="text-2xl">{followingCount}</span>
          <span className="text-xs text-slate-500">FOLLOWING</span>
        </div>
        <div className="flex flex-col text-center">
          <span className="text-2xl">{repoCount}</span>
          <span className="text-xs text-slate-500">REPOS</span>
        </div>
      </div>
    </div>
  </div>
);

export default DetailCard;
