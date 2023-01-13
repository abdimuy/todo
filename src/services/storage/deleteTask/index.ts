import { firestore, db } from "../../../firebase";

const deleteTaskStore = (id: string) => {
  return firestore.updateDoc(firestore.doc(db, "Task", id), {
    deleted: true,
  });
};

export default deleteTaskStore;
