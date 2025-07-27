import Button from "../components/Button";
import Input from "../components/Input";

export default function Register() {
  return (
    <div>
      <form>
        <Input label="username" type="text" required autoComplete="username" />
        <Input label="email" type="email" required autoComplete="email" />
        <Input
          label="password"
          type="password"
          autoComplete="password"
          required
        />
        <Button label="Register !!" className="btn-primary" />
      </form>
    </div>
  );
}
