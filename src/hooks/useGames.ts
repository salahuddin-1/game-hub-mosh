import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Game {
  id: number;
  name: string;
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

  useEffect(() => {
    // This is a controller that will allow us to cancel the request
    const controller = new AbortController();

    apiClient
      .get<FetchGamesResponse>("/games", {
        signal: controller.signal,
      })
      .then((res) => {
        setGames(res.data.results);
      })
      .catch((err) => {
        // If the request was cancelled, we don't want to set the error
        if (err instanceof CanceledError) return;

        setError(err.message);
      });

    // Cleanup function that will cancel the request
    return () => controller.abort();
  }, []);

  return { games, error };
};

export default useGames;
