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
router.post("/api/jobs", async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: create schedule
  // TODO: every 15min, this endpoint is hit
  // TODO:  check schedule for new quizzes
  // TODO: create quiz then post in channel
  // TODO: repeat as before

  const requestBody = camelizeKeys(req.body);

  console.log(requestBody, "new job request");
  console.log(requestBody.record.payload, "new job payload");

  console.log(requestBody.record.payload.numberOfQuestions, "-=-=- got here 1");

  const questions = await fetchQuizQuestions({
    numberOfQuestions: requestBody.record.payload.numberOfQuestions,
  });

  console.log("-=-=- got here 2");

  const web = new WebClient(process.env.SLACK_BOT_TOKEN);

  console.log(web, "web");

  // // TODO: pull from quick quiz settings
  // const questions = await fetchQuizQuestions({ numberOfQuestions: 10 });
  const newQuizResult = await createNewQuiz(questions, "C04ALQ1EJ7P");

  console.log(newQuizResult, "result::newQuizResult");

  const questionBlock = buildQuestionBlock({
    question: questions[0],
    currentQuestion: 1,
    totalQuestions: questions.length,
    // isSuperQuiz: previousQuestions.length === MAX_QUESTIONS,
    isFirstGame: true,
    userId: "U027E7FV733", // TODO: pull from installationStore
  });

  const result = await web.chat.postMessage({
    channel: "C04ALQ1EJ7P",
    ...questionBlock,
  });

  console.log(result, "result::postMessage");

  res.status(200).json({
    status: "Jobs in Progress ⚙️",
  });
});

export default router;
