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
} from "handlers";
import { handleActionNoop } from "handlers/handleActionNoop";
import { handleActionDismiss } from "handlers/handleActionDismiss";
import {
  createInstallationStore,
  getInstallationStore,
} from "services/installationStoreService";
import { createFeedback } from "services/feedbackService";

const isProd = process.env.NODE_ENV === "production";
const triviaSlashCommand = isProd ? "/trivia" : "/dev-trivia";

const receiver = new NextConnectReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || "invalid",
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  processBeforeResponse: true,
  logLevel: LogLevel.DEBUG,
  stateSecret: "my-state-secret",
  scopes: ["channels:history", "chat:write", "commands", "im:history"],
  installationStore: {
    storeInstallation: async (installation) => {
      console.log("storeInstallation called");
      // Bolt will pass your handler an installation object
      // Change the lines below so they save to your database
      // TODO: Think about whether we need to handle this case until the app can handle org-level apps
      // if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
      //   // handle storing org-wide app installation
      //   return await database.set(installation.enterprise.id, installation);
      // }
      if (installation.team !== undefined) {
        // single team app installation
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
      // Bolt will pass your handler an installQuery object
      // Change the lines below so they fetch from your database
      // if (
      //   installQuery.isEnterpriseInstall &&
      //   installQuery.enterpriseId !== undefined
      // ) {
      //   // handle org wide app installation lookup
      //   return await database.get(installQuery.enterpriseId);
      // }
      if (installQuery.teamId !== undefined) {
        // single team app installation lookup
        return await getInstallationStore(installQuery.teamId);
      }
      throw new Error("Failed fetching installation");
    },
    //   deleteInstallation: async (installQuery) => {
    //     // Bolt will pass your handler  an installQuery object
    //     // Change the lines below so they delete from your database
    //     if (
    //       installQuery.isEnterpriseInstall &&
    //       installQuery.enterpriseId !== undefined
    //     ) {
    //       // org wide app installation deletion
    //       return await database.delete(installQuery.enterpriseId);
    //     }
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
  logLevel: LogLevel.DEBUG,
  receiver: receiver,
  developerMode: false,
});

app.message("yoza", async (listeners) => {
  await handleMessageYoza(listeners);
});

app.message("yeet", async (listeners) => {
  await handleMessageYeet(listeners);
});

app.command(triviaSlashCommand, async (listeners) => {
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

app.view(/submit_feedback/, async ({ ack, body, view, client }) => {
  await ack();
  console.log(body, "body");
  const user = body.user;
  const teamId = body.team?.id || "invalid-team";
  const channelId = view.callback_id.split("_")[0];
  const feedback = view.state.values.input_feedback.feedback_input
    .value as string;
  console.log(feedback, "feedback");
  await client.chat.postEphemeral({
    channel: channelId,
    user: user.id,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Feedback received!* Thanks for improving Trivia 🤝`,
        },
      },
    ],
  });

  await createFeedback(teamId, channelId, feedback, user);
});

// this is run just in case
const router = receiver.start();

router.get("/api", (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    health: "Alive and Kickin' ✌️",
  });
});

export default router;
