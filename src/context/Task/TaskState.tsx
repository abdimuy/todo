import { useEffect, useReducer, useState } from "react";
import { TaskProps } from "../../pages/Todo/types";
import TaskReducer from "./TaskReducer";
import TaskContext from "./TaskContext";
import { GET_TASKS } from "../types";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../firebase";
import { getTasksStore } from "../../services/storage/getTasks";
import { addTaskStore } from "../../services/storage/addTask";
import { ResponseTask } from "../../services/storage/getTasks/getTaskStore";
import {
  signIn,
  logOut,
  signInWithGoogle,
  signUp,
} from "../../services/authentication";

const TaskState = ({ children }: { children: React.ReactNode }) => {
  const initialState: ResponseTask = {
    today: [],
    next: [],
    finished: [],
  };
  const [tasks, dispatch] = useReducer(TaskReducer, initialState);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubcribe = getTasksStore(user.uid, (tasks) => {
      dispatch({
        type: GET_TASKS,
        payload: {
          today: tasks.today,
          next: tasks.next,
          finished: tasks.finished,
        },
      });
      setIsLoadingTasks(false);
    });
    return () => unsubcribe();
  }, [user]);

  const addTask = (task: TaskProps) => {
    return new Promise((resolve, reject) => {
      resolve(addTaskStore(task));
    });
  };

  const logOutState = () => {
    return logOut().then(() => {
      setUser(null);
    });
  };

  return (
    <TaskContext.Provider
      value={{
        today: tasks.today,
        next: tasks.next,
        finished: tasks.finished,
        isLoadingTasks: isLoadingTasks,
        addTask,
        auth: {
          signUp,
          signIn,
          user,
          isLoading,
          logOut: logOutState,
          signInWithGoogle,
        },
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskState;
