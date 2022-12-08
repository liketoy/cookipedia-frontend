import ProtectedPage from "../components/ProtectedPage";
import Layout from "../components/Layout";
import useUser from "../lib/useUser";
import { Avatar, Box, Spinner, Text } from "@chakra-ui/react";

export default function UserPage() {
  const { userLoading, user, isLoggedIn } = useUser();
  return (
    <ProtectedPage>
      <Layout title={"사용자"} hasTabBar>
        {!userLoading && isLoggedIn ? (
          <>
            <Text>{user.nickname}</Text>
            <Text>{user.email}</Text>
            <Avatar src={user.avatar} />
            <Box>
              <Text
                backgroundColor={"pink"}
                textAlign={"center"}
                fontSize={"2xl"}
                fontWeight={"bold"}
              >
                {user.nickname}
              </Text>
              <Text
                backgroundColor={"green"}
                textAlign={"center"}
                color={"GrayText"}
              >
                {user.email}
              </Text>
            </Box>
          </>
        ) : (
          <Spinner />
        )}
      </Layout>
    </ProtectedPage>
  );
}
