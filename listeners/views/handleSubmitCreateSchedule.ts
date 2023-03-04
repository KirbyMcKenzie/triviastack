import {
  AllMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
} from "@slack/bolt/dist/types";

const handleSubmitCreateSchedule = async ({
  ack,
  body,
  view,
  client,
}: SlackViewMiddlewareArgs<SlackViewAction> & AllMiddlewareArgs) => {
  await ack();

  console.log(view, "view");
  // const userId = body.user.id;
  // const {
  //   input_num_questions,
  //   input_select_difficulty,
  //   input_select_categories,
  //   input_select_channel,
  // } = view.state.values;

  // await client.chat.postMessage({
  //   channel: channelId,
  //   ...questionBlock,
  // });
};

export default handleSubmitCreateSchedule;
