import { Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function FormError({ errorMessage, position = "right" }) {
  return (
    <Text color={"red"} fontWeight="medium" fontSize="sm" textAlign={position}>
      {errorMessage}
    </Text>
  );
}

FormError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  position: PropTypes.oneOf(["left", "center", "right"]),
};
