import { useState } from "react";
import { userContext } from "../context/User.context";

export const UserProvider = ({ children }) => {
  const [data, setData] = useState(null);

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

  return (
    <userContext.Provider value={{ data, login, logout }}>
      {children}
    </userContext.Provider>
  );
};
