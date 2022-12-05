import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

export default function ProtectedPage({ children }) {
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate("/signin");
      }
    }
  }, [userLoading, isLoggedIn, navigate]);
  return <>{children}</>;
}
