import {
  AllMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
} from "@slack/bolt/dist/types";
import { createSchedule } from "services/scheduleService";
import { format, utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

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

  console.log(selected_time, "selected_time");
  console.log(selected_timezone?.value, "selected_timezone");

  // Parse the datetime string into a Date object in the timezone
  const dt = utcToZonedTime(new Date(), selected_timezone?.value as string);

  // Get the next occurrence of the datetime in the timezone
  let nextDt = new Date(dt);
  nextDt.setHours(
    // @ts-ignore
    selected_time.split(":")[0],
    // @ts-ignore
    selected_time.split(":")[1],
    0,
    0
  );
  if (nextDt < dt) {
    nextDt.setDate(nextDt.getDate() + 1);
  }

  console.log(nextDt.toISOString(), "neztDate");

  // 9:30 am Sunday, in Melbourne VIC is 10:30 pm Saturday, Coordinated Universal Time (UTC)
  // 9:30 am Sunday, in Wellington is 8:30 pm Saturday, Coordinated Universal Time (UTC)
  // 9:30 am Saturday, in New York, NY, USA is 2:30 pm Saturday, Coordinated Universal Time (UTC)

  await createSchedule({
    createdBy: userId,
    time: selected_time as string,
    timezone: selected_timezone?.value as string,
    channelId: "42069",
    teamId: teamId as string,
    nextJobDatetime: nextDt.toISOString(),
  });

  // await client.chat.postMessage({
  //   channel: channelId,
  //   ...questionBlock,
  // });
};

export default handleSubmitCreateSchedule;
