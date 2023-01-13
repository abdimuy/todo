import React from "react";
import "./styles.css";
import { useColorMode } from "@chakra-ui/react";

const Spinner = () => {
  const { colorMode } = useColorMode();
  return (
    <div className={`loader ${colorMode === "dark" && "loader-dark"}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Spinner;
