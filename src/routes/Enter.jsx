import { Box, Button, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";
import { RiSearchLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

export default function Enter() {
  const navigate = useNavigate();
  return (
    <Box
      bgImage={
        "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7) ),url('./bg.jpg')"
      }
      bgPosition="center"
      bgSize={"cover"}
    >
      <VStack
        justifyContent="flex-end"
        alignItems={"center"}
        px="20"
        py="20"
        mx={"auto"}
        maxW={"5xl"}
        minH={"100vh"}
        spacing="10"
      >
        <Stack direction={"column"} spacing={4} alignItems="center">
          <Heading color={"whiteAlpha.900"} size="3xl">
            Pantry
          </Heading>
          <Text fontSize={"lg"} color={"whiteAlpha.900"}>
            내가 가지고 있는 재료들로 만들 수 있는 레시피
          </Text>
        </Stack>
        <Stack direction={"column"} spacing={4} width={"100%"}>
          <Button
            leftIcon={<FiMail />}
            colorScheme="whiteAlpha"
            variant={"outline"}
            width={"100%"}
            borderRadius="2xl"
            color={"white"}
            onClick={() => navigate("/signin")}
          >
            Login with email
          </Button>
          <Button
            leftIcon={<RiSearchLine />}
            colorScheme="whiteAlpha"
            variant={"outline"}
            width={"100%"}
            borderRadius="2xl"
            color={"white"}
          >
            Recipes Search
          </Button>
        </Stack>
        <Stack direction={"row"} alignItems="center">
          <Text fontWeight={"semibold"} color={"whiteAlpha.900"}>
            회원이 아니신가요?
          </Text>
          <Link to={"/signup"}>
            <Text color={"#FA4A0C"} fontSize="lg" fontWeight="semibold">
              Sign Up
            </Text>
          </Link>
        </Stack>
      </VStack>
    </Box>
  );
}
