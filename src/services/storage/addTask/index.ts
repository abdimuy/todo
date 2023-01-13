import { db, firestore } from "../../../firebase";
import { TaskProps } from "../../../pages/Todo/types";

export const addTaskStore = (task: TaskProps) => {
  return firestore.addDoc(firestore.collection(db, "Task"), task);
};
