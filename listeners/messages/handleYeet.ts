import {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt/dist/types";

const handleYeet = async ({
  logger,
  message,
  say,
}: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) => {
  const user = (message as any).user;
  logger.info(`[MESSAGE] Yeet called by ${user.id}`);
  await say(`|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|`);
};

export default handleYeet;
