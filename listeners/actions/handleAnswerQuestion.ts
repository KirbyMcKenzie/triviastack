import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";
import { getQuizById, updateQuizQuestion } from "services/quizService";
import { Question } from "types/quiz";
import { buildQuestionBlock } from "utils/blocks";

const handleAnswerQuestion = async ({
  ack,
  body,
  action,
  logger,
  respond,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();
  const answeredById = body.user.id;
  const answerValue = (body as any).actions[0].value;
  const quizId = (action as any).action_id.split("_")[2];

  logger.info(`[ACTION] Answer question called by ${answeredById}`);

  const { currentQuestion, questions } = await getQuizById(quizId);
  const answeredQuestion = questions[currentQuestion - 1];
  const isCorrect = answeredQuestion.correctAnswer === answerValue;

  const updatedQuestions = questions.map((q: Question, index: number) =>
    index + 1 === currentQuestion ? { ...q, isCorrect } : q
  );

  const questionBlock = buildQuestionBlock({
    quizId,
    question: answeredQuestion,
    currentQuestion: currentQuestion,
    totalQuestions: questions.length,
    answeredValue: answerValue,
    userId: answeredById,
    disableButtons: true,
  });

  await updateQuizQuestion(quizId, updatedQuestions);
  await respond(questionBlock);
};

export default handleAnswerQuestion;
