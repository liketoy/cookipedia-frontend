import { Icon, Stack } from "@chakra-ui/react";
import FloatingButton from "../components/FloatingButton";
import Layout from "../components/Layout";
import ProtectedPage from "../components/ProtectedPage";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  return (
    <ProtectedPage>
      <Layout title={"팬트리"} hasTabBar>
        <Stack direction={"column"}>
          <h1>Home</h1>
          <FloatingButton href="/user">
            <Icon as={FaPlus} />
          </FloatingButton>
        </Stack>
      </Layout>
    </ProtectedPage>
  );
}
