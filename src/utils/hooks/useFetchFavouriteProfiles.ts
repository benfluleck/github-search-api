import { fetchJSON } from "@utils/fakeApi";
import { useEffect, useState } from "react";


export const useFetchFavouriteProfiles = () => {
  const [favouriteProfiles, setFavouriteProfiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavouriteProfiles = async () => {
      try {
        const data = await fetchJSON({ key: 'work_4_all' });
        setFavouriteProfiles(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchFavouriteProfiles();
  }, []);

  const favouriteIds = Object.keys(favouriteProfiles);


  return {
    favouriteIds,
    favouriteProfiles,
    error
  }

  

}
