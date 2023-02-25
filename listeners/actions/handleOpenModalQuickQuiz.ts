import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";

const handleOpenModalQuickQuiz = async ({
  ack,
  body,
  client,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();
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
          text: "Create Quiz",
        },
        blocks: [
          {
            type: "input",
            element: {
              type: "conversations_select",
              action_id: "channel-select",
            },
            label: {
              type: "plain_text",
              text: "Select Channel",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              // @ts-ignore
              type: "number_input",
              is_decimal_allowed: false,
              initial_value: "10",
              max_value: "50",
              min_value: "1",
              action_id: "number_input-action",
            },
            label: {
              type: "plain_text",
              text: "Number of Questions",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "static_select",
              initial_option: {
                text: {
                  type: "plain_text",
                  text: "🔀  All difficulties",
                  emoji: true,
                },
                value: "category-all",
              },
              placeholder: {
                type: "plain_text",
                text: "Select an item",
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "🔀  All difficulties",
                    emoji: true,
                  },
                  value: "category-all",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Easy",
                    emoji: true,
                  },
                  value: "difficulty-easy",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Medium",
                    emoji: true,
                  },
                  value: "difficulty-medium",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Hard",
                    emoji: true,
                  },
                  value: "difficulty-hard",
                },
              ],
              action_id: "static_select-difficulty",
            },
            label: {
              type: "plain_text",
              text: "Difficulty",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "multi_static_select",
              placeholder: {
                type: "plain_text",
                text: "Select an item",
                emoji: true,
              },
              initial_options: [
                {
                  text: {
                    type: "plain_text",
                    text: "🎨  Arts & Literature",
                    emoji: true,
                  },
                  value: "category-arts-literature",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🎥  Film & TV",
                    emoji: true,
                  },
                  value: "category-film-tv",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🍔  Food & Drink",
                    emoji: true,
                  },
                  value: "category-food-drink",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "💡  General Knowledge",
                    emoji: true,
                  },
                  value: "category-general-knowledge",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🌏  Geography",
                    emoji: true,
                  },
                  value: "category-geography",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🏰  History",
                    emoji: true,
                  },
                  value: "category-history",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🎸  Music",
                    emoji: true,
                  },
                  value: "category-music",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🧪  Science",
                    emoji: true,
                  },
                  value: "category-science",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🏛️  Society & Culture",
                    emoji: true,
                  },
                  value: "category-society--culture",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "⚽️  Sport & Leisure",
                    emoji: true,
                  },
                  value: "category-sport",
                },
              ],
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "🎨  Arts & Literature",
                    emoji: true,
                  },
                  value: "category-arts-literature",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🎥  Film & TV",
                    emoji: true,
                  },
                  value: "category-film-tv",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🍔  Food & Drink",
                    emoji: true,
                  },
                  value: "category-food-drink",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "💡  General Knowledge",
                    emoji: true,
                  },
                  value: "category-general-knowledge",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🌏  Geography",
                    emoji: true,
                  },
                  value: "category-geography",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🏰  History",
                    emoji: true,
                  },
                  value: "category-history",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🎸  Music",
                    emoji: true,
                  },
                  value: "category-music",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🧪  Science",
                    emoji: true,
                  },
                  value: "category-science",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🏛️  Society & Culture",
                    emoji: true,
                  },
                  value: "category-society--culture",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "⚽️  Sport & Leisure",
                    emoji: true,
                  },
                  value: "category-sport",
                },
              ],
              action_id: "category-select ",
            },
            label: {
              type: "plain_text",
              text: "Categories",
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
