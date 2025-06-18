import React from "react";
import { FloatButton as FloatButtonType } from "../misc/types";
import Button from "./form/Button";

const FloatButton = ({
  onClick,
  top = "auto",
  right = "auto",
  bottom = "auto",
  left = "auto",
  children,
}: FloatButtonType): React.ReactNode => {
  return (
    <Button
      variant="main"
      className="float-button p-2 flex-center border-0 rounded-circle position-absolute"
      onClick={onClick}
      style={{ top, right, bottom, left }}
    >
      {children}
    </Button>
  );
};

export default FloatButton;
