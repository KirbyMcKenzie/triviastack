import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";

const handleOpenModalCreateSchedule = async ({
  ack,
  body,
  client,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();
  const channelId = body.channel?.id;
  try {
    // Call views.open with the built-in client
    await client.views.open({
      //@ts-ignore
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: `submit_create_schedule`,
        title: {
          type: "plain_text",
          text: "Create Schedule",
          emoji: true,
        },
        submit: {
          type: "plain_text",
          text: "Submit",
          emoji: true,
        },
        close: {
          type: "plain_text",
          text: "Cancel",
          emoji: true,
        },
        blocks: [
          {
            type: "section",
            block_id: "section1",
            text: {
              type: "mrkdwn",
              text: "Pick a time for trivia to begin each day.",
            },
            accessory: {
              type: "timepicker",
              action_id: "timepicker123",
              initial_time: "10:00",
              placeholder: {
                type: "plain_text",
                text: "Select a time",
              },
            },
          },
          {
            type: "divider",
          },
          // TODO: See if possible to get current users timezone
          {
            type: "section",
            block_id: "section2",
            text: {
              type: "mrkdwn",
              text: "Select the timezone for the schedule",
            },
            accessory: {
              type: "static_select",
              action_id: "timepicker123",
              options: [
                {
                  value: "(UTC+09:30) Darwin",
                  text: {
                    type: "plain_text",
                    text: "(UTC+09:30) Darwin",
                    emoji: true,
                  },
                },
                {
                  value: "(UTC+10:00) Brisbane",
                  text: {
                    type: "plain_text",
                    text: "(UTC+10:00) Brisbane",
                    emoji: true,
                  },
                },
                {
                  value: "(UTC+10:00) Canberra, Melbourne, Sydney",
                  text: {
                    type: "plain_text",
                    text: "(UTC+10:00) Canberra, Melbourne, Sydney",
                    emoji: true,
                  },
                },
              ],
            },
          },
        ],
      },
    });
    // logger.info(result);
  } catch (error) {
    // logger.error(error);
    console.log(error);
  }
};

export default handleOpenModalCreateSchedule;
