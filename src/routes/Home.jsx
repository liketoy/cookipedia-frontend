import Layout from "../components/Layout";
import ProtectedPage from "../components/ProtectedPage";

export default function Home() {
  return (
    <ProtectedPage>
      <Layout title={"팬트리"} hasTabBar>
        Home
      </Layout>
    </ProtectedPage>
  );
}
