import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";

export const handleDismiss = async ({
  ack,
  body,
  logger,
  respond,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();
  logger.info(`[ACTION] Dismiss called by ${body.user.id}`);

  await respond({
    delete_original: true,
  });
};

export default handleDismiss;
