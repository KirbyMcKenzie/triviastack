import { id } from "date-fns/locale";
import { camelizeKeys } from "humps";
import { NextApiRequest, NextApiResponse } from "next";
import { getInstallationStore } from "services/installationStoreService";
import { updateJob } from "services/jobService";
import { fetchQuizQuestions, createNewQuiz } from "services/quizService";
import { buildQuestionBlock } from "utils/blocks";
import { WebClient } from "@slack/web-api";

export const handleCreateQuiz = async (record: Record<string, any>) => {
  console.log();
  const { createdBy, teamId, id, payload, retryCount } = record;
  const { channelId, channelName, numberOfQuestions, ts } = payload;
  console.log(`[JOBS] handleCreateQuiz triggered by ${createdBy}`);

  const questions = await fetchQuizQuestions({ numberOfQuestions });
  const quiz = await createNewQuiz(
    questions,
    channelName === "directmessage" ? createdBy : channelId
  );
  const { bot } = await getInstallationStore(teamId);

  const questionBlock = buildQuestionBlock({
    quizId: quiz.id,
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
};
