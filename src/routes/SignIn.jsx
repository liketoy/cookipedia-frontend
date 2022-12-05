import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <Stack
      bgImage={
        "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7) ),url('./bg.jpg')"
      }
      bgPosition="center"
      bgSize={"cover"}
      justifyContent="center"
      alignItems={"center"}
      minH="100vh"
      px={"20px"}
      py="10"
    >
      <VStack
        px="8"
        py="14"
        spacing="10"
        bgColor={"rgba(255, 255, 255, 0.6)"}
        borderRadius="2xl"
        w={["100%", "xl"]}
      >
        <Heading size={"lg"} fontWeight={"semibold"} alignSelf="flex-start">
          로그인
        </Heading>
        <Stack as="form" spacing={10} w="100%">
          <FormControl>
            <FormLabel mb={0} fontSize={"sm"} color="gray.600">
              ID
            </FormLabel>
            <Input
              name="username"
              w="100%"
              variant="flushed"
              placeholder="ID"
              borderColor={"#797979"}
              focusBorderColor="#797979"
              height={9}
              fontWeight="bold"
            />
          </FormControl>
          <FormControl>
            <FormLabel mb={0} fontSize={"sm"} color="gray.600">
              Password
            </FormLabel>
            <Input
              name="password"
              w="100%"
              variant="flushed"
              placeholder="Password"
              type={"password"}
              focusBorderColor="#797979"
              borderColor={"#797979"}
              height={9}
              fontWeight="bold"
            />
          </FormControl>
          <Button
            type="submit"
            colorScheme={"orange"}
            color="white"
            bgColor={"#FA4A0C"}
            borderRadius="2xl"
            w="100%"
          >
            Login
          </Button>
        </Stack>
        <Stack direction={["column", "row"]} alignItems="center">
          <Text fontWeight={"semibold"} color={"#414141"}>
            회원이 아닌가요? 지금 가입하세요.
          </Text>
          <Link to="/signup">
            <Text color={"#FA4A0C"} fontSize="lg" fontWeight="semibold">
              Sign Up
            </Text>
          </Link>
        </Stack>
      </VStack>
    </Stack>
  );
}
