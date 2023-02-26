import useSWR from "swr";



export default function useUser() {
  const { data, mutate, error } = useSWR("api_user", (url) => fetch(url).then((res) => res.json()));

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate
  };
}