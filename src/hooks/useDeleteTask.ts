import { useState } from "react";
import deleteTaskStore from "../services/storage/deleteTask";
import { UseToastOptions, useToast } from "@chakra-ui/react";

const useDeleteTask = () => {
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const toastOptions: UseToastOptions = {
    title: "Tarea eliminada",
    description: "La tarea se ha eliminado correctamente",
    status: "info",
    duration: 3000,
  };

  const deleteTask = async (id: string): Promise<void> => {
    try {
      toast(toastOptions);
      await deleteTaskStore(id);
      setError("Tarea eliminada con exito");
    } catch (err) {
      setError("Error al eliminar la tarea");
    }
  };
  return { deleteTask, error };
};

export default useDeleteTask;
