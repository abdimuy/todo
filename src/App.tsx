import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import TaskState from "./context/Task/TaskState";
import { Layout, PrivateRoute } from "./components";
import { Login, Register, Todo } from "./pages";

function App(): JSX.Element {
  return (
    <ChakraProvider>
      <TaskState>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute Layout={Layout} />}>
              <Route path="/" element={<Todo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskState>
    </ChakraProvider>
  );
}

export default App;
