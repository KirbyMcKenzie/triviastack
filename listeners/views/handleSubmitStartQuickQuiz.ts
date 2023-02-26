import {
  AllMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
} from "@slack/bolt/dist/types";
import { createNewQuiz, fetchQuizQuestions } from "services/quizService";
import { buildQuestionBlock } from "utils/blocks";

const DEFAULT_NUM_QUESTIONS = 10;

const handleSubmitStartQuickQuiz = async ({
  ack,
  body,
  view,
  client,
}: SlackViewMiddlewareArgs<SlackViewAction> & AllMiddlewareArgs) => {
  await ack();
  console.log(JSON.stringify(view.state.values), "view");
  const userId = body.user.id;
  const values = view.state.values;
  const channelId = values.input_select_channel.select_channel
    .selected_channel as string;

  const numberOfQuestions =
    parseInt(values.input_num_questions.num_questions.value as string) ||
    DEFAULT_NUM_QUESTIONS;

  const difficulty =
    values.input_select_difficulty.select_difficulty.selected_option?.value;
  const categories =
    values.input_select_categories.select_categories.selected_options;

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
    channel: channelId,
    ...questionBlock,
  });
};

export default handleSubmitStartQuickQuiz;
