import { SlackActionMiddlewareArgs } from "@slack/bolt";

export const handleActionDismiss = async ({
  ack,
  respond,
}: SlackActionMiddlewareArgs) => {
  await ack();

  await respond({
    delete_original: true,
  });
};
