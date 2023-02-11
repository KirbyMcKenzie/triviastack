import { App } from "@slack/bolt";
import { NextApiRequest, NextApiResponse } from "next";
import { handleViewSubmitFeedback, registerListeners } from "listeners";
import { receiver } from "clients/receiver";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  receiver: receiver,
  developerMode: false,
});

app.view(/submit_feedback/, async (listeners) => {
  await handleViewSubmitFeedback(listeners);
});

registerListeners(app);

const router = receiver.start();

router.get("/api", (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    health: "Alive and Kickin' ✌️",
  });
});

export default router;
