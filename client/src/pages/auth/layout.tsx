import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="bg-primary-color absolute top-0 left-0 w-screen h-screen grid place-items-center drop-shadow-2xl">
      <div className="bg-white py-4 px-6 rounded-xl sm:min-w-96">
        <Outlet />
      </div>
    </div>
  );
}
