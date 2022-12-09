import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  VStack,
  useToast,
  Box,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postSignUp } from "../api";
import DaumPostcode from "react-daum-postcode";

const InputItem = ({ inputProps }) => {
  const {
    type,
    name,
    register,
    requiredInput,
    label,
    placeholder,
    accept,
    min,
    max,
    error,
  } = inputProps;
  const minLengthCheck =
    name === "username" || name === "password" || name === "password1";

  return (
    <FormControl isInvalid={error}>
      <FormLabel mb={0} fontSize={"sm"} color="gray.600" fontWeight="bold">
        {requiredInput && name !== "password1" ? (
          <Box as="span" color="red">
            *
          </Box>
        ) : (
          ""
        )}{" "}
        {label}
      </FormLabel>
      <Input
        type={type}
        name={name}
        accept={accept}
        variant="flushed"
        w="100%"
        min={min}
        max={max}
        placeholder={placeholder}
        borderColor="#797979"
        focusBorderColor="#797979"
        fontWeight="bold"
        isRequired={requiredInput}
        {...(minLengthCheck
          ? register(name, {
              minLength: { value: 5, message: "write more than 5 word" },
            })
          : register(name))}
      />
      <FormErrorMessage>{inputProps?.error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default function SignUp() {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm();

  const mutation = useMutation(postSignUp, {
    onSuccess: () => {
      if (Object.keys(errors).length === 0) {
        toast({
          title: "회원가입 성공",
          status: "success",
          duration: 2000,
        });
      }
    },
  });

  const onValid = ({
    username,
    password,
    password1,
    name,
    gender,
    avatar,
    birth,
  }) => {
    if (password !== password1) {
      resetField("password1");
      setError(
        "password1",
        { message: "비밀번호가 다릅니다." },
        { shouldFocus: true, type: "focus" }
      );
    }
    mutation.mutate({ username, password, name, gender, avatar, birth });
  };
  // address랑 phonenumber하면 된다
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
          회원가입
        </Heading>

        <Stack as="form" spacing="5" w="100%" onSubmit={handleSubmit(onValid)}>
          <InputItem
            inputProps={{
              label: "ID",
              name: "username",
              placeholder: "ID",
              requiredInput: true,
              register: register,
              error: errors.username,
            }}
          />
          <InputItem
            inputProps={{
              label: "PASSWORD",
              type: "password",
              name: "password",
              placeholder: "PASSWORD",
              requiredInput: true,
              register: register,
              error: errors.password,
            }}
          />
          <InputItem
            inputProps={{
              name: "password1",
              type: "password",
              placeholder: "Reenter password for verification",
              requiredInput: true,
              register: register,
              error: errors.password1,
            }}
          />
          <FormControl>
            <FormLabel>GENDER</FormLabel>
            <RadioGroup defaultValue="not to disclose">
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Radio value="male" {...register("gender")}>
                  male
                </Radio>
                <Radio value="female" {...register("gender")}>
                  female
                </Radio>
                <Radio value="not to disclose" {...register("gender")}>
                  not to disclose
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <InputItem
            inputProps={{
              name: "name",
              label: "NAME",
              placeholder: "NAME",
              requiredInput: true,
              register: register,
              error: errors.name,
            }}
          />
          <InputItem
            inputProps={{
              name: "nickname",
              label: "NICKNAME",
              placeholder: "NICKNAME",
              requiredInput: true,
              register: register,
              error: errors.nickname,
            }}
          />

          <InputItem
            inputProps={{
              name: "avatar",
              label: "AVATAR",
              type: "file",
              accept: "image/jpeg,.png",
              placeholder: "AVATAR",
              register: register,
            }}
          />
          <InputItem
            inputProps={{
              name: "birth",
              label: "BIRTH DATE",
              type: "date",
              min: "1960-01-01",
              max: "2015-01-01",
              register: register,
            }}
          />

          <Button
            type="submit"
            colorScheme={"orange"}
            color="white"
            bgColor={"#FA4A0C"}
            borderRadius="2xl"
            w="100%"
          >
            Sign Up
          </Button>
        </Stack>
      </VStack>
    </Stack>
  );
}
