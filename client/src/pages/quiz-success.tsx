import { useLocation, redirect, Link } from "react-router-dom";
import Requests from "../lib/Requests";
import Card from "../components/Card";
import toast from "react-hot-toast";

export default function QuizSuccess() {
  const { search } = useLocation();
  const slug = new URLSearchParams(search).get("url_slug");

  if (!slug) redirect("/create-quiz");

  return (
    <Card>
      <h3 className="text-text-color font-semibold text-lg">
        Quiz has been created successfully! To take the quiz or share the quiz
        use the follow link:
      </h3>
      <Link to={`/${slug}`} className="text-blue-500 break-words underline">
        {Requests.PROD_URL}/{slug}
      </Link>
      <h3 className="text-text-color font-semibold text-lg">
        or share the quiz code{" "}
        <span
          className="text-blue-500 underline cursor-pointer"
          onClick={async () => {
            if (!slug) return;
            await navigator.clipboard.writeText(slug);
            toast.success("Copied the quiz code!");
          }}
        >
          {slug}
        </span>
      </h3>
    </Card>
  );
}
