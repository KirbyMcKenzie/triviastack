import {
  AllMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
} from "@slack/bolt/dist/types";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { createSchedule } from "services/scheduleService";

// TODO: rework the fuck out of this
const getDatetimeString = (time: string, timezone: string) => {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: timezone })
  ); // Get the current date and time in the user's timezone
  const [hour, minute] = time.split(":"); // Split the time parameter into hours and minutes

  // Create a new Date object in the timezone provided by the user
  const targetDate = new Date(
    now.toLocaleString("en-US", { timeZone: timezone })
  );

  // Set the hours and minutes of the target date to the provided time
  targetDate.setHours(parseInt(hour));
  targetDate.setMinutes(parseInt(minute));
  targetDate.setSeconds(0);

  // Check if the target time has already passed for today
  if (now.getTime() > targetDate.getTime()) {
    // If it has, add one day to the target date
    targetDate.setDate(targetDate.getDate() + 1);
  }

  // Return the target date as a datetime string
  return targetDate.toISOString();
};

const handleSubmitCreateSchedule = async ({
  ack,
  body,
  view,
}: SlackViewMiddlewareArgs<SlackViewAction> & AllMiddlewareArgs) => {
  await ack();

  const userId = body.user.id;
  const teamId = body.team?.id;
  const { input_time, input_timezone, input_channel } = view.state.values;

  const channelId = input_channel.select_channel.selected_channel as string;

  const {
    select_time: { selected_time },
  } = input_time;

  const {
    select_timezone: { selected_option: selected_timezone },
  } = input_timezone;

  console.log(selected_time, "selected_time");
  console.log(selected_timezone?.value, "selected_timezone");

  const datetime = getDatetimeString(
    selected_time as string,
    selected_timezone?.value as string
  );

  await createSchedule({
    createdBy: userId,
    time: selected_time as string,
    timezone: selected_timezone?.value as string,
    channelId: channelId,
    teamId: teamId as string,
    nextJobDatetime: datetime,
  });

  // await client.chat.postMessage({
  //   channel: channelId,
  //   ...questionBlock,
  // });
};

export default handleSubmitCreateSchedule;
