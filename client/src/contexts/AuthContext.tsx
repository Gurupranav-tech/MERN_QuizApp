import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../lib/definitions";
import Requests from "../lib/Requests";

type ContextType = {
  user?: User;
  error: string;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  refresh: () => void;
};

type Props = {
  children: React.ReactNode;
};

const context = createContext<ContextType>({} as any);

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await Requests.GET("/auth/logout", {});
      return true;
    } catch {
      return false;
    } finally {
      setLoading(false);
      setError("");
      setUser(undefined);
    }
  };

  const refresh = () => {
    setLoading(true);
    Requests.GET("/auth/me", {})
      .then((d) => d.data)
      .then((d) => setUser(d.data))
      .catch(() => null)
      .finally(() => setLoading(false));
  };

  const values: ContextType = {
    user,
    error,
    loading,

    login,
    logout,
    refresh,
  };

  return <context.Provider value={values}>{children}</context.Provider>;
}

export function useAuth() {
  return useContext(context);
}
