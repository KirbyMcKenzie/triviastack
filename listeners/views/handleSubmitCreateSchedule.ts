import {
  AllMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
} from "@slack/bolt/dist/types";
import { createSchedule } from "services/scheduleService";

const handleSubmitCreateSchedule = async ({
  ack,
  body,
  view,
}: SlackViewMiddlewareArgs<SlackViewAction> & AllMiddlewareArgs) => {
  await ack();

  const userId = body.user.id;
  const teamId = body.team?.id;
  const { input_time, input_timezone } = view.state.values;

  const {
    select_time: { selected_time },
  } = input_time;

  const {
    select_timezone: { selected_option: selected_timezone },
  } = input_timezone;

  await createSchedule({
    createdBy: userId,
    time: selected_time as string, // TODO: add timezone?
    timezone: selected_timezone?.value as string,
    channelId: "42069",
    teamId: teamId as string,
  });

  // await client.chat.postMessage({
  //   channel: channelId,
  //   ...questionBlock,
  // });
};

export default handleSubmitCreateSchedule;
