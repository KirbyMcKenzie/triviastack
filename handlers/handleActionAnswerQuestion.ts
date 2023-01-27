import {
  AckFn,
  DialogValidation,
  RespondFn,
  SayArguments,
  SlackAction,
  SlackActionMiddlewareArgs,
  SlackCommandMiddlewareArgs,
} from "@slack/bolt";
import {
  getCurrentQuizByChannelId,
  updateQuizQuestion,
} from "services/quizService";
import { buildQuestionAnswersBlock, buildQuestionBlock } from "utils/blocks";

export const handleActionAnswerQuestion = async ({
  ack,
  body,
  respond,
}: SlackActionMiddlewareArgs) => {
  await ack();

  const answeredBy = (body as any).user;
  const answerValue = (body as any).actions[0].value;
  const channelId = (body as any).channel.id;

  const quiz = await getCurrentQuizByChannelId(channelId);
  const { id, currentQuestion, questions } = quiz;

  // TODO: can probably rename to answeredQuestion
  const previousQuestion = questions[currentQuestion - 1];

  const answersBlock = buildQuestionAnswersBlock(
    previousQuestion.answers,
    previousQuestion.type,
    answerValue,
    previousQuestion.correctAnswer
  );

  const questionBlock = buildQuestionBlock({
    text: previousQuestion.question,
    questionNumber: currentQuestion,
    totalQuestions: questions.length,
    difficulty: previousQuestion.difficulty,
    category: previousQuestion.category,
    answers: answersBlock,
    answeredValue: answerValue,
    userId: answeredBy.id,
    correctAnswer: previousQuestion.correctAnswer,
    isCorrect: previousQuestion.correctAnswer === answerValue,
    isFinalQuestion: currentQuestion === questions.length,
  });

  const isCorrect = previousQuestion.correctAnswer === answerValue;

  //@ts-ignore
  const updatedQuestions = questions.map((q: Question, index: number) =>
    index + 1 === currentQuestion ? { ...q, isCorrect } : q
  );

  await updateQuizQuestion(id, updatedQuestions);
  await respond(questionBlock);
};
