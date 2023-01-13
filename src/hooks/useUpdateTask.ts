import React from "react";
import { TaskUpdate } from "../services/storage/updateTask";
import updateTaskStore from "../services/storage/updateTask";
import { UseToastOptions, useToast } from "@chakra-ui/react";

const useUpdateTask = () => {
  const [error, setError] = React.useState<string>("");
  const toast = useToast();

  const toastOptions: UseToastOptions = {
    title: "Tarea actualizada",
    description: "La tarea se ha actualizado correctamente",
    status: "info",
    duration: 3000,
  };

  const updateTask = async (
    taskId: string,
    taskUpdate: TaskUpdate
  ): Promise<void> => {
    try {
      toast(toastOptions);
      await updateTaskStore(taskId, taskUpdate);
    } catch (err) {
      setError("Error al actualizar la tarea");
    }
  };

  return { updateTask, error };
};

export default useUpdateTask;
