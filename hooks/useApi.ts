'use client';


import { apiClient, ApiResponse } from '@/lib/api/api';
import { useState, useCallback } from 'react';


export function useApi<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (
      endpoint: string,
      options: RequestInit & { json?: any } = {} // 👈 agregado
    ): Promise<ApiResponse<T>> => {
      setLoading(true);
      setError(null);

      // Si pasas la propiedad json, la convierte automáticamente
      const { json, ...rest } = options;
      const body = json ? JSON.stringify(json) : options.body;

      const response = await apiClient<T>(endpoint, { ...rest, body });

      if (response.error) setError(response.error);
      setLoading(false);
      return response;
    },
    []
  );

  return { request, loading, error };
}
