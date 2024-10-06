import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Requests from "../lib/Requests";
import { Choice, Question, Quiz, Type } from "../lib/definitions";
import Card, { CardBody, CardHeader } from "../components/Card";
import { QuestionsViewer } from "../components/QuestionViewer";
import useScreenType from "../lib/useScreenType";
import Button from "../components/Button";

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz>();
  const [loading, setLoading] = useState(false);
  const [selectedQuestionNumber, setSelectedQuestionNumber] = useState(1);
  const [correctMatrix, setCorrectMatrix] = useState<boolean[]>([]);

  useEffect(() => {
    if (!id) {
      toast.error("Invalid quiz id");
      navigate("/");
      return;
    }

    setLoading(true);

    Requests.GET(`/quiz/${id}`, {})
      .then((d) => {
        setQuiz(d.data.data);
        let q = d.data.data as Quiz;
        setCorrectMatrix(new Array(q.questions.length).fill(false));
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !quiz) return <p>Loading...</p>;

  const handleChangeQuestionNumber = (idx: number) => {
    setSelectedQuestionNumber(idx + 1);
  };

  const questionPosition = () => {
    if (selectedQuestionNumber - 1 === 0) return "start";
    else if (selectedQuestionNumber === quiz.questions.length) return "end";
    else return undefined;
  };

  const handleChangeQuestion = (
    idx: number,
    choice: Choice,
    dirn: "f" | "b"
  ) => {
    setSelectedQuestionNumber(idx + 1);
    setCorrectMatrix((m) => {
      let ind = dirn === "f" ? idx - 1 : idx + 1;
      if (m[ind] && choice.choice === "") return m;
      const matrix = [...m];
      const correct_choice = quiz.questions[ind].correct_choice;
      matrix[ind] = correct_choice.choice === choice.choice;
      return matrix;
    });
  };

  const handleSubmitQuiz = async (correctChoice: Choice) => {
    if (
      correctChoice.choice ===
      quiz.questions[quiz.questions.length - 1].correct_choice.choice
    ) {
      setCorrectMatrix((matrix) => {
        matrix[matrix.length - 1] = true;
        return matrix;
      });
    } else {
      setCorrectMatrix((matrix) => {
        matrix[matrix.length - 1] = false;
        return matrix;
      });
    }

    const score =
      (correctMatrix.reduce((prev, el) => prev + (el ? 1 : 0), 0) /
        correctMatrix.length) *
      100;

    try {
      await Requests.POST(
        "/quiz/quiz-taken",
        {
          quiz_id: quiz.id,
          score,
        },
        {}
      );

      const params = new URLSearchParams();
      params.set("score", score.toString());
      navigate(`/quiz-taken?${params.toString()}`);
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="grid gap-10 mt-2">
      <Card>
        <h1 className="text-center font-bold text-3xl">{quiz.title}</h1>
      </Card>
      <QuestionsViewer
        questions={quiz.questions}
        changeQuestionNumber={handleChangeQuestionNumber}
        viewer
      />
      <QuestionAttempter
        qNumber={selectedQuestionNumber}
        question={quiz.questions[selectedQuestionNumber - 1]}
        pos={questionPosition()}
        questionChange={handleChangeQuestion}
        answered={correctMatrix[selectedQuestionNumber - 1]}
        submitQuiz={handleSubmitQuiz}
      />
    </div>
  );
}

type QAProps = {
  qNumber: number;
  question: Question;
  pos?: "start" | "end";
  answered?: boolean;
  questionChange: (idx: number, chosenChoice: Choice, dirn: "f" | "b") => void;
  submitQuiz: (correctChoice: Choice) => void;
};

function QuestionAttempter({
  qNumber,
  question,
  pos,
  questionChange,
  answered = false,
  submitQuiz,
}: QAProps) {
  const [correctChoice, setCorrectChoice] = useState<Choice>(() => {
    if (answered) return question.correct_choice;
    return {
      choice: "",
      type: Type.text,
    };
  });
  const screenType = useScreenType();

  useEffect(() => {
    if (answered) return setCorrectChoice(question.correct_choice);
    setCorrectChoice({
      choice: "",
      type: Type.text,
    });
  }, [qNumber]);

  const handleIsAnswer = (idx: number) => () => {
    setCorrectChoice(question.choices[idx]);
  };

  const handleQuestionChange = (_pos: "back" | "forward") => () => {
    if (_pos === "forward" && pos === "end") {
      submitQuiz(correctChoice);
      return;
    }

    questionChange(
      _pos === "forward" ? qNumber : qNumber - 2,
      correctChoice,
      _pos[0] as any
    );
  };

  return (
    <Card>
      <CardHeader>Question #{qNumber}</CardHeader>
      <CardBody>
        <div className="grid gap-4">
          <p className="text-center font-semibold text-lg">
            {question.statement}
          </p>
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                <th className="border-b border-text-color p-2">Select</th>
                <th className="border-b border-text-color p-2">Choice</th>
              </tr>
              {question.choices.map((choice, idx) => (
                <tr key={idx}>
                  <td className="p-2 border-b border-text-color">
                    <input
                      type="radio"
                      name="is-answer"
                      checked={choice.choice === correctChoice.choice}
                      onChange={handleIsAnswer(idx)}
                    />
                  </td>
                  <td className="p-2 border-b border-text-color">
                    {screenType === "desktop"
                      ? `${choice.choice.substring(0, 45)}${
                          choice.choice.length >= 15 ? "..." : ""
                        }`
                      : `${choice.choice.substring(0, 15)}${
                          choice.choice.length >= 15 ? "..." : ""
                        }`}
                  </td>
                </tr>
              ))}
            </thead>
          </table>
          <div className="flex *:flex-1 gap-5 flex-col sm:flex-row">
            <Button
              disabled={pos === "start"}
              className="disabled:bg-gray-500"
              type="primary"
              onClick={handleQuestionChange("back")}
            >
              Prev
            </Button>
            <Button
              className="disabled:bg-gray-500"
              type="primary"
              onClick={handleQuestionChange("forward")}
            >
              {pos === "end" ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
