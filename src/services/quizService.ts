import { SupabaseClient } from '@supabase/supabase-js';
import { Question } from '../types/quiz';

export const createNewQuiz = async (
  supabaseClient: SupabaseClient,
  questions: Question[],
  channel_id: string,
): Promise<void> => {
  await supabaseClient.from('quizzes').insert({
    questions: questions,
    channel_id: channel_id,
    is_active: true,
  });
};

// TODO: Add types
export const getQuizzesByChannelId = async (
  supabaseClient: SupabaseClient,
  channel_id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any[]> => {
  const { data } = await supabaseClient
    .from('quizzes')
    .select()
    .eq('channel_id', channel_id);

  return data;
};
