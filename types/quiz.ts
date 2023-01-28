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
  type: "multiple" | "boolean";
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  answers: string[];
  isCorrect?: boolean;
}
