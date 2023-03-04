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

  const userId = body.user.id;
  const { input_time, input_timezone } = view.state.values;

  const {
    select_time: { selected_time },
  } = input_time;

  const {
    select_timezone: { selected_option: selected_timezone },
  } = input_timezone;

  console.log(userId, "userId");
  console.log(selected_time, "input_time::selected_time");
  console.log(selected_timezone?.value, "input_timezone::value");

  // await client.chat.postMessage({
  //   channel: channelId,
  //   ...questionBlock,
  // });
};

export default handleSubmitCreateSchedule;
