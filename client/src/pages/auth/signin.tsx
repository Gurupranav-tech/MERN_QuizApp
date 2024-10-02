import { FormEvent } from "react";
import FormInput from "../../components/FormInput";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SignInPage() {
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="text-center text-text-color text-3xl font-bold border-b-2 border-text-color pb-2">
        Sign In
      </h1>
      <form onSubmit={handleLogin} className="mt-6 grid gap-4">
        <FormInput name="Username" type="text" required />
        <FormInput name="Email" type="email" required />
        <FormInput name="Password" type="password" required />
        <motion.button
          className="bg-primary-color text-white rounded-xl py-2 text-lg font-bold"
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Sign In
        </motion.button>
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
