import { useEffect } from "react";
import Header from "./components/Header";
import { useAuth } from "./context/User.Context";

function App() {
  const { data, login, logout } = useAuth();
  console.log(data);
  useEffect(() => {}, []);
  return (
    <>
      <Header />
    </>
  );
}

export default App;
