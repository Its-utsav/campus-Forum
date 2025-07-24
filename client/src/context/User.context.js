import { createContext, useContext } from "react";

export const userContext = createContext({
  data: {
    _id: null,
    username: null,
  },
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(userContext);
};
