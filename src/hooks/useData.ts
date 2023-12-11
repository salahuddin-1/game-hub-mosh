import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  // State object for the games
  const [data, setData] = useState<T[]>([]);

  // State object for error handling
  const [error, setError] = useState("");

  // Loading State
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // This is a controller that will allow us to cancel the request
    const controller = new AbortController();

    setLoading(true); // LOADING

    apiClient
      .get<FetchResponse<T>>(endpoint, {
        signal: controller.signal,
      })
      .then((res) => {
        setData(res.data.results);
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

  return { data, error, isLoading };
};

export default useData;
