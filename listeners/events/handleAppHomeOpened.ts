import {
  AllMiddlewareArgs,
  SlackEventMiddlewareArgs,
} from "@slack/bolt/dist/types";

const handleAppHomeOpened = async ({
  event,
  client,
}: SlackEventMiddlewareArgs<"app_home_opened"> & AllMiddlewareArgs) => {
  await client.views.publish({
    user_id: event.user,
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
                text: "⚡️ Create Quiz",
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
              action_id: "noop",
            },
          ],
        },
      ],
    },
  });
};

export default handleAppHomeOpened;
