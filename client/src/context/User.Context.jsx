import { createContext, useContext, useEffect, useState } from "react";

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

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const [token, setToken] = useState(null);

  const logout = () => setData(null);

  const login = async (data) => {
    try {
      const res = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resBody = await res.json();
      setData({ _id: resBody.data._id, username: resBody.data.username });
      return resBody;
    } catch (error) {
      console.error(error.message, error);
    }
  };
  useEffect(() => {}, []);
  return (
    <userContext.Provider value={{ data, login, logout }}>
      {children}
    </userContext.Provider>
  );
};
