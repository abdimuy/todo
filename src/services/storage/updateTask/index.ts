import { firestore, db } from "../../../firebase";
import { TaskProps } from "../../../pages/Todo/types";

export interface TaskUpdate {
  [key: string]: string | boolean;
}

const deleteTaskStore = (id: string, taskUpdate: TaskUpdate): Promise<void> => {
  return firestore.updateDoc(firestore.doc(db, "Task", id), taskUpdate);
};

export default deleteTaskStore;
