import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

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

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  // State object for the games
  const [games, setGames] = useState<Game[]>([]);

  // State object for error handling
  const [error, setError] = useState("");

  // Loading State
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // This is a controller that will allow us to cancel the request
    const controller = new AbortController();

    setLoading(true); // LOADING

    apiClient
      .get<FetchGamesResponse>("/games", {
        signal: controller.signal,
      })
      .then((res) => {
        setGames(res.data.results);
        setLoading(false); // LOADING
      })
      .catch((err) => {
        // If the request was cancelled, we don't want to set the error
        if (err instanceof CanceledError) return;

        setError(err.message);
        setLoading(false); // LOADING
      });

    // Cleanup function that will cancel the request
    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
