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
