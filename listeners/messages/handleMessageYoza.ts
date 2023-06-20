import {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt/dist/types";

const handleYoza = async ({
  message,
  logger,
  say,
}: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) => {
  const user = (message as any).user;
  logger.info(`[MESSAGE] Yoza called by ${user}`);
  await say(`Yoza <@${user}> 😼`);
};

export default handleYoza;
