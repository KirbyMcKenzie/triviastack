import { App } from "@slack/bolt";
import { NextApiRequest, NextApiResponse } from "next";

import { receiver } from "clients/receiver";
import { registerListeners } from "listeners";
import { WebClient } from "@slack/web-api";
import { buildQuestionBlock } from "utils/blocks";
import { fetchQuizQuestions, createNewQuiz } from "services/quizService";
import { camelizeKeys } from "humps";
import { getInstallationStore } from "services/installationStoreService";
import { updateJob } from "services/jobService";

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
  const { createdBy, teamId, id, status, payload, retryCount } = record;
  const { channelId, numberOfQuestions } = payload;

  console.log(`[JOBS] Job record updated - id: ${id}`);

  if (status === "success" || status === "failed") {
    console.log(`[JOBS] Job record ignored with status: ${status} - id: ${id}`);
    return await res.status(204);
  }

  if (retryCount >= 3) {
    // TODO: message user to inform of error
    console.log(`[JOBS] Job retry count exceed, marking as failed - id: ${id}`);
    await updateJob({
      id,
      status: "failed",
      updatedAt: new Date().toISOString(),
    });
    return await res.status(500);
  }

  const questions = await fetchQuizQuestions({ numberOfQuestions });
  await createNewQuiz(questions, channelId);
  const { bot } = await getInstallationStore(teamId);

  const questionBlock = buildQuestionBlock({
    question: questions[0],
    currentQuestion: 1,
    totalQuestions: numberOfQuestions,
    isSuperQuiz: numberOfQuestions === 30,
    isFirstGame: true,
    userId: createdBy,
  });

  await new WebClient(bot?.token).chat
    .postMessage({
      channel: channelId,
      ...questionBlock,
    })
    .then(async () => {
      console.log(`[JOBS] Job successful, updating job status - id: ${id}`);

      await updateJob({
        id,
        status: "success",
        updatedAt: new Date().toISOString(),
      });
    })
    .catch(async (error) => {
      console.log(`[JOBS] Job failed, updating job status - id: ${id}`);

      await updateJob({
        id,
        error: error,
        updatedAt: new Date().toISOString(),
        retryCount: retryCount + 1,
      });
    });

  // TODO: refine
  res.status(200).json({
    status: "Jobs in Progress ⚙️",
  });
});

export default router;
