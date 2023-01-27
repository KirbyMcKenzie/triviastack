import { SlackActionMiddlewareArgs } from "@slack/bolt";
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

  const answeredBy = body.user;
  const answerValue = (body as any).actions[0].value;
  const channelId = body?.channel?.id || "";

  const quiz = await getCurrentQuizByChannelId(channelId);
  const { id, currentQuestion, questions } = quiz;

  const answeredQuestion = questions[currentQuestion - 1];

  const questionBlock = buildQuestionBlock({
    text: answeredQuestion.question,
    questionNumber: currentQuestion,
    totalQuestions: questions.length,
    difficulty: answeredQuestion.difficulty,
    category: answeredQuestion.category,
    answers: buildQuestionAnswersBlock(
      answeredQuestion.answers,
      answeredQuestion.type,
      answerValue,
      answeredQuestion.correctAnswer
    ),
    answeredValue: answerValue,
    userId: answeredBy.id,
    correctAnswer: answeredQuestion.correctAnswer,
    isCorrect: answeredQuestion.correctAnswer === answerValue,
    isFinalQuestion: currentQuestion === questions.length,
  });

  const isCorrect = answeredQuestion.correctAnswer === answerValue;

  //@ts-ignore
  const updatedQuestions = questions.map((q: Question, index: number) =>
    index + 1 === currentQuestion ? { ...q, isCorrect } : q
  );

  await updateQuizQuestion(id, updatedQuestions);
  await respond(questionBlock);
};
