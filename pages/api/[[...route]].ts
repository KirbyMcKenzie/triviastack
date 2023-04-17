import { App } from "@slack/bolt";
import { NextApiRequest, NextApiResponse } from "next";

import { receiver } from "clients/receiver";
import { registerListeners } from "listeners";
import { WebClient } from "@slack/web-api";
import { buildQuestionBlock } from "utils/blocks";
import { fetchQuizQuestions, createNewQuiz } from "services/quizService";

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

// TODO: come back to this
// router.get("/api/jobs", async (_req: NextApiRequest, res: NextApiResponse) => {
//   // TODO: create schedule
//   // TODO: every 15min, this endpoint is hit
//   // TODO:  check schedule for new quizzes
//   // TODO: create quiz then post in channel
//   // TODO: repeat as before

//   const web = new WebClient(process.env.SLACK_BOT_TOKEN);

//   // TODO: pull from quick quiz settings
//   const questions = await fetchQuizQuestions({ numberOfQuestions: 10 });

//   // TODO: pull channelId from installationStore
//   await createNewQuiz(questions, "C0271PJK1A7");

//   const questionBlock = buildQuestionBlock({
//     question: questions[0],
//     currentQuestion: 1,
//     totalQuestions: questions.length,
//     // isSuperQuiz: previousQuestions.length === MAX_QUESTIONS,
//     isFirstGame: true,
//     userId: "U027E7FV733", // TODO: pull from installationStore
//   });

//   const result = await web.chat.postMessage({
//     channel: "C0271PJK1A7",
//     ...questionBlock,
//   });

//   res.status(200).json({
//     status: "Jobs in Progress ⚙️",
//   });
// });

export default router;
