import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { TaskProps } from "../../pages/Todo/types";
import useAddTask from "../../hooks/useAddTask";
import { AddIcon } from "@chakra-ui/icons";
import {
  format,
  addHours,
  formatDistanceToNowStrict,
  startOfDay,
  isSameDay,
} from "date-fns";
import { es } from "date-fns/locale";

const initialState: TaskProps = {
  description: "",
  completed: false,
  date: new Date(),
};

const AddTask = () => {
  const { addTask, error, isLoading } = useAddTask();
  const [newTask, setNewTask] = useState<TaskProps>(initialState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "date") {
      const newDate = addHours(new Date(event.target.value), 6);
      setNewTask({
        ...newTask,
        [event.target.name]: newDate,
      });
      return;
    }
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  const handleAddTask = (task: TaskProps) => {
    addTask(task).then(() => {
      setNewTask(initialState);
    });
  };

  return (
    <Stack>
      <FormLabel marginY="0px" marginX="10px">
        Nueva Tarea
      </FormLabel>
      <Stack direction="row">
        <FormControl>
          <Input
            placeholder="Ingresa una nueva tarea aquí"
            value={newTask.description}
            onChange={handleInputChange}
            name="description"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAddTask(newTask);
              }
            }}
          />
        </FormControl>
        <InputGroup gap="8px" width="-webkit-fit-content">
          <Input
            type="date"
            onChange={handleInputChange}
            name="date"
            value={format(newTask.date as Date, "yyyy-MM-dd")}
            paddingRight="90px"
          />
          <InputRightElement width="100px">
            <Tag colorScheme="cyan">
              {isSameDay(
                new Date((newTask.date as Date) || ""),
                startOfDay(new Date())
              )
                ? "Hoy"
                : formatDistanceToNowStrict(new Date(newTask.date as Date), {
                    addSuffix: true,
                    locale: es,
                    roundingMethod: "ceil",
                  })}
            </Tag>
          </InputRightElement>
        </InputGroup>
        <Button
          colorScheme="green"
          onClick={() => handleAddTask(newTask)}
          gap="8px"
          justifyContent="center"
          alignItems="center"
          paddingX="30px"
          isLoading={isLoading}
          disabled={newTask.description === ""}
        >
          <AddIcon />
          <Text marginBottom="3px">Agregar</Text>
        </Button>
      </Stack>
    </Stack>
  );
};

export default AddTask;
