import { SlackActionMiddlewareArgs } from "@slack/bolt";

// TODO: Consider adding analytics to this
const handleNoop = async ({ ack }: SlackActionMiddlewareArgs) => {
  await ack();
  console.warn("[handleActionNoop] called");
};

export default handleNoop;
