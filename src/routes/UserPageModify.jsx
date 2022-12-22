import { Avatar, Box,Button,Input,Stack,Text, textDecoration, useToast } from "@chakra-ui/react";
import Layout from "../components/Layout";
import ProtectedPage from "../components/ProtectedPage";
import useUser from "../lib/useUser";
import { useForm } from "react-hook-form";
import { putMe } from "../api";
import { useMutation } from "@tanstack/react-query";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPageModify(){
    const navigate = useNavigate()
    const toast = useToast()
    const {userLoading, user, isLoggedIn} = useUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
      } = useForm();

    const mutation = useMutation(putMe,{
        onSuccess: () => {
            toast({
              title: "변경 완료",
              status: "success",
              position: "bottom",
            });
            // navigate("/user")
          },
    })

    // useEffect(()=>{
    //     if(user){
    //        if(user.nickname && user.email){
    //         setValue("nickname",user.nickname);
    //         setValue("email",user.email);
    //         setValue("address", user?.address ? user?.address : "");
    //        setValue("avatar", user?.avatar ? user?.avatar : "")
    //     } 
    //     }
    // },[])

    const onValid = ({ avatar, nickname, email, address}) => {
        mutation.mutate({avatar, nickname, email, address})
        console.log(avatar,nickname,email)
        }

    const [avatarPreview, setAvatarPreview] = useState(user?.avatar)    
    const avatarImg = watch("avatar")

    useEffect(()=>{
        if (avatarImg && avatarImg.length > 0){
            const file = avatarImg[0]
            setAvatarPreview(URL.createObjectURL(file))
        }
        else{
            setAvatarPreview(user?.avatar)
        }
    }, [avatarImg])

    // const [image,setImage] = useState()
    // const onImangeHandler = (event) => {
    //     setImage(()=>event.target.files[0])
    // }

    return (
        <ProtectedPage >
            <Layout title={"회원정보 수정"} canGoBack>
                <Stack
                as="form"
                m={"30px"}
                onSubmit={handleSubmit(onValid)}>
                    <FormControl>
                        <FormLabel>프로필 사진</FormLabel>
                        {/* {user?.avatar ? <Avatar 
                        src={avatarPreview} 
                        margin={"20px"} 
                        borderWidth={4}
                        borderColor={"black"}
                        size={"2xl"} /> : <Avatar margin={"20px"} size={"2xl"}></Avatar>} */}
                        <Box
                        textAlign={"center"}>
                        <Avatar 
                        src={avatarPreview} 
                        margin={"20px"} 
                        borderWidth={4}
                        borderColor={"black"}
                        size={"2xl"} 
                        display={"inline-block"}
                        />
                        <Box textAlign={"center"}>
                            <label style={{textDecoration: "underline", color: "#FA4A0C"}} htmlFor="imgbtn">사진 변경</label>
                            <Input
                            id = {"imgbtn"}
                            pt={"4px"}
                            name = "avatar" 
                            type="file"
                            style={{display:"none"}}
                            {...register("avatar")}
                            ></Input>
                        </Box>
                        
                        </Box>
                        

                    </FormControl>
                    <FormControl>
                        <FormLabel>닉네임</FormLabel>
                        <Input 
                        name="nickname"
                        focusBorderColor="#797979"
                        defaultValue = {user?.nickname}
                        {...register("nickname")}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>이메일</FormLabel>
                        <Input type='email' 
                        defaultValue={user?.email}
                        name="email"
                        focusBorderColor="#797979"
                        {...register("email")}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>주소</FormLabel>
                        <Input 
                        defaultValue={user?.address}
                        name="address"
                        focusBorderColor="#797979"
                        {...register("address")}
                        />
                    </FormControl>
                    <Button
                    type="submit"
                    >변경</Button>
                </Stack>
                
            </Layout>
        </ProtectedPage>
    )
}