import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export default signUp;
