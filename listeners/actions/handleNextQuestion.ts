import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";
import {
  getCurrentQuizByChannelId,
  updateQuiz,
  updateQuizCurrentQuestion,
} from "services/quizService";
import { Question } from "types/quiz";
import { buildQuizCompleteBlock, buildQuestionBlock } from "utils/blocks";

const handleNextQuestion = async ({
  ack,
  body,
  logger,
  respond,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();

  const answerValue = (body as any).actions[0].value;
  const channelId = body?.channel?.id || "";
  const userId = body?.user.id;

  logger.info(`[ACTION] Next question called by ${userId}`);

  const quiz = await getCurrentQuizByChannelId(channelId);
  const { id, currentQuestion, questions } = quiz;

  const nextQuestion = questions[currentQuestion];
  const previousQuestion = questions[currentQuestion - 1];
  const isCorrect = previousQuestion.correctAnswer === answerValue;

  const updatedQuestions = questions.map((q: Question, index: number) =>
    index + 1 === currentQuestion ? { ...q, is_correct: isCorrect } : q
  );

  if (currentQuestion === questions.length) {
    //@ts-ignore
    await updateQuiz(id, { is_active: false });

    const score = updatedQuestions.filter(
      ({ isCorrect }: Question) => isCorrect
    ).length;

    const quizCompleteBlock = buildQuizCompleteBlock(score, questions.length);
    await respond(quizCompleteBlock);
    return;
  }

  const questionBlock = buildQuestionBlock({
    question: nextQuestion,
    currentQuestion: currentQuestion + 1,
    totalQuestions: questions.length,
    answeredValue: answerValue,
    userId,
  });

  await respond(questionBlock);
  await updateQuizCurrentQuestion(id, currentQuestion + 1);
};

export default handleNextQuestion;
