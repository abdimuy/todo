import { UserRegister } from "../../pages/Register/types";

const validateRegisterUser = (user: User) => {
  const errors: User = {
    email: "",
    password: "",
    repeatPassword: "",
  };

  if (user.email.trim() === "") {
    errors.email = "El email es obligatorio";
  }

  if (user.password.trim() === "") {
    errors.password = "La contraseña es obligatoria";
  }

  if (user.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  if (user.repeatPassword.trim() === "") {
    errors.repeatPassword = "La contraseña es obligatoria";
  }

  if (user.password !== user.repeatPassword) {
    errors.repeatPassword = "Las contraseñas no coinciden";
  }

  return errors;
};

export default validateRegisterUser;
