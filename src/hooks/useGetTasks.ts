import { useContext } from "react";
import TaskContext from "../context/Task/TaskContext";

const useGetTasks = () => {
  const { getTasks, today, next, finished, isLoadingTasks } =
    useContext(TaskContext);
  return { getTasks, today, next, finished, isLoadingTasks };
};

export default useGetTasks;
