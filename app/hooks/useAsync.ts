"use client";

import { useCallback, useEffect, useState } from "react";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: React.DependencyList = []
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await asyncFunction();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncFunction, ...dependencies]);

  useEffect(() => {
    execute();
  }, [execute]);

  const refetch = useCallback(() => {
    execute();
  }, [execute]);

  return { ...state, refetch };
}

interface LoadingState {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  // eslint-disable-next-line no-unused-vars
  withLoading: <T>(asyncFn: () => Promise<T>) => Promise<T>;
}

export function useLoading(initialState = false): LoadingState {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  const withLoading = useCallback(
    async <T>(asyncFn: () => Promise<T>): Promise<T> => {
      try {
        setIsLoading(true);
        const result = await asyncFn();
        return result;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, startLoading, stopLoading, withLoading };
}
