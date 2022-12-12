import { useQuery } from "@tanstack/react-query";
import { getMypantry } from "../api";

export default function usePantry() {
  const { isLoading, data, isError } = useQuery(["mypantry"], getMypantry, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    pantryLoading: isLoading,
    pantry: data,
    pantryIsLoggedIn: !isError,
  };
}
