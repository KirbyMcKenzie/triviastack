import queryString from "query-string";
import { camelizeKeys } from "humps";

import { Question, Quiz } from "../types/quiz";
import { supabase } from "../clients/supabase";
import { shuffle } from "utils/array";

// TODO: Type this file properly
// TODO: Add logging & error handling

export type NewQuiz = {
  teamId: string;
  channelId: string;
  createdBy: string;
  questions: Question[];
};

export const createNewQuiz = async ({
  teamId,
  channelId,
  createdBy,
  questions,
}: NewQuiz): Promise<Quiz> => {
  const { data, error } = await supabase
    .from("quizzes")
    .insert({
      team_id: teamId,
      channel_id: channelId,
      created_by: createdBy,
      is_active: true,
      questions,
    })
    .select();
  error && console.log(error, "[SQL ERROR]");
  //@ts-ignore
  return camelizeKeys(data[0]) as unknown as Quiz;
};

export const getQuizById = async (id: string): Promise<Quiz> => {
  const { data } = await supabase.from("quizzes").select().eq("id", id);
  //@ts-ignore
  return camelizeKeys(data[0]) as unknown as Quiz;
};

export const getQuizzesByChannelId = async (
  channel_id: string
): Promise<Quiz[]> => {
  const { data } = await supabase
    .from("quizzes")
    .select()
    .eq("channel_id", channel_id)
    .eq("is_active", true);

  return camelizeKeys(data) as unknown as Quiz[];
};

export const updateQuizCurrentQuestion = async (
  id: string,
  updatedCurrentQuestion: number
): Promise<void> => {
  await supabase
    .from("quizzes")
    .update({ current_question: updatedCurrentQuestion })
    .eq("id", id);
};

export const updateQuizQuestion = async (
  id: string,
  questions: Question[]
): Promise<void> => {
  await supabase.from("quizzes").update({ questions }).eq("id", id);
};

export const updateQuiz = async (
  id: string,
  quiz: Partial<Quiz>
): Promise<void> => {
  await supabase
    .from("quizzes")
    .update({ ...quiz })
    .eq("id", id);
};

export const fetchQuizQuestions = async ({
  numberOfQuestions = 10,
  difficulty = undefined,
  categories = [],
}): Promise<Question[]> => {
  const query = queryString.stringify(
    {
      limit: numberOfQuestions * 2,
      categories: categories?.length === 10 ? [] : categories,
      difficulty,
    },
    { arrayFormat: "comma" }
  );

  const data = await fetch(
    `https://the-trivia-api.com/api/questions?${query}`
  ).then((response) => {
    if (response.ok) {
      return response.json(); // Parse response body as JSON
    } else {
      throw new Error("Error: " + response.status);
    }
  });

  return camelizeKeys(data)
    .filter(
      (question: Question) =>
        question.correctAnswer.length <= 32 &&
        question.incorrectAnswers.every((answer) => answer.length <= 32)
    )
    .map((question: Question) => ({
      ...question,
      answers: shuffle([question.correctAnswer, ...question.incorrectAnswers]),
    }))
    .slice(0, numberOfQuestions);
};
