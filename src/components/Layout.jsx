import { Box, Heading, Icon, IconButton, Stack } from "@chakra-ui/react";
import {
  HiChevronLeft,
  HiOutlineUser,
  HiOutlineArchiveBox,
  HiOutlineShoppingCart,
  HiOutlineNewspaper,
} from "react-icons/hi2";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Layout({ title, canGoBack, hasTabBar, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onClick = () => navigate(-1);

  return (
    <Box w={"100%"} maxW="xl" mx={"auto"}>
      <Stack
        w={"100%"}
        maxW="xl"
        direction="row"
        justifyContent={"center"}
        alignItems={"center"}
        position="fixed"
        top={0}
        bg="white"
        px={10}
        h={20}
        textColor={"black"}
      >
        {title ? (
          <Heading
            mx={canGoBack ? "auto" : ""}
            fontWeight="bold"
            fontSize={"xl"}
          >
            {title}
          </Heading>
        ) : null}
        {canGoBack ? (
          <IconButton
            position={"absolute"}
            variant="ghost"
            left={4}
            aria-label="back"
            icon={<Icon as={HiChevronLeft} w={8} h={8} />}
            onClick={onClick}
          />
        ) : null}
      </Stack>
      <Box pt={20} pb={hasTabBar ? "24" : ""}>
        {children}
      </Box>
      {hasTabBar ? (
        <Stack
          as="nav"
          w={"100%"}
          maxW="xl"
          direction={"row"}
          justifyContent="space-between"
          borderTop={"1px"}
          borderColor={"#ACACAC"}
          position="fixed"
          bottom={0}
          px={10}
          pb={5}
          pt={3}
        >
          <Link to={{ pathname: "/" }}>
            <IconButton
              variant="ghost"
              aria-label="home"
              icon={
                <Icon
                  as={HiOutlineArchiveBox}
                  w={7}
                  h={7}
                  color={pathname === "/" ? "#FA4A0C" : "#797979"}
                />
              }
              display={"flex"}
              colorScheme="orange"
              flexDirection="column"
              alignItems={"center"}
              size="md"
            />
          </Link>
          <Link to={{ pathname: "/" }}>
            <IconButton
              variant="ghost"
              aria-label="home"
              icon={
                <Icon as={HiOutlineShoppingCart} w={7} h={7} color="#797979" />
              }
              display={"flex"}
              colorScheme="orange"
              flexDirection="column"
              alignItems={"center"}
              size="md"
            />
          </Link>
          <Link to={{ pathname: "/" }}>
            <IconButton
              variant="ghost"
              aria-label="home"
              icon={
                <Icon as={HiOutlineNewspaper} w={7} h={7} color="#797979" />
              }
              display={"flex"}
              colorScheme="orange"
              flexDirection="column"
              alignItems={"center"}
              size="md"
            />
          </Link>
          <Link to={{ pathname: "/" }}>
            <IconButton
              variant="ghost"
              aria-label="home"
              icon={
                <Icon as={HiOutlineArchiveBox} w={7} h={7} color="#797979" />
              }
              display={"flex"}
              colorScheme="orange"
              flexDirection="column"
              alignItems={"center"}
              size="md"
            />
          </Link>
          <Link to={{ pathname: "/user" }}>
            <IconButton
              variant="ghost"
              aria-label="home"
              icon={
                <Icon
                  as={HiOutlineUser}
                  w={7}
                  h={7}
                  color={pathname === "/user" ? "#FA4A0C" : "#797979"}
                />
              }
              display={"flex"}
              colorScheme="orange"
              flexDirection="column"
              alignItems={"center"}
              size="md"
            />
          </Link>
        </Stack>
      ) : null}
    </Box>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  canGoBack: PropTypes.bool,
  hasTabBar: PropTypes.bool,
  children: PropTypes.element.isRequired,
};
