import {
  AllMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
} from "@slack/bolt/dist/types";
import { createFeedback } from "services/feedbackService";

const handleSubmitFeedback = async ({
  ack,
  body,
  client,
  logger,
  view,
}: SlackViewMiddlewareArgs<SlackViewAction> & AllMiddlewareArgs) => {
  await ack();
  const user = body.user;
  const teamId = body.team?.id || "invalid-team";
  const channelId = view.callback_id.split("_")[0];
  const feedback = view.state.values.input_feedback.feedback_input
    .value as string;

  logger.info(`[VIEW] Submit new feedback called by ${user.id}`);

  await client.chat.postEphemeral({
    channel: channelId,
    user: user.id,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Feedback received!* Thanks for improving Trivia 🤝`,
        },
      },
    ],
  });

  await createFeedback(teamId, channelId, feedback, user);
};

export default handleSubmitFeedback;
