import { FormEvent, useState } from "react";
import FormInput from "../../components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import Button from "../../components/Button";

export default function LoginPage() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const { error, login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (key: string) => (e: string) =>
    setFormState((s) => ({ ...s, [key]: e }));

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (await login(formState.email, formState.password)) {
      toast.success(`Logged in with ${formState.email}`);
      navigate("/");
    }
  };

  return (
    <>
      <h1 className="text-center text-text-color text-3xl font-bold border-b-2 border-text-color pb-2">
        Login
      </h1>
      <p className="mt-2 text-red-500 break-words">{error}</p>
      <form onSubmit={handleLogin} className="mt-4 grid gap-4">
        <FormInput
          value={formState.email}
          onChange={handleChange("email")}
          name="Email"
          type="email"
          required
        />
        <FormInput
          value={formState.password}
          onChange={handleChange("password")}
          name="Password"
          type="password"
          required
        />
        <Button type="primary" buttonType="submit" animated>
          Login
        </Button>
      </form>
      <div className="mt-4 flex items-center gap-1">
        <span className="flex-1 bg-text-color block h-[2px]"></span>
        <span>OR</span>
        <span className="flex-1 bg-text-color block h-[2px]"></span>
      </div>
      <p className="mt-2 text-gray-500">
        Don't have an account?{" "}
        <Link to="/auth/signin" className="text-blue-400 underline">
          Sign In
        </Link>
      </p>
    </>
  );
}
