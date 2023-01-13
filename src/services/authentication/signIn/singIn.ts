import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
