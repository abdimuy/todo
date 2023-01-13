import { db, firestore } from "../../../firebase";
import { TaskProps } from "../../../pages/Todo/types";
import { endOfDay } from "date-fns";
import { Timestamp } from "firebase/firestore";

export interface ResponseTask {
  today: TaskProps[];
  next: TaskProps[];
  finished: TaskProps[];
}

export const getTasksStore = (
  userId: string,
  callback: (tasks: ResponseTask) => void
) =>
  firestore.onSnapshot(
    firestore.query(
      firestore.collection(db, "Task"),
      firestore.where("idUser", "==", userId),
      firestore.where("deleted", "==", false),
      firestore.orderBy("date", "desc")
    ),
    (querySnapshot) => {
      const tasks: ResponseTask = {
        today: [],
        next: [],
        finished: [],
      };
      querySnapshot.forEach((doc) => {
        const task = { ...(doc.data() as TaskProps), id: doc.id };
        const taskDate = task.date as Timestamp;

        if (task.completed) tasks.finished.push(task);
        else if (endOfDay(new Date()) > new Date(taskDate.toDate()))
          tasks.today.push(task);
        else tasks.next.push(task);
      });
      callback(tasks);
    }
  );
