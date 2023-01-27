import { Question, Quiz } from "../types/quiz";
import { camelizeKeys } from "humps";
import { supabase } from "./supabaseClient";

// TODO: import client here instead
export const createNewQuiz = async (
  questions: Question[],
  channel_id: string
): Promise<void> => {
  const { data, error } = await supabase
    .from("quizzes")
    .insert({
      questions: questions,
      channel_id: channel_id,
      is_active: true,
    })
    .select();
  error && console.log(error, "[SQL ERROR]");
  //@ts-ignore
  return camelizeKeys(data);
};

export const getCurrentQuizByChannelId = async (
  channelId: string
): Promise<any> => {
  const { data } = await supabase
    .from("quizzes")
    .select()
    .eq("channel_id", channelId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1);
  //@ts-ignore
  return camelizeKeys(data[0]);
};

// TODO: Add types
export const getQuizzesByChannelId = async (
  channel_id: string
): Promise<any[]> => {
  const { data } = await supabase
    .from("quizzes")
    .select()
    .eq("channel_id", channel_id)
    .eq("is_active", true);

  //@ts-ignore
  return camelizeKeys(data);
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
  questions: any[]
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
