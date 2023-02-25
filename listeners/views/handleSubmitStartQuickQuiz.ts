import {
  AllMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
} from "@slack/bolt/dist/types";
import { createNewQuiz, fetchQuizQuestions } from "services/quizService";
import { buildQuestionBlock } from "utils/blocks";

const handleSubmitStartQuickQuiz = async ({
  ack,
  body,
  view,
  client,
}: SlackViewMiddlewareArgs<SlackViewAction> & AllMiddlewareArgs) => {
  await ack();
  console.log(JSON.stringify(view.state.values), "view");
  const userId = body.user.id;
  const channelId = view.state.values.input_select_channel.select_channel
    .selected_channel as string;

  // const numberOfQuestions = parseInt(payload.text) || DEFAULT_NUM_QUESTIONS;
  // if (numberOfQuestions > MAX_QUESTIONS) {
  //   return await respond(buildErrorMaxQuestionsExceeded(MAX_QUESTIONS));
  // }

  const questions = await fetchQuizQuestions(10);
  await createNewQuiz(questions, channelId);

  const questionBlock = buildQuestionBlock({
    question: questions[0],
    currentQuestion: 1,
    totalQuestions: questions.length,
    userId: userId,
  });

  await client.chat.postMessage({
    channel: channelId,
    ...questionBlock,
  });
};

export default handleSubmitStartQuickQuiz;
