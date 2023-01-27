import { App } from "@slack/bolt";
import { NextApiRequest, NextApiResponse } from "next";
import NextConnectReceiver from "utils/NextConnectReceiver";
import { handleMessageYoza } from "handlers/handleMessageYoza";
import { handleMessageYeet } from "handlers/handleMessageYeet";
import { handleCommandQuickQuiz } from "handlers/handleCommandQuickQuiz";
import { handleActionAnswerQuestion } from "handlers/handleActionAnswerQuestion";
import { handleActionNextQuestion } from "handlers/handleActionNextQuestion";
import { handleActionPlayAgain } from "handlers/handleActionPlayAgain";

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

app.message("yoza", async ({ message, say }) => {
  await handleMessageYoza(message, say);
});

app.message("yeet", async ({ say }) => {
  await handleMessageYeet(say);
});

app.command(triviaSlashCommand, async ({ ack, say, client, payload }) => {
  await handleCommandQuickQuiz(ack, say, client, payload);
});

app.action(/answer_question/, async ({ ack, body, respond }) => {
  await handleActionAnswerQuestion(ack, body, respond);
});

app.action(/next_question/, async ({ ack, body, say, respond }) => {
  await handleActionNextQuestion(ack, body, say, respond);
});

app.action("play_again", async ({ ack, body, say }) => {
  await handleActionPlayAgain(ack, body, say);
});

// this is run just in case
const router = receiver.start();

router.get("/api", (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    health: "Alive and Kickin' ✌️",
  });
});

export default router;
