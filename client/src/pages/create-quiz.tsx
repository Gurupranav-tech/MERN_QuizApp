import { useLayoutEffect, useMemo, useState } from "react";
import { Choice, Question, Type } from "../lib/definitions";
import { motion } from "framer-motion";
import Card, { CardBody, CardHeader } from "../components/Card";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import useScreenType from "../lib/useScreenType";

type OnlyQuestion = Omit<Question, "id" | "quiz">;

export default function CreateQuiz() {
  const [questions, setQuestions] = useState<OnlyQuestion[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number>(
    questions.length + 1
  );
  const selectedQuestion = useMemo(() => {
    if (selectedNumber - 1 >= questions.length) return undefined;
    return questions[selectedNumber - 1];
  }, [selectedNumber]);

  const addQuestion = (question: OnlyQuestion, idx?: number) => {
    if (idx && idx - 1 < questions.length) {
      setQuestions((qs) => {
        qs[idx - 1] = question;
        return qs;
      });
      setSelectedNumber(idx + 1);
    } else {
      setQuestions((q) => [...q, question]);
      setSelectedNumber(selectedNumber + 1);
    }
  };

  const deleteQuestion = (idx: number) => {
    if (idx - 1 >= questions.length) return;
    setQuestions((q) => q.filter((_, i) => i !== idx - 1));
    toast.success(`Delete the question`);
  };

  const handleChangeQuestionNumber = (idx: number) => {
    setSelectedNumber(idx + 1);
  };

  return (
    <section className="mt-2 grid gap-10">
      <QuestionsViewer
        changeQuestionNumber={handleChangeQuestionNumber}
        questions={questions}
      />
      <div className="w-full flex justify-center">
        <QuestionCreator
          question={selectedQuestion}
          qNumber={selectedNumber}
          addQuestion={addQuestion}
          deleteQuestion={deleteQuestion}
        />
      </div>
    </section>
  );
}

type QCProps = {
  qNumber: number;
  question?: OnlyQuestion;
  addQuestion: (question: OnlyQuestion, idx?: number) => void;
  deleteQuestion: (idx: number) => void;
};

function QuestionCreator({
  qNumber,
  addQuestion,
  question,
  deleteQuestion,
}: QCProps) {
  const [statement, setStatement] = useState(() => {
    if (question) return question.statement;
    return "";
  });
  const [choices, setChoices] = useState<Choice[]>(() => {
    if (question) return question.choices;
    return [];
  });
  const [choice, setChoice] = useState<Choice>({
    choice: "",
    type: Type.text,
  });
  const [correctChoice, setCorrectChoice] = useState<Choice>(() => {
    if (question) return question.correct_choice;
    return {
      choice: "",
      type: Type.text,
    };
  });
  const screenType = useScreenType();

  useLayoutEffect(() => {
    setStatement(() => {
      if (question) return question.statement;
      return "";
    });
    setChoices(() => {
      if (question) return question.choices;
      return [];
    });
    setCorrectChoice(() => {
      if (question) return question.correct_choice;
      return {
        choice: "",
        type: Type.text,
      };
    });
  }, [question]);

  const handleAddChoice = () => {
    if (!choice.choice) return toast.error("Cannot add empty choice!");
    setChoices((c) => [...c, choice]);
    setChoice({ choice: "", type: Type.text });
  };

  const handleDeleteChoice = (idx: number) => () => {
    setChoices((c) => c.filter((_, id) => idx !== id));
  };

  const handleAddQuestion = () => {
    if (statement === "" || choices.length < 2 || correctChoice.choice === "")
      return toast.error(
        "Invalid question. Please fill in all the fields properly"
      );

    addQuestion(
      {
        statement,
        choices,
        correct_choice: correctChoice,
      },
      qNumber
    );
    resetQuestion();
  };

  const handleIsAnswer = (idx: number) => () => {
    setCorrectChoice(choices[idx]);
  };

  const handleDeleteQuestion = () => {
    resetQuestion();
    deleteQuestion(qNumber);
  };

  const resetQuestion = () => {
    setChoice({ choice: "", type: Type.text });
    setChoices([]);
    setStatement("");
    setCorrectChoice({
      choice: "",
      type: Type.text,
    });
  };

  return (
    <Card big>
      <CardHeader>Question #{qNumber}</CardHeader>
      <CardBody>
        <div className="grid gap-4">
          <FormInput
            name="Statement"
            type="text"
            value={statement}
            onChange={(e) => setStatement(e)}
            asTextArea
          />
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                <th className="border-b border-text-color p-2">No.</th>
                <th className="border-b border-text-color p-2">Choice</th>
                <th className="border-b border-text-color p-2">Is Ans</th>
                <th className="border-b border-text-color p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {choices.map((c, idx) => (
                <tr key={idx}>
                  <td className="p-2 border-b border-text-color">{idx + 1}</td>
                  <td className="p-2 border-b border-text-color">
                    {screenType === "desktop"
                      ? `${c.choice.substring(0, 45)}${
                          c.choice.length >= 15 ? "..." : ""
                        }`
                      : `${c.choice.substring(0, 15)}${
                          c.choice.length >= 15 ? "..." : ""
                        }`}
                  </td>
                  <td className="p-2 border-b border-text-color">
                    <input
                      type="radio"
                      onChange={handleIsAnswer(idx)}
                      name="is-answer"
                      checked={c.choice === correctChoice.choice}
                    />
                  </td>
                  <td className="p-2 border-b border-text-color flex justify-center">
                    <Button
                      onClick={handleDeleteChoice(idx)}
                      animated
                      type="error"
                    >
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <FormInput
              name="Choice"
              type="text"
              value={choice.choice}
              className="flex-1"
              onChange={(e) => setChoice((c) => ({ ...c, choice: e }))}
            />
            <Button type="primary" animated onClick={handleAddChoice}>
              Add Choice
            </Button>
          </div>
          <div className="flex w-full *:flex-1 gap-2 flex-col sm:flex-row">
            <Button type="primary" onClick={handleAddQuestion}>
              Add
            </Button>
            <Button type="error" onClick={handleDeleteQuestion}>
              <MdDelete />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

type QProps = {
  questions: OnlyQuestion[];
  changeQuestionNumber: (idx: number) => void;
};

function QuestionsViewer({ questions, changeQuestionNumber }: QProps) {
  return (
    <section className="grid questions-grid">
      {questions.map((_, idx) => (
        <Square key={idx} onClick={() => changeQuestionNumber(idx)}>
          {idx + 1}
        </Square>
      ))}
      <Square onClick={() => changeQuestionNumber(questions.length)} last>
        {questions.length + 1}
      </Square>
    </section>
  );
}

function Square({
  children,
  last = false,
  onClick,
}: {
  children: React.ReactNode;
  last?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className={`${
        !last
          ? "bg-white text-text-color"
          : "border-2 border-white bg-transparent text-white"
      } cursor-pointer text-xl rounded-lg w-8 h-8 grid place-items-center`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
