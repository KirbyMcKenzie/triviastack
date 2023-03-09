import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";
import {
  getCurrentQuizByChannelId,
  updateQuizQuestion,
} from "services/quizService";
import { Question } from "types/quiz";
import { buildQuestionBlock } from "utils/blocks";

const handleAnswerQuestion = async ({
  ack,
  body,
  logger,
  respond,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();
  const answeredById = body.user.id;
  const answerValue = (body as any).actions[0].value;
  const channelId = body?.channel?.id || "";

  logger.info(`[ACTION] Answer question called by ${answeredById}`);

  const quiz = await getCurrentQuizByChannelId(channelId);
  const { id, currentQuestion, questions } = quiz;

  const answeredQuestion = questions[currentQuestion - 1];

  const questionBlock = buildQuestionBlock({
    question: answeredQuestion,
    currentQuestion: currentQuestion,
    totalQuestions: questions.length,
    answeredValue: answerValue,
    userId: answeredById,
    disableButtons: true,
  });

  const isCorrect = answeredQuestion.correctAnswer === answerValue;

  const updatedQuestions = questions.map((q: Question, index: number) =>
    index + 1 === currentQuestion ? { ...q, isCorrect } : q
  );

  await updateQuizQuestion(id, updatedQuestions);
  await respond(questionBlock);
};

export default handleAnswerQuestion;
