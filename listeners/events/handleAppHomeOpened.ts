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
            text: "Quick Trivia",
            emoji: true,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: "Start a game of trivia in a selected channel with your default quiz settings.",
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
                text: "⚡️ Start Quiz",
              },
              value: "quick_quiz_open",
              style: "primary",
              action_id: "quick_quiz_open",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "⚙️  Edit Quick Settings",
              },
              value: "click_me_123",
              action_id: "actionId-1",
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
            text: "Custom Trivia",
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
              value: "click_me_123",
              style: "primary",
              action_id: "actionId-0",
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
            text: "Daily Trivia",
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
              value: "click_me_123",
              style: "primary",
              action_id: "actionId-0",
            },
          ],
        },
      ],
    },
  });
};

export default handleAppHomeOpened;
