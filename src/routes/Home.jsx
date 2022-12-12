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
  InputGroup,
  InputLeftElement
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyPantry } from "../api";
import Layout from "../components/Layout";
import ProtectedPage from "../components/ProtectedPage";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

export default function Home() {
  const [pantry, setPantry] = useState();
  const { isLoading, data} = useQuery(["myPantry"], getMyPantry);


  return (
    <ProtectedPage>
      <Layout hasTabBar>
        <>
         {data? console.log('zz',data): console.log("로딩중")}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold" fontSize="1.5rem">Pantry</Text>
            <BellIcon boxSize="5" />
          </Box>
          <InputGroup marginTop="2rem">
            <InputLeftElement marginLeft="0.5rem" children={<SearchIcon />} />
            <Input type="text" placeholder="Search" paddingLeft="3.5rem" borderRadius="3rem" />
          </InputGroup>

          <VStack>
            <Text>ㅋㅋ</Text>
            <HStack>
            </HStack>
          </VStack>
        </>
      </Layout>
    </ProtectedPage>
  );
}
