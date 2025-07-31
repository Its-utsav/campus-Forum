import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useRouter } from "../context/Router.context";
import authService from "../services/auth.services";
import { useAuth } from "../context/User.context";

export default function LoginPage() {
  const { navigate } = useRouter();
  const { data, login } = useAuth();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService
        .login(userData)
        .then((data) => login({ _id: data._id, username: data.username }))
        .then(() => navigate("/"))
        .catch((reason) => setMessage(reason.message));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="email"
          type="email"
          required
          autoComplete="email"
          value={userData.email}
          onChange={(e) =>
            setUserData((prevData) => ({ ...prevData, email: e.target.value }))
          }
        />
        <Input
          label="password"
          type="password"
          required
          autoComplete="password"
          value={userData.password}
          onChange={(e) =>
            setUserData((prevData) => ({
              ...prevData,
              password: e.target.value,
            }))
          }
        />

        <Button className="btn-primary" type="submit">
          Login !!
        </Button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
