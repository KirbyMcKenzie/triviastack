import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";

const handleOpenModalCreateGame = async ({
  ack,
  body,
  client,
  logger,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  logger.info("handleOpenModalCreateGame called");
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
        callback_id: `start_game`,
        title: {
          type: "plain_text",
          text: "Create Quiz",
        },
        blocks: [
          {
            type: "input",
            block_id: "input_select_channel",
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
          {
            type: "input",
            block_id: "input_num_questions",
            element: {
              // @ts-ignore
              type: "number_input",
              is_decimal_allowed: false,
              initial_value: "10",
              max_value: "50",
              min_value: "1",
              action_id: "num_questions",
            },
            label: {
              type: "plain_text",
              text: "Number of Questions",
              emoji: true,
            },
          },
          {
            type: "input",
            block_id: "input_select_difficulty",
            element: {
              action_id: "select_difficulty",
              type: "static_select",
              initial_option: {
                text: {
                  type: "plain_text",
                  text: "🔀  All difficulties",
                  emoji: true,
                },
                value: "all",
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
                  value: "all",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Easy",
                    emoji: true,
                  },
                  value: "easy",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Medium",
                    emoji: true,
                  },
                  value: "medium",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "Hard",
                    emoji: true,
                  },
                  value: "hard",
                },
              ],
            },
            label: {
              type: "plain_text",
              text: "Difficulty",
              emoji: true,
            },
          },
          {
            type: "input",
            block_id: "input_select_categories",
            element: {
              type: "multi_static_select",
              action_id: "select_categories",
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
                  value: "arts_and_literature",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🎥  Film & TV",
                    emoji: true,
                  },
                  value: "film_and_tv",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🍔  Food & Drink",
                    emoji: true,
                  },
                  value: "food_and_drink",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "💡  General Knowledge",
                    emoji: true,
                  },
                  value: "general_knowledge",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🌏  Geography",
                    emoji: true,
                  },
                  value: "geography",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🏰  History",
                    emoji: true,
                  },
                  value: "history",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🎸  Music",
                    emoji: true,
                  },
                  value: "music",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🧪  Science",
                    emoji: true,
                  },
                  value: "science",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🏛️  Society & Culture",
                    emoji: true,
                  },
                  value: "society_and_culture",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "⚽️  Sport & Leisure",
                    emoji: true,
                  },
                  value: "sport_and_leisure",
                },
              ],
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "🎨  Arts & Literature",
                    emoji: true,
                  },
                  value: "arts_and_literature",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🎥  Film & TV",
                    emoji: true,
                  },
                  value: "film_and_tv",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🍔  Food & Drink",
                    emoji: true,
                  },
                  value: "food_and_drink",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "💡  General Knowledge",
                    emoji: true,
                  },
                  value: "general_knowledge",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🌏  Geography",
                    emoji: true,
                  },
                  value: "geography",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🏰  History",
                    emoji: true,
                  },
                  value: "history",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🎸  Music",
                    emoji: true,
                  },
                  value: "music",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🧪  Science",
                    emoji: true,
                  },
                  value: "science",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "🏛️  Society & Culture",
                    emoji: true,
                  },
                  value: "society_and_culture",
                },
                {
                  text: {
                    type: "plain_text",
                    text: "⚽️  Sport & Leisure",
                    emoji: true,
                  },
                  value: "sport_and_leisure",
                },
              ],
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

export default handleOpenModalCreateGame;
