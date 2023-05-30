import { App } from "@slack/bolt";
import { NextApiRequest, NextApiResponse } from "next";

import { receiver } from "clients/receiver";
import { registerListeners } from "listeners";
import { WebClient } from "@slack/web-api";
import { buildQuestionBlock } from "utils/blocks";
import { fetchQuizQuestions, createNewQuiz } from "services/quizService";
import { camelizeKeys } from "humps";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  receiver: receiver,
  developerMode: false,
});

registerListeners(app);

const router = receiver.start();

router.get("/api/health", (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    health: "Alive and Kickin' ✌️",
  });
});

// TODO: currently not returning any errors
// TODO: add proper logging
router.post("/api/jobs", async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: create schedule
  // TODO: every 15min, this endpoint is hit
  // TODO:  check schedule for new quizzes
  // TODO: create quiz then post in channel
  // TODO: repeat as before

  const { record } = camelizeKeys(req.body);
  const { createdBy } = record;
  const { channelId, numberOfQuestions } = record.payload;

  const questions = await fetchQuizQuestions({ numberOfQuestions });
  const newQuizResult = await createNewQuiz(questions, channelId);

  console.log(newQuizResult, "result::newQuizResult");

  const questionBlock = buildQuestionBlock({
    question: questions[0],
    currentQuestion: 1,
    totalQuestions: questions.length,
    // isSuperQuiz: previousQuestions.length === MAX_QUESTIONS,
    isFirstGame: true,
    userId: createdBy,
  });

  const web = new WebClient(process.env.SLACK_BOT_TOKEN);

  const result = await web.chat.postMessage({
    channel: channelId,
    ...questionBlock,
  });

  console.log(result, "result::postMessage");

  res.status(200).json({
    status: "Jobs in Progress ⚙️",
  });
});

export default router;
