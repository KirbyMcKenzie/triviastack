import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";

const handleOpenModalFeedback = async ({
  ack,
  body,
  client,
  logger,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();
  const channelId = body.channel?.id;
  logger.info(`[ACTION] Open feedback modal called by ${body.user.id}`);

  try {
    // Call views.open with the built-in client
    await client.views.open({
      //@ts-ignore
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: `${channelId}_submit_feedback`,
        title: {
          type: "plain_text",
          text: "Give Feedback",
        },
        blocks: [
          {
            type: "input",
            block_id: "input_feedback",
            label: {
              type: "plain_text",
              text: "What can we do to improve?",
            },
            element: {
              type: "plain_text_input",
              action_id: "feedback_input",
              multiline: true,
            },
          },
        ],
        submit: {
          type: "plain_text",
          text: "Submit",
        },
      },
    });
    // logger.info(result);
  } catch (error) {
    // logger.error(error);
    console.log(error);
  }
};

export default handleOpenModalFeedback;
