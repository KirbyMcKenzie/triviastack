import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";
import {
  createNewQuiz,
  fetchQuizQuestions,
  getCurrentQuizByChannelId,
} from "services/quizService";
import { buildQuestionBlock } from "utils/blocks";

const MAX_QUESTIONS = 30;

const handlePlayAgain = async ({
  ack,
  body,
  logger,
  say,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();
  const channelId = body?.channel?.id || "";
  logger.info(`[ACTION] Play again called by ${body.user.id}`);

  const { questions: previousQuestions } = await getCurrentQuizByChannelId(
    channelId,
    false
  );

  const questions = await fetchQuizQuestions({
    numberOfQuestions: previousQuestions.length,
  });
  await createNewQuiz(questions, channelId);

  const questionBlock = buildQuestionBlock({
    question: questions[0],
    currentQuestion: 1,
    totalQuestions: questions.length,
    isSuperQuiz: previousQuestions.length === MAX_QUESTIONS,
    isFirstGame: false,
    userId: body.user.id,
  });

  await say(questionBlock);
};

export default handlePlayAgain;
