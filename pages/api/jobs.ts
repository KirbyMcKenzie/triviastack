import { camelizeKeys } from "humps";
import { NextApiRequest, NextApiResponse } from "next";
import { getInstallationStore } from "services/installationStoreService";
import { updateJob } from "services/jobService";
import { fetchQuizQuestions, createNewQuiz } from "services/quizService";
import { buildQuestionBlock } from "utils/blocks";
import { WebClient } from "@slack/web-api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { record } = camelizeKeys(req.body);
  const { createdBy, teamId, id, status, payload, retryCount } = record;
  const { channelId, channelName, numberOfQuestions, ts } = payload;

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
  await createNewQuiz(
    questions,
    channelName === "directmessage" ? createdBy : channelId
  );
  const { bot } = await getInstallationStore(teamId);

  const questionBlock = buildQuestionBlock({
    question: questions[0],
    currentQuestion: 1,
    totalQuestions: numberOfQuestions,
    isSuperQuiz: numberOfQuestions === 30,
    isFirstGame: true,
    userId: createdBy,
  });

  if (ts) {
    // TODO: call as postMessage if ts is null
    await new WebClient(bot?.token).chat
      .update({
        ...questionBlock,
        channel: channelName === "directmessage" ? createdBy : channelId,
        ts,
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
  } else {
    // TODO: call as postMessage if ts is null
    await new WebClient(bot?.token).chat
      .postMessage({
        ...questionBlock,
        channel: channelName === "directmessage" ? createdBy : channelId,
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
  }

  // TODO: call as postMessage if ts is null
  await new WebClient(bot?.token).chat
    .update({
      ...questionBlock,
      channel: channelName === "directmessage" ? createdBy : channelId,
      ts,
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

  return await res.status(200);
};

export default handler;

export const config = {
  api: {
    externalResolver: true,
  },
};
