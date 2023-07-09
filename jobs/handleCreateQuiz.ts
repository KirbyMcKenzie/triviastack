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

  console.log(teamId, "teamId");

  const questions = await fetchQuizQuestions({ numberOfQuestions });
  const quiz = await createNewQuiz({
    channelId: channelName === "directmessage" ? createdBy : channelId,
    teamId,
    createdBy,
    questions,
  });
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
      });
  }

  // // TODO: call as postMessage if ts is null
  // await new WebClient(bot?.token).chat
  //   .update({
  //     ...questionBlock,
  //     channel: channelName === "directmessage" ? createdBy : channelId,
  //     ts,
  //   })
  //   .then(async () => {
  //     console.log(`[JOBS] Job successful, updating job status - id: ${id}`);

  //     await updateJob({
  //       id,
  //       status: "success",
  //       updatedAt: new Date().toISOString(),
  //     });
  //   });
};
