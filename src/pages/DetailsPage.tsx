import { useParams } from 'react-router-dom';
import DetailCard from '@components/DetailCard/DetailCard';
import Navigation from '@components/Navigation/Navigation';
import { Detail } from '@entities/userDetails';
import { useFetch } from '@utils/hooks/useFetch';
import { useLocalStorageState } from '@utils/hooks/useLocalStorage';
import BackButton from '@components/BackButton/BackButton';

const BASE_URL = 'https://api.github.com/users';

const DetailPage = () => {
  const { id } = useParams();
  const [favouriteProfiles, setFavouriteProfiles] = useLocalStorageState({}, 'work_4_all');

  const { data, error } = useFetch(`${BASE_URL}/${id}`);

  const details = data as Detail;

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

  if (error) {
    return (
      <main className="p-8 flex justify-center items-center">
        <h2 className="text-red-700 text-3xl"> 404 Page Not Found</h2>
      </main>
    );
  }

  return (
    <>
      {details && (
        <>
          <Navigation>
            <BackButton />
            <h2 className="w-full self-center">@{details?.login}</h2>
          </Navigation>
          <main className="p-4 flex justify-center items-center">
            <DetailCard
              avatarUrl={details?.avatar_url}
              fullName={details?.name}
              bio={details?.bio}
              followersCount={details?.followers}
              followingCount={details?.following}
              repoCount={details?.public_repos}
              githubId={id}
              htmlLink={details?.html_url}
              id={details?.id.toString()}
              onClick={handleUserClick}
              isFavourited={!!favouriteProfiles[details?.id]}
            />
          </main>
        </>
      )}
    </>
  );
};

export default DetailPage;
