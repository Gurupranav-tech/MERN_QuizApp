import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import "./component-styles.css";
import useScreenType from "../lib/useScreenType";

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
  const screenType = useScreenType();
  const [open, setOpen] = useState(false);

  const classes =
    screenType === "desktop" ? "bg-white px-5 py-1 rounded-full" : "";

  const handleClose = () => setOpen(false);

  return (
    <>
      <GiHamburgerMenu
        className={`text-text-color ${
          screenType === "mobile" ? "block" : "hidden"
        }`}
        onClick={() => setOpen(true)}
      />
      <ul
        className={`${
          screenType === "desktop"
            ? "header-user-profile-big"
            : "header-user-profile-small"
        } transition-all ${
          screenType === "mobile" && open ? "header-user-profile-open" : ""
        }`}
      >
        <li
          onClick={handleClose}
          className={`${pathname.pathname === "/" ? classes : ""}`}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          onClick={handleClose}
          className={`${
            pathname.pathname.startsWith("/profile") ? classes : ""
          }`}
        >
          <Link to="/profile">Profile</Link>
        </li>
        <li
          onClick={handleClose}
          className={`${
            pathname.pathname.startsWith("/create-quiz") ? classes : ""
          }`}
        >
          <Link to="/create-quiz">Create Quiz</Link>
        </li>
        <li onClick={handleClose}>
          <p
            onClick={() => logout().then(() => toast.success("Logged out!"))}
            className="select-none"
          >
            Logout
          </p>
        </li>
        {screenType === "mobile" && (
          <li onClick={handleClose}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-3xl"
              width="3rem"
              height="3rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M401.4 224h-214l83-79.4c11.9-12.5 11.9-32.7 0-45.2s-31.2-12.5-43.2 0L89 233.4c-6 5.8-9 13.7-9 22.4v.4c0 8.7 3 16.6 9 22.4l138.1 134c12 12.5 31.3 12.5 43.2 0 11.9-12.5 11.9-32.7 0-45.2l-83-79.4h214c16.9 0 30.6-14.3 30.6-32 .1-18-13.6-32-30.5-32z"></path>
            </svg>
            Back
          </li>
        )}
      </ul>
    </>
  );
}
