import { useContext } from "react";
import TaskContext from "../context/Task/TaskContext";

const useAuth = () => {
  const { auth } = useContext(TaskContext);
  return auth;
};

export default useAuth;
