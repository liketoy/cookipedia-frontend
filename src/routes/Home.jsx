import { BellIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  VStack,
  HStack,
  useToast,
  Box,
  Text,
  RadioGroup,
  Radio,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyPantry } from "../api";
import Layout from "../components/Layout";
import ProtectedPage from "../components/ProtectedPage";
import { useEffect, useState } from "react";


export default function Home() {
  const [pantry, setPantry] = useState();
  const { isLoading, data } = useQuery(["myPantry"], getMyPantry);
  const categories = ["과일", "채소", "정육, 계란", "수산", "우유, 유제품", "빵, 잼, 시리얼", "양념, 장류, 오일", "김치, 반찬, 젓갈, 김", "햄, 어묵, 통조림", "배달음식", "기타"] // 아이콘도 넣자



  return (
    <ProtectedPage>
      <Layout hasTabBar>
        <Box w="90%" ml="5%">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold" fontSize="1.5rem">Pantry</Text>
            <BellIcon boxSize="5" />
          </Box>
          <InputGroup marginTop="2rem" mb="2rem">
            <InputLeftElement marginLeft="0.5rem" children={<SearchIcon />} />
            <Input type="text" placeholder="Search" paddingLeft="3.5rem" borderRadius="3rem" />
          </InputGroup>
          {console.log(data?.ingredients?.results)}
          {data ? categories.map(category => {
            return (
              <>
                <Box w="100%">
                  {data?.ingredients?.results.filter(info => info.ingredient.category === category).map((info, idx) => {
                    if (idx === 0) {
                      return (
                        <>
                          <Box fontWeight="bold">{info.ingredient.category}</Box>
                          <hr />
                          <Box display="flex" mt="1rem" justifyContent="space-between">
                            <Text>{info.ingredient.name}</Text>
                            <Box display="flex">
                              <Text>{info?.date_bought ? '' : ''}</Text>
                            </Box>
                          </Box>
                        </>
                      )
                    }

                    return (
                      <>
                        <Box display="flex" justifyContent="space-between">
                          <Text>{info.ingredient.name}</Text>
                          <Box display="flex">
                            <Text></Text>
                          </Box>
                        </Box>
                      </>
                    )
                  })}
                </Box>
              </>
            )
          }) : ''}

          {/* {data? categories.map(category => {
            return(
              <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            {data?.ingredients?.results.filter(info => info.ingredient.category === category).map((info, idx) => {
              if (idx === 0) {
                return (
                  <>
                    <GridItem colSpan="3">
                      <Text marginTop="1rem" paddingBottom="1rem" borderBottom="1px solid gray">{info.ingredient.category}</Text>
                    </GridItem>

                    <GridItem w="100%" h="10rem" boxShadow="0px 0px 20px #DCDCDC">
                      <Text>{info.ingredient.name}</Text>
                    </GridItem>
                  </>
                )
              }
              return (
                <GridItem w="100%" h="10rem"  boxShadow="0px 0px 20px #DCDCDC">
                  <Text>{info.ingredient.name}</Text>
                </GridItem>
              )
            })}
              </Grid>
            )
          }) :''} */}

        </Box>
      </Layout>
    </ProtectedPage>
  );
}
