import {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt/dist/types";

const handleBloodyOath = async ({
  client,
  payload,
}: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) => {
  await client.reactions.add({
    name: "flag-au",
    channel: payload.channel,
    timestamp: payload.event_ts,
  });
};

export default handleBloodyOath;
