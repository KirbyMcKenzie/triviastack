import { SlackCommandMiddlewareArgs } from "@slack/bolt/dist/types";
import { createNewQuiz, fetchQuizQuestions } from "services/quizService";
import {
  buildErrorMaxQuestionsExceeded,
  buildQuestionBlock,
} from "utils/blocks";

const DEFAULT_NUM_QUESTIONS = 10;
const MAX_QUESTIONS = 50;

const handleQuickQuiz = async ({
  ack,
  say,
  respond,
  payload,
}: SlackCommandMiddlewareArgs) => {
  await ack();

  const numberOfQuestions = parseInt(payload.text) || DEFAULT_NUM_QUESTIONS;
  if (numberOfQuestions > MAX_QUESTIONS) {
    return await respond(buildErrorMaxQuestionsExceeded(MAX_QUESTIONS));
  }

  const questions = await fetchQuizQuestions({numberOfQuestions});
  await createNewQuiz(questions, payload.channel_id);

  const questionBlock = buildQuestionBlock({
    question: questions[0],
    currentQuestion: 1,
    totalQuestions: questions.length,
    userId: payload.user_id,
    isSuperQuiz: numberOfQuestions === MAX_QUESTIONS,
  });

  await say(questionBlock);
};

export default handleQuickQuiz;
