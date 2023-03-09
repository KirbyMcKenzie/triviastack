import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";

// TODO: Consider adding analytics to this
const handleNoop = async ({
  ack,
  body,
  logger,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();
  logger.info(`[ACTION] Noop called by ${body.user.id}`);
};

export default handleNoop;
