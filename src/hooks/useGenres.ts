import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
  id: number;
  name: string;
}

interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  // State object for the games
  const [genres, setGenres] = useState<Genre[]>([]);

  // State object for error handling
  const [error, setError] = useState("");

  // Loading State
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // This is a controller that will allow us to cancel the request
    const controller = new AbortController();

    setLoading(true); // LOADING

    apiClient
      .get<FetchGenresResponse>("/genres", {
        signal: controller.signal,
      })
      .then((res) => {
        setGenres(res.data.results);
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

  return { genres, error, isLoading };
};

export default useGenres;
