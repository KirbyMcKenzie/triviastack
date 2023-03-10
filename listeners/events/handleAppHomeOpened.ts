import {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt/dist/types";

const isDev = process.env.NODE_ENV === "development";

const handleAppHomeOpened = async ({
  client,
  event,
  logger,
}: SlackEventMiddlewareArgs<"app_home_opened"> & AllMiddlewareArgs) => {
  const userId = event.user;
  logger.info(`[EVENT] App home opened by ${userId}`);

  await client.views.publish({
    user_id: userId,
    view: {
      type: "home",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Create Game",
            emoji: true,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: "Start a game of trivia in a selected channel with your choice of categories and difficulty.",
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "⚡️ Create Game",
              },
              value: "open_create_game",
              style: "primary",
              action_id: "open_create_game",
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "Daily Trivia (Coming Soon)",
            emoji: true,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: "Schedule trivia to begin at a specified time each day.",
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "⏳ Create Schedule",
              },
              value: "noop",
              style: "primary",
              action_id: isDev ? "open_create_schedule" : "noop",
            },
          ],
        },
      ],
    },
  });
};

export default handleAppHomeOpened;
