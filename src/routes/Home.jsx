import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import Layout from "../components/Layout";
import ProtectedPage from "../components/ProtectedPage";
import useUser from "../lib/useUser";

export default function Home() {
  const {userLoading, user, isLoggedIn} = useUser()
  return (
    <ProtectedPage>
      <Layout title={"팬트리"} hasTabBar>
        Home
      </Layout>
    </ProtectedPage>
    
  );
}
