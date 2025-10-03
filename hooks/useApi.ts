'use client';


import { apiClient, ApiResponse } from '@/lib/api/api';
import { useState, useCallback } from 'react';


export function useApi<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    const response = await apiClient<T>(endpoint, options);

    if (response.error) {
      setError(response.error);
    }

    setLoading(false);
    return response;
  }, []);

  return { request, loading, error };
}
