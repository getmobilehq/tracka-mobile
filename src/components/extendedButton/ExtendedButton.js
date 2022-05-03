import React from "react";
import { Button } from "@windmill/react-ui";
import Spinner from "../spinner";

const ExtendedButton = ({ loading, children, ...rest }) => {
  return (
    <Button {...rest}>
      {loading && <Spinner />} {children}
    </Button>
  );
};

export default ExtendedButton;
