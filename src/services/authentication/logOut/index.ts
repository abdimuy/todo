import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";

const logOut = () => {
  return signOut(auth);
};

export default logOut;
