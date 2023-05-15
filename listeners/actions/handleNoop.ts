import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";

const handleNoop = async ({
  ack,
  body,
  logger,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();
  logger.info(`[ACTION] Noop called by ${body.user.id}`);
};

export default handleNoop;
