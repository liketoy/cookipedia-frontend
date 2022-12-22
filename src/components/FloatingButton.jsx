import { AspectRatio, Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Icon 모양과 이동할 위치를 Props로 받는 Component
export default function FloatingButton({ children, href }) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(href);
  };
  return (
    <AspectRatio
      position={"fixed"}
      w="14"
      h="14"
      bottom="24"
      right={"calc(50% - 270px)"}
      zIndex={1}
      ratio={1}
    >
      <Button
        borderRadius={"full"}
        bg="#FA4A0C"
        colorScheme={"orange"}
        onClick={onClick}
      >
        {children}
      </Button>
    </AspectRatio>
  );
}

FloatingButton.propTypes = {
  children: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired,
};
