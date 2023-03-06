import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";
import { timezones } from "utils/datetime";

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
            type: "input",
            block_id: "input_channel",
            element: {
              type: "channels_select",
              action_id: "select_channel",
            },
            label: {
              type: "plain_text",
              text: "Channel",
              emoji: true,
            },
          },
          // TODO: Maybe update to select with 15 min increments
          {
            type: "input",
            block_id: "input_time",
            element: {
              type: "timepicker",
              initial_time: "09:30",
              placeholder: {
                type: "plain_text",
                text: "Select time",
                emoji: true,
              },
              action_id: "select_time",
            },
            label: {
              type: "plain_text",
              text: "Select Time",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
          // TODO: See if possible to get current users timezone
          {
            type: "input",
            block_id: "input_timezone",
            element: {
              action_id: "select_timezone",
              type: "static_select",
              // initial_option: {
              //   value: "(UTC+10:00) Canberra, Melbourne, Sydney",
              //   text: {
              //     type: "plain_text",
              //     text: "(UTC+10:00) Canberra, Melbourne, Sydney",
              //     emoji: true,
              //   },
              // },
              placeholder: {
                type: "plain_text",
                text: "Select an item",
                emoji: true,
              },
              options: timezones.map(({ label, value }) => ({
                value,
                text: {
                  type: "plain_text",
                  text: label,
                  emoji: true,
                },
              })),
            },
            label: {
              type: "plain_text",
              text: "Select Timezone",
              emoji: true,
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
