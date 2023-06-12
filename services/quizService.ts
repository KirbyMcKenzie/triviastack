import queryString from "query-string";
import { camelizeKeys } from "humps";

import { Question, Quiz } from "../types/quiz";
import { supabase } from "../clients/supabase";
import apiClient from "../clients/api";
import { shuffle } from "utils/array";

// TODO: Type this file properly
// TODO: Add logging & error handling
export const createNewQuiz = async (
  questions: Question[],
  channel_id: string
): Promise<Quiz> => {
  const { data, error } = await supabase
    .from("quizzes")
    .insert({
      questions: questions,
      channel_id: channel_id,
      is_active: true,
    })
    .select();
  error && console.log(error, "[SQL ERROR]");
  return camelizeKeys(data) as unknown as Quiz;
};

export const getCurrentQuizByChannelId = async (
  channelId: string,
  isActive: boolean = true
): Promise<Quiz> => {
  const { data } = await supabase
    .from("quizzes")
    .select()
    .eq("channel_id", channelId)
    .eq("is_active", isActive)
    .order("created_at", { ascending: false })
    .limit(1);
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
      difficulty,
      categories: categories?.length === 10 ? [] : categories,
    },
    { arrayFormat: "comma" }
  );

  const data = await apiClient
    .get(`https://the-trivia-api.com/api/questions?${query}`)
    .then((res) => res.data);

  return data
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
