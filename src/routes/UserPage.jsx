import ProtectedPage from "../components/ProtectedPage";
import Layout from "../components/Layout";
import useUser from "../lib/useUser";
import useRecipes from "../lib/useRecipes";
import { Avatar, Box, Spinner, Text, useToast, Heading, Card, CardHeader, Grid, Divider, Button, Stack } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../api";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

export default function UserPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const { userLoading, user, isLoggedIn } = useUser();
  const { recipesLoading, recipes, recipesIsLoggedIn } = useRecipes();

  const foodCategory = ["한식","양식","일식","중식","분식","베이킹","기타"]
  const myrecipes = recipes ? recipes.filter((recipe,index)=>(recipe.writer.nickname === user.nickname)) : []
  console.log(document.cookie)

  const mutation = useMutation(postLogout, {
    onSuccess: () => {
      toast({
        title: "로그아웃 성공",
        status: "success",
        position: "bottom",
      });
      navigate("/signin");
    },
    onError: () => {
      console.log("로그아웃 실패")
    },
  })

  const onClick = () => {
    return mutation.mutate()
  }

  return (
    <ProtectedPage>
      {isLoggedIn ? 
      <Layout title={"My Page"} hasTabBar>
          <Popover>
            <PopoverTrigger>
              {/* <Button>Trigger</Button> */}
              <SettingsIcon float={"right"} boxSize={"25px"} />
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader><Link>개인정보 수정</Link></PopoverHeader>
                <PopoverCloseButton />
                <PopoverFooter><Link>비밀번호 수정</Link></PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>

        {!userLoading && isLoggedIn ? (
          <><Box textAlign={"center"}>
              {user.avatar ? <Avatar 
                src={user.avatar} 
                margin={"20px"} 
                borderWidth={4}
                borderColor={"black"}
                size={"2xl"} /> : <Avatar margin={"20px"} size={"2xl"}></Avatar>}
              <Text
                textAlign={"center"}
                fontSize={"2xl"}
                fontWeight={"bold"}
                style={{ textTransform: 'capitalize'}}
              >
                {user.nickname}
              </Text>
              <Text
                textAlign={"center"}
                color={"#797979"}
              >
                {user.email}
              </Text>
              <Link>
              <Stack as="form" >
                <Button
                type="submit" 
                mt={"5px"} 
                backgroundColor={"transparent"}
                textDecoration={"underline"} 
                color={"#FA4A0C"} 
                textAlign={"center"} 
                onClick={onClick}
                >로그아웃</Button>
              </Stack>
                
              </Link>
            </Box>
          </>
        ) : (
          <Spinner />
        )}

        <Tabs isFitted mt={"20px"}>
          <TabList>
            <Tab _selected={{color: "#FA4A0C"}}>My Recipes</Tab>
            <Tab _selected={{color: "#FA4A0C"}}>Likes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            {!recipesLoading && recipesIsLoggedIn ? 
              <>
                <Box>
                  {foodCategory.map((category,index)=>(
                    <Box mb={"10px"}>
                      <Text pl={"20px"} mb={"10px"} fontWeight={"bold"} fontSize={"xl"}>{category}</Text>
                      <Grid justifyContent={"center"} templateColumns={"repeat(2, 45%)"} gap={"6px"}>
                        {myrecipes.filter((recipe,index)=>(recipe.food.category === category))
                        .map((recipe,index)=>(
                          <Link>
                            <Card 
                            h={"200px"}
                            backgroundImage={recipe.cover ? `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${recipe.cover})` : "url('cooking.png')"}
                            backgroundPosition={"center"}
                            backgroundSize={recipe.cover ? "cover" : "150px"}
                            backgroundRepeat={"no-repeat"}
                            >
                              <CardHeader>
                                <Heading size={"ms"} color={recipe.cover ? "white" : "black"} pt={"120px"}>{recipe.title}</Heading>
                              </CardHeader>
                            </Card>
                          </Link>
                        ))}
                      </Grid>
                      <Divider mt={"10px"} />
                  </Box>
                  ))}
                </Box>  
              </>
            : (
              <Spinner />
            )}            
            </TabPanel>

            <TabPanel>
              <p>likes</p>
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Layout>
      : <Spinner />}
      
    </ProtectedPage>
  );
}
