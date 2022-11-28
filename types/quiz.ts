// TODO: investigate type generation from SB
export interface Quiz {
  id: string;
  channelId: string;
  isActive: boolean;
  currentQuestion: number;
  score: number;
  questions: Question[];
  createdAt: string;
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  isCorrect?: boolean;
}
