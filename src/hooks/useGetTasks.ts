import { useContext } from "react";
import TaskContext from "../context/Task/TaskContext";

const useGetTasks = () => {
  const { today, next, finished, isLoadingTasks } = useContext(TaskContext);
  return { today, next, finished, isLoadingTasks };
};

export default useGetTasks;
