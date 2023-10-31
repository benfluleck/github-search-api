import Navigation from "@components/Navigation/Navigation";
import { useFetchUsers } from "@utils/hooks/useFetchUsers";

const FavouritePage = () => {

  // const { favouriteProfiles } = useFetchUsers()



  return (
    <>

      <Navigation>
        <h2 className="w-full self-center">Favourite Page</h2>
      </Navigation>
      <h4>Favourite Content</h4>
    </>
  );
};

export default FavouritePage;
