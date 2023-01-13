import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
} from "@chakra-ui/react";

// Mostrar mensaje que se han completado todas las tareas y puede agregar una nueva
const AlertListEmpty = () => {
  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="250px"
      width="100%"
    >
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        rounded={20}
        width="100%"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          ¡Haz completado todas tus tareas!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Puedes agregar una nueva tarea haciendo click en el botón arriba a la
          derecha
        </AlertDescription>
      </Alert>
    </Container>
  );
};

export default AlertListEmpty;
