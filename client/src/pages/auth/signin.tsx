import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import Requests from "../../lib/Requests";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function SignInPage() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (key: string) => (e: string) =>
    setFormState((s) => ({ ...s, [key]: e }));

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await Requests.POST("/auth/signin", formState, {});
      toast.success(`Created an account successfully. Please log in.`, {
        duration: 5000,
      });
      navigate("/auth/login");
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  return (
    <>
      <h1 className="text-center text-text-color text-3xl font-bold border-b-2 border-text-color pb-2">
        Sign In
      </h1>
      <p className="mt-2 text-red-500 break-words">{error}</p>
      <form onSubmit={handleLogin} className="mt-4 grid gap-4">
        <FormInput
          value={formState.username}
          onChange={handleChange("username")}
          name="Username"
          type="text"
          required
        />
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
          Sign In
        </Button>
      </form>
      <div className="mt-4 flex items-center gap-1">
        <span className="flex-1 bg-text-color block h-[2px]"></span>
        <span>OR</span>
        <span className="flex-1 bg-text-color block h-[2px]"></span>
      </div>
      <p className="mt-2 text-gray-500">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-blue-400 underline">
          Login
        </Link>
      </p>
    </>
  );
}
