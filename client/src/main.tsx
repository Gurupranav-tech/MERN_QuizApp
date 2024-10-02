import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./pages/auth/layout";
import "./index.css";
import Loader from "./components/Loader";

const LoginPage = lazy(() => import("./pages/auth/login"));
const HomePage = lazy(() => import("./pages/home"));
const SignInPage = lazy(() => import("./pages/auth/signin"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signin" element={<SignInPage />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  </StrictMode>
);
