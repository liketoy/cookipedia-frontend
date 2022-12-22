import { useQuery } from "@tanstack/react-query";
import { postMe } from "../api";

export default function modifyUser() {
  const { isLoading, data, isError } = useQuery(["me"], postMe, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    newuserLoading: isLoading,
    newuser: data,
    newisLoggedIn: !isError,
  };
}
