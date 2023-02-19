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
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Welcome home, <@" + event.user + "> :house:*",
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "🚧  We're working hard to make this space feel nice and cozy, *check back soon!*  🚧",
          },
        },
        {
          type: "image",
          block_id: "image4",
          image_url: "https://i.giphy.com/media/3orifgBu5DCkYU0nM4/giphy.webp",
          alt_text: "Progress",
        },
      ],
    },
  });
};

export default handleAppHomeOpened;
