import {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt/dist/types";

const handleYoza = async ({
  message,
  say,
}: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) => {
  const user = (message as any).user;
  await say(`Yoza <@${user}> 😼`);
};

export default handleYoza;
