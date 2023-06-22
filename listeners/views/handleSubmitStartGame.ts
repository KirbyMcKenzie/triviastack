import {
  AllMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
} from "@slack/bolt/dist/types";
import { createNewQuiz, fetchQuizQuestions } from "services/quizService";
import { buildQuestionBlock } from "utils/blocks";

const DEFAULT_NUM_QUESTIONS = 10;

const handleSubmitStartGame = async ({
  ack,
  body,
  client,
  logger,
  view,
}: SlackViewMiddlewareArgs<SlackViewAction> & AllMiddlewareArgs) => {
  await ack();
  const userId = body.user.id;
  const {
    input_num_questions,
    input_select_difficulty,
    input_select_categories,
    input_select_channel,
  } = view.state.values;

  logger.info(`[VIEW] Submit start game by ${userId}`);

  const channelId = input_select_channel.select_channel
    .selected_channel as string;

  const numberOfQuestions =
    parseInt(input_num_questions.num_questions.value as string) ||
    DEFAULT_NUM_QUESTIONS;

  const difficulty =
    input_select_difficulty.select_difficulty.selected_option?.value;
  const categories = input_select_categories.select_categories.selected_options;

  const questions = await fetchQuizQuestions({
    numberOfQuestions,
    //@ts-ignore
    difficulty: difficulty === "all" ? undefined : difficulty,
    //@ts-ignore
    categories: categories?.map(({ value }) => value) || [],
  });
  await createNewQuiz(questions, channelId);

  const questionBlock = buildQuestionBlock({
    question: questions[0],
    currentQuestion: 1,
    totalQuestions: questions.length,
    userId: userId,
  });

  await client.chat.postMessage({
    ...questionBlock,
    channel: channelId,
  });
};

export default handleSubmitStartGame;
