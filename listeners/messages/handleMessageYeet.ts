import {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt/dist/types";

export const handleMessageYeet = async ({
  say,
}: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) => {
  await say(`|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|`);
};
