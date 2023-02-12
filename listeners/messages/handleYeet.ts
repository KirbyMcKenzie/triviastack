import {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt/dist/types";

const handleYeet = async ({
  say,
}: SlackEventMiddlewareArgs<"message"> & AllMiddlewareArgs) => {
  await say(`|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|`);
};

export default handleYeet;
