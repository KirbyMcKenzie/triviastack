import { App } from "@slack/bolt";
import { NextApiRequest, NextApiResponse } from "next";
import NextConnectReceiver from "utils/NextConnectReceiver";
import {
  handleActionAnswerQuestion,
  handleActionNextQuestion,
  handleActionPlayAgain,
  handleCommandQuickQuiz,
  handleMessageYeet,
  handleMessageYoza,
} from "handlers";
import { handleActionNoop } from "handlers/handleActionNoop";

const triviaSlashCommand =
  process.env.NODE_ENV === "production" ? "/trivia" : "/dev-trivia";

const receiver = new NextConnectReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || "invalid",
  processBeforeResponse: true,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
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

app.action(/noop/, async (listeners) => {
  await handleActionNoop(listeners);
});

// this is run just in case
const router = receiver.start();

router.get("/api", (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    health: "Alive and Kickin' ✌️",
  });
});

export default router;
