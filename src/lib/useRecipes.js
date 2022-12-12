import { useQuery } from "@tanstack/react-query";
import { getMyRecipes } from "../api";

export default function useRecipes() {
  const { isLoading, data, isError } = useQuery(["myrecipes"], getMyRecipes, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    recipesLoading: isLoading,
    recipes: data,
    recipesIsLoggedIn: !isError,
  };
}
