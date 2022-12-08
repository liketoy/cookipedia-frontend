import { Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function FormError({ errorMessage }) {
  return (
    <Text color={"red"} fontWeight="medium" fontSize="sm" textAlign={"right"}>
      {errorMessage}
    </Text>
  );
}

FormError.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
