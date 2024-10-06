import toast from "react-hot-toast";
import Card, { CardBody, CardHeader } from "../components/Card";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Requests from "../lib/Requests";

export default function Profile() {
  const { loading, user, refresh } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const modified = useRef(false);

  useEffect(() => {
    setUsername(user?.username || "");
    setEmail(user?.email || "");
  }, [user?.username, user?.email]);

  const handleUpdateProfile = () => {
    Requests.POST(
      "/auth/update",
      {
        username,
        email,
      },
      {}
    )
      .then(() => refresh())
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  if (loading) return <p>Loading...</p>;

  if (!user) {
    toast.error("Not autenticated");
    navigate("/auth/login");
  }

  return (
    <>
      <Card>
        <CardHeader>User Profile</CardHeader>
        <CardBody>
          <div className="grid gap-5">
            <FormInput
              type="text"
              name="Username"
              value={username}
              onChange={(e) => {
                setUsername(e);
                modified.current = e !== user?.username;
              }}
            />
            <FormInput
              type="email"
              name="Email"
              value={email}
              onChange={(e) => {
                setEmail(e);
                modified.current = e !== user?.email;
              }}
            />
            <Button
              type="primary"
              className="disabled:bg-gray-500"
              disabled={!modified.current}
              onClick={handleUpdateProfile}
            >
              Update Profile
            </Button>
            <div className="flex flex-col sm:flex-row *:flex-1 gap-5">
              <Button type="primary" onClick={() => navigate("/profile/stat")}>
                Quizes hosted by me
              </Button>
              <Button
                type="primary"
                onClick={() => navigate("/profile/history")}
              >
                Quizes take by me
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
