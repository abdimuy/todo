import { useState, useContext } from "react";
import TaskContext from "../context/Task/TaskContext";
import { TaskProps } from "../pages/Todo/types";
import useAuth from "./useAuth";
import { firestore } from "../firebase";
import { useToast } from "@chakra-ui/react";
import { UseToastOptions } from "@chakra-ui/react";

const useAddTask = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addTask } = useContext(TaskContext);
  const { user } = useAuth();
  const toast = useToast();

  const toastOptions: UseToastOptions = {
    title: "Tarea agregada",
    description: "La tarea se ha agregado correctamente",
    status: "success",
    duration: 3000,
  };

  const handleaAddTask = async (task: TaskProps) => {
    try {
      const copyTask = { ...task };
      copyTask.idUser = user?.uid;
      copyTask.dateCreated = firestore.Timestamp.fromDate(new Date());
      copyTask.date = firestore.Timestamp.fromDate(task.date as Date);
      copyTask.deleted = false;
      if (!validateTask(copyTask)) return;
      setIsLoading(true);
      await addTask(copyTask);
      toast(toastOptions);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const validateTask = (task: TaskProps) => {
    if (task.description === "") {
      setError("La tarea no puede estar vacía");
      return false;
    }
    return true;
  };

  return { addTask: handleaAddTask, isLoading, error };
};

export default useAddTask;
