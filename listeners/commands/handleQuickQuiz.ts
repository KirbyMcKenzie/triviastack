import {
  AllMiddlewareArgs,
  SlackCommandMiddlewareArgs,
} from "@slack/bolt/dist/types";
import { createNewJob } from "services/jobService";
import { createNewQuiz, fetchQuizQuestions } from "services/quizService";
import {
  buildErrorMaxQuestionsExceeded,
  buildQuestionBlock,
} from "utils/blocks";

const useNewQuizFlow = process.env.USE_NEW_QUIZ_FLOW === "enabled";

const DEFAULT_NUM_QUESTIONS = 10;
const MAX_QUESTIONS = 30;

const handleQuickQuiz = async ({
  ack,
  logger,
  say,
  respond,
  payload,
}: SlackCommandMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();
  logger.info(`[COMMAND] Quick quiz triggered by ${payload.user_id}`);

  const numberOfQuestions = parseInt(payload.text) || DEFAULT_NUM_QUESTIONS;
  if (numberOfQuestions > MAX_QUESTIONS) {
    return await respond(buildErrorMaxQuestionsExceeded(MAX_QUESTIONS));
  }

  if (useNewQuizFlow) {
    logger.info(`[COMMAND] Creating new quiz via job`);
    return await createNewJob({
      createdBy: payload.user_id,
      teamId: payload.team_id,
      type: "CREATE_QUIZ",
      payload: {
        channel_name: payload.channel_name,
        channel_id: payload.channel_id,
        number_of_questions: numberOfQuestions,
      },
    });
  } else {
    logger.info(`[COMMAND] Creating new quiz via old workflow`);

    const questions = await fetchQuizQuestions({ numberOfQuestions });

    const questionBlock = buildQuestionBlock({
      question: questions[0],
      currentQuestion: 1,
      totalQuestions: questions.length,
      userId: payload.user_id,
      isSuperQuiz: numberOfQuestions === MAX_QUESTIONS,
    });

    // TODO: see if possible to handle You conversations here too
    await say(questionBlock);
    await createNewQuiz(questions, payload.channel_id);
  }
};

export default handleQuickQuiz;
