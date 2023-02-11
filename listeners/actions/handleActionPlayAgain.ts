import { SlackActionMiddlewareArgs } from "@slack/bolt";
import {
  createNewQuiz,
  fetchQuizQuestions,
  getCurrentQuizByChannelId,
} from "services/quizService";
import { buildQuestionBlock, buildQuizNewGameHeader } from "utils/blocks";

export const handleActionPlayAgain = async ({
  ack,
  body,
  say,
}: SlackActionMiddlewareArgs) => {
  const channelId = body?.channel?.id || "";

  await ack();
  await say(buildQuizNewGameHeader(body.user.id, false));

  const { questions: previousQuestions } = await getCurrentQuizByChannelId(
    channelId,
    false
  );

  const questions = await fetchQuizQuestions(previousQuestions.length);
  await createNewQuiz(questions, channelId);

  const questionBlock = buildQuestionBlock({
    question: questions[0],
    currentQuestion: 1,
    totalQuestions: questions.length,
  });

  await say(questionBlock);
};
