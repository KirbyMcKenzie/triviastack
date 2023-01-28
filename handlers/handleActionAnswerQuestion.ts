import { SlackActionMiddlewareArgs } from "@slack/bolt";
import {
  getCurrentQuizByChannelId,
  updateQuizQuestion,
} from "services/quizService";
import { Question } from "types/quiz";
import { buildQuestionBlock } from "utils/blocks";

export const handleActionAnswerQuestion = async ({
  ack,
  body,
  respond,
}: SlackActionMiddlewareArgs) => {
  await ack();

  const answeredBy = body.user;
  const answerValue = (body as any).actions[0].value;
  const channelId = body?.channel?.id || "";

  const quiz = await getCurrentQuizByChannelId(channelId);
  const { id, currentQuestion, questions } = quiz;

  const answeredQuestion = questions[currentQuestion - 1];

  const questionBlock = buildQuestionBlock({
    question: answeredQuestion,
    currentQuestion: currentQuestion,
    totalQuestions: questions.length,
    answeredValue: answerValue,
    userId: answeredBy.id,
  });

  const isCorrect = answeredQuestion.correctAnswer === answerValue;

  const updatedQuestions = questions.map((q: Question, index: number) =>
    index + 1 === currentQuestion ? { ...q, isCorrect } : q
  );

  await updateQuizQuestion(id, updatedQuestions);
  await respond(questionBlock);
};
