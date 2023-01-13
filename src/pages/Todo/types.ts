import { Timestamp } from "firebase/firestore";

export interface TodoProps {
  today: TaskProps[];
  next: TaskProps[];
}

export interface TaskProps {
  id?: string;
  idUser?: string;
  description: string;
  completed: boolean;
  date: Timestamp | Date;
  dateCreated?: Timestamp;
  deleted?: boolean;
}
