import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";
import {
  createNewQuiz,
  fetchQuizQuestions,
  getQuizById,
} from "services/quizService";
import { buildQuestionBlock } from "utils/blocks";

const MAX_QUESTIONS = 30;

const handlePlayAgain = async ({
  action,
  ack,
  body,
  logger,
  say,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();
  const channelId = body?.channel?.id || "";
  const teamId = body.team?.id || "";
  logger.info(`[ACTION] Play again called by ${body.user.id}`);

  console.log(action, "action");

  const quizId = (action as any).action_id.split("_")[2];

  console.log(quizId, "quizId");

  const previousQuiz = await getQuizById(quizId);

  const questions = await fetchQuizQuestions({
    numberOfQuestions: previousQuiz.questions.length,
  });
  const quiz = await createNewQuiz(teamId, channelId, questions);

  const questionBlock = buildQuestionBlock({
    quizId: quiz.id,
    question: questions[0],
    currentQuestion: 1,
    totalQuestions: questions.length,
    isSuperQuiz: previousQuiz.questions.length === MAX_QUESTIONS,
    isFirstGame: false,
    userId: body.user.id,
  });

  await say(questionBlock);
};

export default handlePlayAgain;
