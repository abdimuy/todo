import React, { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "./types";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [user, setUser] = React.useState<UserLogin>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { signIn, signInWithGoogle } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (user: UserLogin): Promise<void> => {
    try {
      setIsLoading(true);
      await signIn(user.email, user.password);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a la aplicación",
        status: "success",
        duration: 3000,
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message);
      console.log(err);
    }
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a la aplicación",
        status: "success",
        duration: 3000,
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message);
      console.log(err);
    }
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
                Inicio de sesión
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack display="flex" flexDirection="column" gap="20px">
                <Button gap="8px" onClick={loginWithGoogle}>
                  <FcGoogle size="20px" /> Iniciar sesión con Google
                </Button>
                <Divider />
                <FormControl>
                  <FormLabel>Correo electrónico</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Contraseña</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit(user);
                      }
                    }}
                  />
                </FormControl>
                {error !== "" && (
                  <Alert status="error">
                    <AlertIcon />
                    {/* <AlertTitle>Error</AlertTitle> */}
                    <AlertDescription>
                      El correo electrónico o la contraseña son incorrectos
                    </AlertDescription>
                  </Alert>
                )}
                <Button
                  colorScheme="blue"
                  onClick={() => handleSubmit(user)}
                  isLoading={isLoading}
                  loadingText={"Ingresando..."}
                >
                  Ingresar
                </Button>
              </Stack>
            </CardBody>
            <CardFooter justifyContent="center">
              <Button variant="link">
                <Link to="/register">¿No tienes una cuenta? Regístrate</Link>
              </Button>
            </CardFooter>
          </Card>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default Login;
