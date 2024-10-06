import { motion } from "framer-motion";
import { Question } from "../lib/definitions";

export type OnlyQuestion = Omit<Question, "id" | "quiz">;

export function Square({
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

type QProps = {
  questions: OnlyQuestion[];
  changeQuestionNumber: (idx: number) => void;
  viewer?: boolean;
};

export function QuestionsViewer({
  questions,
  changeQuestionNumber,
  viewer = false,
}: QProps) {
  return (
    <section className="grid questions-grid">
      {questions.map((_, idx) => (
        <Square key={idx} onClick={() => changeQuestionNumber(idx)}>
          {idx + 1}
        </Square>
      ))}
      {!viewer && (
        <Square onClick={() => changeQuestionNumber(questions.length)} last>
          {questions.length + 1}
        </Square>
      )}
    </section>
  );
}
