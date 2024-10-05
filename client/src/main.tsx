import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./pages/auth/layout";
import "./index.css";
import Loader from "./components/Loader";
import AuthProvider from "./contexts/AuthContext";
import Header from "./components/Header";

const LoginPage = lazy(() => import("./pages/auth/login"));
const HomePage = lazy(() => import("./pages/home"));
const SignInPage = lazy(() => import("./pages/auth/signin"));
const CreateQuiz = lazy(() => import("./pages/create-quiz"));

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <AuthProvider>
      <Suspense fallback={<Loader />}>
        <Router>
          <Header />
          <div className="container px-4 md:px-0 md:w-4/5 md:mx-auto flex justify-center items-between flex-col mt-4 gap-14">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth/" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signin" element={<SignInPage />} />
              </Route>
              <Route path="/create-quiz" element={<CreateQuiz />} />
            </Routes>
          </div>
        </Router>
      </Suspense>
    </AuthProvider>
    <Toaster position="bottom-right" />
  </StrictMode>
);
