import express from "express";
import { z } from "zod";
import { fromError } from "zod-validation-error";
import authUser from "../middlewares/authMiddleware";
import prisma from "../db/connect";

const ChoiceSchema = z.object({
  choice: z.string(),
  type: z.number(),
});

const QuestionSchema = z.object({
  statement: z.string(),
  choices: z.array(ChoiceSchema),
  correct_choice: ChoiceSchema,
});

const QuizSchema = z.object({
  title: z.string(),
  questions: z.array(QuestionSchema),
});

const TakeQuizSchema = z.object({
  quiz_id: z.string(),
  score: z.number(),
});

const router = express.Router();

router.post("/create-quiz", authUser, async (req, res): Promise<any> => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated!" });

  const { success, error, data } = QuizSchema.safeParse(req.body);
  if (!success)
    return res.status(400).json({ error: fromError(error).toString() });

  try {
    const quiz = await prisma.quiz.create({
      data: {
        title: data.title,
        userId: req.cookies["auth:id"],
      },
    });

    await prisma.question.createMany({
      data: data.questions.map((q) => ({ ...q, quizId: quiz.id })),
    });

    res.status(200).json({ data: { url_slug: quiz.id } });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error " + error.toString() });
  }
});

router.post("/quiz-taken", authUser, async (req, res): Promise<any> => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "Not authenticated!" });

  const { success, data, error } = TakeQuizSchema.safeParse(req.body);
  if (!success)
    return res.status(400).json({ error: fromError(error).toString() });

  const record = await prisma.quizRecord.create({
    data: {
      score: data.score,
      quizId: data.quiz_id,
      userId: user.id,
    },
  });

  res.status(200).json({ data: { ...record } });
});

router.get("/:id", authUser, async (req, res): Promise<any> => {
  console.log(req.body);
  const id = req.params.id;

  if (!req.user) return res.status(401).json({ error: "Not authenticated!" });

  try {
    const quiz = await prisma.quiz.findFirstOrThrow({
      where: {
        id,
        userId: req.user.id,
      },
      include: {
        questions: true,
      },
    });

    res.status(200).json({ data: quiz });
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

export default router;
