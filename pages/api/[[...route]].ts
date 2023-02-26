import { App } from "@slack/bolt";
import { NextApiRequest, NextApiResponse } from "next";

import { receiver } from "clients/receiver";
import { registerListeners } from "listeners";
import { WebClient } from "@slack/web-api";
import { buildQuestionBlock } from "utils/blocks";
import { fetchQuizQuestions, createNewQuiz } from "services/quizService";

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  receiver: receiver,
  developerMode: false,
});

registerListeners(app);

const router = receiver.start();

router.get("/api", (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    health: "Alive and Kickin' ✌️",
  });
});
router.get("/api/jobs", async (_req: NextApiRequest, res: NextApiResponse) => {
  // TODO: create schedule
  // TODO: every 15min, this endpoint is hit
  // TODO:  check schedule for new quizzes
  // TODO: create quiz then post in channel
  // TODO: repeat as before

  const web = new WebClient(token);

  const questions = await fetchQuizQuestions({ numberOfQuestions: 10 });
  await createNewQuiz(questions, "C0271PJK1A7");

  const questionBlock = buildQuestionBlock({
    question: questions[0],
    currentQuestion: 1,
    totalQuestions: questions.length,
    // isSuperQuiz: previousQuestions.length === MAX_QUESTIONS,
    isFirstGame: true,
    // userId: body.user.id,
  });

  const result = await web.chat.postMessage({
    channel: "C0271PJK1A7",
    ...questionBlock,
  });

  res.status(200).json({
    health: "Alive and Kickin' ✌️",
  });
});

export default router;
