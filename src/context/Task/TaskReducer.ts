import { GET_TASKS } from "../types";

export default (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS:
      return { ...state, ...payload };
  }
};
