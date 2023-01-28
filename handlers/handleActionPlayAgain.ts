import { SlackActionMiddlewareArgs } from "@slack/bolt";
import { createNewQuiz, fetchQuizQuestions } from "services/quizService";
import { buildQuestionBlock, buildQuizNewGameHeader } from "utils/blocks";

export const handleActionPlayAgain = async ({
  ack,
  body,
  say,
}: SlackActionMiddlewareArgs) => {
  const channelId = body?.channel?.id || "";

  await ack();
  await say(buildQuizNewGameHeader(body.user.id, false));

  const questions = await fetchQuizQuestions();
  await createNewQuiz(questions, channelId);

  const questionBlock = buildQuestionBlock({
    question: questions[0],
    currentQuestion: 1,
    totalQuestions: questions.length,
  });

  await say(questionBlock);
};
