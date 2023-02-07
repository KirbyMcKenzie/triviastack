import { App, FileInstallationStore, LogLevel } from "@slack/bolt";
import { NextApiRequest, NextApiResponse } from "next";
import NextConnectReceiver from "utils/NextConnectReceiver";
import {
  handleActionAnswerQuestion,
  handleActionNextQuestion,
  handleActionOpenModalFeedback,
  handleActionPlayAgain,
  handleCommandQuickQuiz,
  handleMessageYeet,
  handleMessageYoza,
  handleViewSubmitFeedback,
} from "handlers";
import { handleActionNoop } from "handlers/handleActionNoop";
import { handleActionDismiss } from "handlers/handleActionDismiss";
import {
  createInstallationStore,
  getInstallationStore,
} from "services/installationStoreService";
import { handleMessageBloodyOath } from "handlers/handleMessageBloodyOath";

// TODO: move this out of here
const receiver = new NextConnectReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || "invalid",
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  processBeforeResponse: true,
  logLevel: LogLevel.DEBUG,
  stateSecret: "my-state-secret",
  scopes: [
    "channels:history",
    "chat:write",
    "commands",
    "im:history",
    "reactions:write",
  ],
  // TODO: move this out of here
  installationStore: {
    storeInstallation: async (installation) => {
      console.log("storeInstallation called");
      if (installation.team !== undefined) {
        return await createInstallationStore(
          installation.team.id,
          installation
        );
      }
      // TODO: Log and alert
      throw new Error("Failed saving installation data to installationStore");
    },
    fetchInstallation: async (installQuery) => {
      console.log("fetchInstallation called");
      if (installQuery.teamId !== undefined) {
        return await getInstallationStore(installQuery.teamId);
      }
      throw new Error("Failed fetching installation");
    },
    // TODO: implement this with soft delete
    //   deleteInstallation: async (installQuery) => {
    //     if (installQuery.teamId !== undefined) {
    //       // single team app installation deletion
    //       return await database.delete(installQuery.teamId);
    //     }
    //     throw new Error("Failed to delete installation");
    //   },
  },
});

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  receiver: receiver,
  developerMode: false,
});

app.message("yoza", async (listeners) => {
  await handleMessageYoza(listeners);
});

// TODO: Make this dev only
app.message("yeet", async (listeners) => {
  await handleMessageYeet(listeners);
});

app.message(/bloody oath/, async (listeners) => {
  await handleMessageBloodyOath(listeners);
});

app.command("/trivia", async (listeners) => {
  await handleCommandQuickQuiz(listeners);
});

app.action(/answer_question/, async (listeners) => {
  await handleActionAnswerQuestion(listeners);
});

app.action(/next_question/, async (listeners) => {
  await handleActionNextQuestion(listeners);
});

app.action(/play_again/, async (listeners) => {
  await handleActionPlayAgain(listeners);
});

app.action(/feedback_open/, async (listeners) => {
  await handleActionOpenModalFeedback(listeners);
});

app.action(/dismiss/, async (listeners) => {
  await handleActionDismiss(listeners);
});

app.action(/noop/, async (listeners) => {
  await handleActionNoop(listeners);
});

app.view(/submit_feedback/, async (listeners) => {
  await handleViewSubmitFeedback(listeners);
});

// this is run just in case
const router = receiver.start();

router.get("/api", (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    health: "Alive and Kickin' ✌️",
  });
});

export default router;
