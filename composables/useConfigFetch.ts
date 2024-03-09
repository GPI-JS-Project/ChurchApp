export const useConfigFetch: typeof useFetch = (request, opts?) => {
const config = useRuntimeConfig();

  return useFetch(request, { baseURL: config.public.baseURL, ...opts })
}

export const useConfigPost = (request: string, data: any, opts?: any) => {
  const config = useRuntimeConfig();
  return useFetch(request, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...opts?.headers,
    },
    body: JSON.stringify(data),
    baseURL: config.public.baseURL,
    ...opts,
  });
}
