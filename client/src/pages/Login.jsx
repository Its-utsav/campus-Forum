import Button from "../components/Button";
import Input from "../components/Input";

export default function LoginPage() {
  return (
    <div>
      <form>
        <Input label="email" type="email" required autoComplete="email" />
        <Input
          label="password"
          type="password"
          required
          autoComplete="password"
        />
        <Button label="Login !!" className="btn-primary" />
      </form>
    </div>
  );
}
