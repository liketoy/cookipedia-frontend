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
  Text,
  RadioGroup,
  Radio,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postSignUp } from "../api";
import AddressPopUp from "../components/AddressPopUp";
import { useState } from "react";
import { PhoneIcon } from '@chakra-ui/icons'
import ProtectedPage from "../components/ProtectedPage";

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

  const [popUp, setPopUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    resetField,
    watch,
  } = useForm({ defaultValues: { popUp: false } });

  const mutation = useMutation(postSignUp, {
    onSuccess: () => {
      navigate("/signin")
      toast({
        title: "회원가입 성공",
        status: "success",
        duration: 2000,
      });
    },
    onError: ({ response }) => { // always not working
      console.log('온에러', response.data)
    }
  });


  const onValid = ({
    username,
    password,
    password1,
    name,
    gender,
    avatar,
    birth_date,
    address,
    phone_number,
    nickname,
    email
  }) => {
    if (password !== password1) {
      resetField("password1");
      setError(
        "password1",
        { message: "비밀번호가 다릅니다." },
        { shouldFocus: true, type: "focus" }
      );
      
    }
    if (nickname.length < 3){
      resetField("nickname");
      setError(
        "nickname",
        { message: "닉네임은 최소 3글자입니다."},
        { shouldFocus: true, type: "focus"}
      );
      
    }

    if (nickname.length < 3 || password !== password1){
      return;
    }

    address = watch("addressUpper") + " " + watch("addressDetail");
    // 현재 백엔드에서 addess가 필수값이라 undefined에 대한 처리 x

    email = watch("emailFront") + "@" + watch("emailBack");
    avatar = avatar[0];

    mutation.mutate({ username, password, name, gender, avatar, birth_date, address, phone_number, email, nickname });
  };

  return (
  <ProtectedPage logOutOnly>
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
            <RadioGroup defaultValue="Not to disclose">
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                <Radio value="Male" {...register("gender")}>
                  male
                </Radio>
                <Radio value="Female" {...register("gender")}>
                  female
                </Radio>
                <Radio value="Not to disclose" {...register("gender")}>
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

          <FormControl>
            <FormLabel><Box as="span" color="red">*</Box> EMAIL</FormLabel>
            <Box display="flex" alignItems="center">
              <Input type="text" id="emailFront" onChange={(e) => setValue("emailFront", e.target.value)} isRequired />
              <Text fontSize="1.5rem" marginLeft="1rem" marginRight="1rem">@</Text>
              <Input type="text" onChange={(e) => setValue("emailBack", e.target.value)} isRequired />
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel><Box as="span" color="red">*</Box> Phone Number</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<PhoneIcon />} />
              <Input type="tel" placeholder="Phone number (without '-')" isRequired maxLength="11"  {...register("phone_number")} />
            </InputGroup>
          </FormControl>

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
              name: "birth_date",
              label: "BIRTH DATE",
              type: "date",
              min: "1960-01-01",
              max: "2015-01-01",
              register: register,
            }}
          />



          <FormControl>
            <FormLabel>ADDRESS</FormLabel>
            {popUp ? <div><AddressPopUp setValue={setValue} /></div> : ''}
            <Box display="flex">
              <Input type="text" focusBorderColor="none" isReadOnly={true} value={watch("addressUpper")} />
              <Button width="20%" marginLeft="5%" bgColor="#FA4A0C" color="white" onClick={() => setPopUp(prev => !prev)}>주소검색</Button>
            </Box>
            <Input type="text" id="addDetail" placeholder="상세주소" marginTop="1rem" focusBorderColor="none" onChange={(e) => setValue("addressDetail", e.target.value)} />
          </FormControl>




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
  </ProtectedPage>
  );
}
