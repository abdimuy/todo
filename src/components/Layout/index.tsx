import React from "react";
import { LayoutProps } from "./types";
import {
  Container,
  Heading,
  IconButton,
  Avatar,
  Stack,
  Card,
  CardBody,
  Tooltip,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/color-mode";
import useAuth from "../../hooks/useAuth";
import { MdExitToApp } from "react-icons/md";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { user, logOut } = useAuth();

  const showIcon =
    colorMode === "light" ? (
      <IconButton
        onClick={toggleColorMode}
        aria-label="Oscuro"
        icon={<MoonIcon />}
      />
    ) : (
      <IconButton
        onClick={toggleColorMode}
        aria-label="Claro"
        icon={<SunIcon />}
      />
    );

  return (
    <Stack maxW="100%" gap="15px" alignItems="center">
      <Container
        display="flex"
        maxW="100%"
        justifyContent="space-between"
        padding="1.5"
      >
        <>
          <Heading>Todo App</Heading>
          <Stack direction="row" alignItems="center">
            <Tooltip
              label={colorMode === "light" ? "Modo oscuro" : "Modo claro"}
            >
              {showIcon}
            </Tooltip>
            <Tooltip label="Cerrar Sesión">
              <IconButton
                colorScheme="gray"
                variant="ghost"
                aria-label="Exit"
                icon={<MdExitToApp size="25px" />}
                onClick={logOut}
              />
            </Tooltip>
            <Card
              direction="row"
              gap="8px"
              alignItems="center"
              paddingX="12px"
              paddingY="5px"
              variant="filled"
              borderRadius="xl"
            >
              <Heading size="sm">{user?.email}</Heading>
              <Avatar
                size="sm"
                name={user?.email || undefined}
                src={user?.photoURL || undefined}
              />
            </Card>
          </Stack>
        </>
      </Container>
      <Container maxW="4xl" padding="1.5">
        {children}
      </Container>
    </Stack>
  );
};

export default Layout;
