import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

export default function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="w-full bg-primary-color-light py-4">
      <div className="container px-4 md:px-0 md:w-4/5 md:mx-auto flex items-center justify-between">
        <h1 className="text-text-color font-bold text-3xl">Quizzer</h1>
        {loading ? <></> : user ? <UserProfile /> : <AuthButtons />}
      </div>
    </header>
  );
}

function AuthButtons() {
  return (
    <ul className="flex items-center gap-6 text-text-color font-bold text-lg *:cursor-pointer">
      <li>
        <Link to="/auth/login">Login</Link>
      </li>
      <li className="bg-white px-5 py-1 rounded-full">
        <Link to="/auth/signin">Register</Link>
      </li>
    </ul>
  );
}

function UserProfile() {
  const pathname = useLocation();
  const { logout } = useAuth();

  const classes = "bg-white px-5 py-1 rounded-full";

  return (
    <ul className="*:transition-all flex items-center gap-6 text-text-color font-bold text-lg *:cursor-pointer">
      <li className={`${pathname.pathname === "/" ? classes : ""}`}>
        <Link to="/">Home</Link>
      </li>
      <li className={`${pathname.pathname === "/profile" ? classes : ""}`}>
        <Link to="/profile">Profile</Link>
      </li>
      <li className={`${pathname.pathname === "/create-quiz" ? classes : ""}`}>
        <Link to="/create-quiz">Create Quiz</Link>
      </li>
      <li>
        <p
          onClick={() => logout().then(() => toast.success("Logged out!"))}
          className="select-none"
        >
          Logout
        </p>
      </li>
    </ul>
  );
}
