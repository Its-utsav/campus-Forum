import { Button, Input } from "../components";

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

        <Button type="submit" className="btn-primary">
          Register
        </Button>
      </form>
    </div>
  );
}
