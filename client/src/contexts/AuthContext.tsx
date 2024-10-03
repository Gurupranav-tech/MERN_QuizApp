import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../lib/definitions";
import Requests from "../lib/Requests";

type ContextType = {
  user?: User;
  error: string;
  login: (email: string, password: string) => Promise<boolean>;
};

type Props = {
  children: React.ReactNode;
};

const context = createContext<ContextType>({} as any);

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");

  useEffect(() => {
    Requests.GET("/auth/me", {})
      .then((d) => d.data)
      .then((d) => setUser(d))
      .catch(() => null);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = (
        await Requests.POST(
          "/auth/login",
          {
            email,
            password,
          },
          {}
        )
      ).data;
      if (!data && !data.data) {
        setUser(undefined);
        setError(data.error);
        return false;
      }

      setUser(data.data);
      setError(error);
      return true;
    } catch (error: any) {
      setError(
        error.response.data.error ||
          "Please make sure all the fields entered are correct"
      );
      return false;
    }
  };

  const values: ContextType = {
    user,
    error,
    login,
  };

  return <context.Provider value={values}>{children}</context.Provider>;
}

export function useAuth() {
  return useContext(context);
}
