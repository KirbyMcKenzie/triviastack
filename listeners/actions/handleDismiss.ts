import { SlackActionMiddlewareArgs } from "@slack/bolt";

export const handleDismiss = async ({
  ack,
  respond,
}: SlackActionMiddlewareArgs) => {
  await ack();

  await respond({
    delete_original: true,
  });
};

export default handleDismiss;
