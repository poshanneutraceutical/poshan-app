import { useCallback, useRef, useState } from "react";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json"
};

const useApi = (baseUrl = "/api") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const abortController = useRef(null);

  const request = useCallback(
    async (
      endpoint,
      {
        method = "GET",
        body = null,
        headers = {},
        signal
      } = {}
    ) => {
      if (abortController.current) {
        abortController.current.abort();
      }

      abortController.current = new AbortController();

      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        const response = await fetch(
          `${baseUrl}${endpoint}`,
          {
            method,
            headers: {
              ...DEFAULT_HEADERS,
              ...(token
                ? {
                    Authorization: `Bearer ${token}`
                  }
                : {}),
              ...headers
            },
            body: body
              ? JSON.stringify(body)
              : null,
            signal:
              signal ||
              abortController.current.signal
          }
        );

        if (!response.ok) {
          let message =
            "Something went wrong.";

          try {
            const errorData =
              await response.json();

            message =
              errorData.message || message;
          } catch {}

          throw new Error(message);
        }

        if (response.status === 204) {
          return null;
        }

        return await response.json();
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  const get = useCallback(
    (url) => request(url),
    [request]
  );

  const post = useCallback(
    (url, body) =>
      request(url, {
        method: "POST",
        body
      }),
    [request]
  );

  const put = useCallback(
    (url, body) =>
      request(url, {
        method: "PUT",
        body
      }),
    [request]
  );

  const patch = useCallback(
    (url, body) =>
      request(url, {
        method: "PATCH",
        body
      }),
    [request]
  );

  const del = useCallback(
    (url) =>
      request(url, {
        method: "DELETE"
      }),
    [request]
  );

  const cancelRequest = () => {
    abortController.current?.abort();
  };

  return {
    loading,
    error,
    request,
    get,
    post,
    put,
    patch,
    delete: del,
    cancelRequest
  };
};

export default useApi;