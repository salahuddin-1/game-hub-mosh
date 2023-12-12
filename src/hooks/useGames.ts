import useData from "./useData";
import { Genre } from "./useGenres";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

// By exporting the interface, we can use it in other files
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: {
    platform: Platform;
  }[];
  metacritic: number;
}

const useGames = (
  selectedGenre: Genre | null,
  selectedPlatform: Platform | null
) =>
  useData<Game>(
    "/games",

    // Here, we pass an object {} - this is the requestConfig
    // Inside this object, we can pass any of the AxiosRequestConfig properties
    // there is a property called params, which is an object that will be converted to query params
    // so we can pass the "genres" query param
    // Note: "genres" is the name of the query param that the API expects
    // id or slug will work, here we are using id
    {
      params: {
        genres: selectedGenre?.id,
        parent_platforms: selectedPlatform?.id,
      },
    },
    [selectedGenre?.id, selectedPlatform?.id]
  );

export default useGames;
