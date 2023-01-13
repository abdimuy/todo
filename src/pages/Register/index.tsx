import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { validateRegisterUser } from "../../utils/validations";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { UserRegister } from "./types";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [user, setUser] = useState<UserRegister>({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState<UserRegister>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (user: UserRegister): Promise<void> => {
    try {
      setIsLoading(true);
      const errors = validateRegisterUser(user);
      setError(errors);
      if (Object.values(errors).every((error) => error === "")) {
        await signUp(user.email, user.password);
        toast({
          title: "Registro exitoso",
          description: "Bienvenido a la aplicación",
          status: "success",
          duration: 5000,
        });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Card maxWidth="450px" width="100%">
        <CardBody>
          <Card size="lg" variant="outline" maxWidth="450px" width="100%">
            <CardHeader>
              <Heading as="h2" fontSize="3xl">
                Registro
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack display="flex" flexDirection="column" gap="20px">
                <Button gap="8px">
                  <FcGoogle size="20px" />
                  Registrar con Google
                </Button>
                <Divider />
                <FormControl isInvalid={error.email !== ""}>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    onChange={handleInputChange}
                  />
                  {error.email && (
                    <FormErrorMessage>{error.email}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={error.password !== ""}>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    onChange={handleInputChange}
                  />
                  {!error.password ? (
                    <FormHelperText>
                      La contraseña debe tener al menos 8 caracteres
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>{error.password}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={error.repeatPassword !== ""}>
                  <FormLabel>Repetir contraseña</FormLabel>
                  <Input
                    name="repeatPassword"
                    type="password"
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit(user);
                      }
                    }}
                  />
                  {error.repeatPassword && (
                    <FormErrorMessage>{error.repeatPassword}</FormErrorMessage>
                  )}
                </FormControl>
                <Button
                  colorScheme="blue"
                  onClick={() => handleSubmit(user)}
                  isLoading={isLoading}
                  loadingText="Registrando..."
                >
                  Registrar
                </Button>
              </Stack>
            </CardBody>
            <CardFooter justifyContent="center">
              <Button variant="link">
                <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
              </Button>
            </CardFooter>
          </Card>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Register;
