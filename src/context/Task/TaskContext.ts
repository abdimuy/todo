import { User, UserCredential } from "firebase/auth";
import { createContext } from "react";
import { TaskProps } from "../../pages/Todo/types";

export interface TaskContextProps {
  today: TaskProps[];
  next: TaskProps[];
  finished: TaskProps[];
  addTask: (task: TaskProps) => void;
  isLoadingTasks: boolean;
  auth: {
    signUp: (email: string, password: string) => void;
    signIn: (email: string, password: string) => void;
    user: User | null;
    isLoading: boolean;
    logOut: () => void;
    signInWithGoogle: () => Promise<UserCredential>;
  };
}

const TaskContext = createContext<TaskContextProps>({
  today: [],
  next: [],
  finished: [],
  isLoadingTasks: true,
  addTask: (task: TaskProps) => {},
  auth: {
    signUp: (email: string, password: string) => {},
    signIn: (email: string, password: string) => {},
    user: null,
    isLoading: true,
    logOut: () => {},
    signInWithGoogle: () => new Promise(() => {}),
  },
});

export default TaskContext;
