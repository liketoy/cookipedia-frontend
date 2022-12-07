import ProtectedPage from "../components/ProtectedPage";
import Layout from "../components/Layout";
import useUser from "../lib/useUser";
import { Box, Image, Text } from "@chakra-ui/react";



export default function UserPage(){
    const {useLoading, user, isLoggedIn} = useUser()
    console.log(user)
    return (
        <ProtectedPage>
            <Layout title={"사용자"} hasTabBar>
                유저페이지 잘나옴
                <Text>{user.nickname}</Text>
                <Text>{user.email}</Text>
                {/* {user.avatar} */}
                {/* <Image src={`${user.avatar}`} /> */}
                <Box>
                    <Text
                    backgroundColor={"pink"}
                    textAlign={"center"}
                    fontSize={"2xl"}
                    fontWeight={"bold"}
                    >
                    {user.nickname}
                    </Text>
                    <Text backgroundColor={"green"} textAlign={"center"} color={"GrayText"}>
                    {user.email}
                    </Text> 
                </Box>

            </Layout>
        </ProtectedPage>
    )
}