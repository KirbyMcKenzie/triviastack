import { App } from "@slack/bolt";
import { NextApiRequest, NextApiResponse } from "next";
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
import { handleMessageBloodyOath } from "handlers/handleMessageBloodyOath";
import { receiver } from "clients/receiver";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  receiver: receiver,
  developerMode: false,
});

const isDev = process.env.NODE_ENV === "development";

isDev &&
  app.message("yeet", async (listeners) => {
    await handleMessageYeet(listeners);
  });

app.message("yoza", async (listeners) => {
  await handleMessageYoza(listeners);
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
