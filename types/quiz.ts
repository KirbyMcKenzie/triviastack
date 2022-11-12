// TODO: investigate type generation from SB
export interface Quiz {
  id: string;
  channel_id: string;
  is_active: boolean;
  current_question: number;
  score: number;
  questions: Question[];
  created_at: string;
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  is_correct?: boolean;
}
