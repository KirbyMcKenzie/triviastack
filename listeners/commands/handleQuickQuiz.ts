import {
  AllMiddlewareArgs,
  SlackCommandMiddlewareArgs,
} from "@slack/bolt/dist/types";
import { createNewJob } from "services/jobService";
import { buildErrorMaxQuestionsExceeded } from "utils/blocks";

const DEFAULT_NUM_QUESTIONS = 10;
const MAX_QUESTIONS = 30;

const handleQuickQuiz = async ({
  ack,
  logger,
  say,
  respond,
  payload,
}: SlackCommandMiddlewareArgs & AllMiddlewareArgs) => {
  logger.info(`[COMMAND] Quick quiz triggered by ${payload.user_id}`);

  const numberOfQuestions = parseInt(payload.text) || DEFAULT_NUM_QUESTIONS;
  if (numberOfQuestions > MAX_QUESTIONS) {
    return await respond(buildErrorMaxQuestionsExceeded(MAX_QUESTIONS));
  }

  const isDirectMessage = payload.channel_name === "directmessage";
  let ts;

  if (!isDirectMessage) {
    const loadingMessage = await say({
      channel: isDirectMessage ? payload.user_id : payload.channel_id,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*⚡️ Generating your trivia...*",
          },
        },
      ],
    });
    ts = loadingMessage.ts;
  }

  logger.info(`[COMMAND] Creating new quiz via job`);
  return await createNewJob({
    createdBy: payload.user_id,
    teamId: payload.team_id,
    type: "CREATE_QUIZ",
    payload: {
      channel_name: payload.channel_name,
      channel_id: payload.channel_id,
      number_of_questions: numberOfQuestions,
      ts: ts,
    },
  });

  await ack();
};

export default handleQuickQuiz;
