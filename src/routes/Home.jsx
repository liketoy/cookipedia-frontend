import { Icon, Stack } from "@chakra-ui/react";
import FloatingButton from "../components/FloatingButton";
import Layout from "../components/Layout";
import useUser from "../lib/useUser";
import ProtectedPage from "../components/ProtectedPage";
import usePantry from "../lib/usePantry";
import { Box,Card,Divider,Text } from "@chakra-ui/react";

export default function Home() {
  const { userLoading, user, isLoggedIn } = useUser();
  const { pantryLoading, pantry, pantryIsLoggedIn } = usePantry();  
  const ingredientState = ["🤮","🙂","😋"]

  return (
    <ProtectedPage>
      <Layout title={"Pantry"} hasTabBar>
        <h1>Home</h1>
        {ingredientState.map((state,index)=>(
        <Box>
          <Text mb={"20px"} mt={"20px"}>{state}</Text>
          <Box>
            {pantry?.ingredients?.results.filter((ingredient,index)=>(ingredient.is_status===state))
            .map((ingredient,index)=>(
            
            <Card h={"80px"}>
              <Box display={"flex"} justifyContent={"space-between"} padding={7}>
                <Text>{ingredient.ingredient.name}</Text>
                <Box display={"flex"} gap={8}>
                  <Text>{ingredient.date_bought}</Text>
                  <Text>{ingredient.expiry_date}</Text>
                </Box>
              
            </Box>
            </Card>
            
          ))}
          </Box>
        <Divider />
        </Box>
        ))}
        
      </Layout>
    </ProtectedPage>
  );
}
