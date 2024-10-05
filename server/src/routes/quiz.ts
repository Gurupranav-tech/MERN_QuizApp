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

export default router;
