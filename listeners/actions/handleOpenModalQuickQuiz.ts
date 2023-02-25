import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";

const handleOpenModalQuickQuiz = async ({
  ack,
  body,
  client,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();
  const channelId = body.channel?.id;
  try {
    // Call views.open with the built-in client
    await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      //@ts-ignore
      trigger_id: body.trigger_id,
      // View payload
      view: {
        type: "modal",
        callback_id: `start_quick_quiz`,
        title: {
          type: "plain_text",
          text: "Start Quick Quiz",
        },
        blocks: [
          {
            type: "input",
            block_id: "channels_input",
            element: {
              type: "channels_select",
              placeholder: {
                type: "plain_text",
                text: "Select channel",
                emoji: true,
              },
              action_id: "multi_channel_select",
            },
            label: {
              type: "plain_text",
              text: "Label",
              emoji: true,
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

export default handleOpenModalQuickQuiz;
