import { App } from "@slack/bolt";
import { NextApiRequest, NextApiResponse } from "next";

import { receiver } from "clients/receiver";
import { registerListeners } from "listeners";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  receiver: receiver,
  developerMode: false,
});

registerListeners(app);

const router = receiver.start();

router.get("/api", (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    health: "Alive and Kickin' ✌️",
  });
});

export default router;
