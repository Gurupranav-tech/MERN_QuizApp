export type APIResponse<T> = {
  data?: T;
  error?: string;
};

export type Quiz = {
  id: string;
  title: string;

  user: User;

  questions: Question[];
};

export enum Type {
  numbers,
  text,
}

export type Choice = {
  choice: string;
  type: Type;
};

export type Question = {
  id: string;
  statement: string;
  choices: Choice[];
  correct_choice: Choice;

  quiz: Quiz;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;

  quizzes: Quiz[];
};
