import {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt/dist/types";

export const handleMessageBloodyOath = async ({
  client,
  payload,
}: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) => {
  await client.reactions.add({
    name: "flag-au",
    channel: payload.channel,
    timestamp: payload.event_ts,
  });
};
