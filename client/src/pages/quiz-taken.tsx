import { Link, redirect, useLocation } from "react-router-dom";
import Card from "../components/Card";

export default function QuizTaken() {
  const { search } = useLocation();
  const score = new URLSearchParams(search).get("score");

  if (!score) redirect("/create-quiz");

  return (
    <Card>
      <h3 className="text-text-color font-semibold text-lg">
        Congratulations! You have completed the quiz and you scored {score}%!!
      </h3>
    </Card>
  );
}
