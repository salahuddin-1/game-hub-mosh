import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig, CanceledError } from "axios";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

// Note: if you declare an optional parameter, all the parameters after it must be optional as well
// Here we are saying that requestConfig is an optional parameter, so
// whatever other params we declare after it must be optional as well
const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  // State object for the games
  const [data, setData] = useState<T[]>([]);

  // State object for error handling
  const [error, setError] = useState("");

  // Loading State
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      // This is a controller that will allow us to cancel the request
      const controller = new AbortController();

      setLoading(true); // LOADING

      apiClient
        .get<FetchResponse<T>>(endpoint, {
          signal: controller.signal,
          // if we don't pass a requestConfig, signal will go by default
          // If we have a requestConfig, we want to merge it with the default config
          ...requestConfig,
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
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useData;
