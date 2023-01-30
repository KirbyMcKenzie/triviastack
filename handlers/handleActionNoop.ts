import { SlackActionMiddlewareArgs } from "@slack/bolt";

// TODO: Consider adding analytics to this
export const handleActionNoop = async ({ ack }: SlackActionMiddlewareArgs) => {
  await ack();
  console.warn("[handleActionNoop] called");
};
