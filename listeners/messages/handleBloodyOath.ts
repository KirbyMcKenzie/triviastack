import {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt/dist/types";

const handleBloodyOath = async ({
  client,
  message,
  logger,
  payload,
}: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) => {
  const user = (message as any).user;
  logger.info(`[MESSAGE] Bloody Oath called by ${user}`);

  await client.reactions.add({
    name: "flag-au",
    channel: payload.channel,
    timestamp: payload.event_ts,
  });
};

export default handleBloodyOath;
