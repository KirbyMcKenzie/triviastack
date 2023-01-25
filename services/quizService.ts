import { SupabaseClient } from "@supabase/supabase-js";
import { Question, Quiz } from "../types/quiz";
import { v4 as uuidv4 } from "uuid";
import { camelizeKeys } from "humps";

export const createNewQuiz = async (
  client: SupabaseClient,
  questions: Question[],
  channel_id: string
): Promise<void> => {
  const { data, error } = await client
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
  client: SupabaseClient,
  channelId: string
): Promise<any> => {
  const { data } = await client
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
  client: SupabaseClient,
  channel_id: string
): Promise<any[]> => {
  const { data } = await client
    .from("quizzes")
    .select()
    .eq("channel_id", channel_id)
    .eq("is_active", true);

  //@ts-ignore
  return camelizeKeys(data);
};

export const updateQuizCurrentQuestion = async (
  client: SupabaseClient,
  id: string,
  updatedCurrentQuestion: number
): Promise<void> => {
  await client
    .from("quizzes")
    .update({ current_question: updatedCurrentQuestion })
    .eq("id", id);
};

export const updateQuizQuestion = async (
  client: SupabaseClient,
  id: string,
  questions: any[]
): Promise<void> => {
  await client.from("quizzes").update({ questions }).eq("id", id);
};

export const updateQuiz = async (
  client: SupabaseClient,
  id: string,
  quiz: Partial<Quiz>
): Promise<void> => {
  await client
    .from("quizzes")
    .update({ ...quiz })
    .eq("id", id);
};
