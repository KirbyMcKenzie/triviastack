//@ts-nocheck
import {
  AllMiddlewareArgs,
  SlackViewAction,
  SlackViewMiddlewareArgs,
} from "@slack/bolt/dist/types";
import { createSchedule } from "services/scheduleService";

const getDatetimeString = (time, timezone) => {
  const now = new Date(); // Get the current date and time in the user's timezone
  const [hour, minute] = time.split(":"); // Split the time parameter into hours and minutes

  // Create a new Date object in the timezone provided by the user
  const targetDate = new Date(
    now.toLocaleString("en-US", { timeZone: timezone })
  );

  // Set the hours and minutes of the target date to the provided time
  targetDate.setHours(hour);
  targetDate.setMinutes(minute);

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
  const { input_time, input_timezone } = view.state.values;

  const {
    select_time: { selected_time },
  } = input_time;

  const {
    select_timezone: { selected_option: selected_timezone },
  } = input_timezone;

  console.log(selected_time, "selected_time");
  console.log(selected_timezone?.value, "selected_timezone");

  const datetime = getDatetimeString("18:30", "Australia/Sydney");

  console.log(datetime, "datetime::datetime");
  console.log(
    new Date(datetime).toLocaleString("en-AU", {
      timeZone: "Australia/Sydney",
    }),
    "backtoSydneyTime::datetime"
  );

  // 9:30 am Sunday, in Melbourne VIC is 10:30 pm Saturday, Coordinated Universal Time (UTC)
  // 9:30 am Sunday, in Wellington is 8:30 pm Saturday, Coordinated Universal Time (UTC)
  // 9:30 am Saturday, in New York, NY, USA is 2:30 pm Saturday, Coordinated Universal Time (UTC)

  // TODO: finsd next occurance of shceulde time

  // if time today is past now, set date and time to tomorrow
  // if not past today, set to later today

  // // const nextOccurrence = findNextOccurrence("09:30", "Australia/Sydney");
  // const nextOccurrenceNZ = findNextOccurrence("09:30", "Pacific/Auckland");
  // // const nextOccurrenceNY = findNextOccurrence("09:30", "America/New_York");

  // // console.log(nextOccurrence, "nextOccurrence");
  // console.log(nextOccurrenceNZ, "nextOccurrenceNZ");
  // // console.log(nextOccurrenceNY, "nextOccurrenceNY");

  // await createSchedule({
  //   createdBy: userId,
  //   time: selected_time as string,
  //   timezone: selected_timezone?.value as string,
  //   channelId: "42069",
  //   teamId: teamId as string,
  //   nextJobDatetime: nextDt.toISOString(),
  // });

  // await client.chat.postMessage({
  //   channel: channelId,
  //   ...questionBlock,
  // });
};

export default handleSubmitCreateSchedule;
