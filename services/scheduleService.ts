import { supabase } from "../clients/supabase";

export interface CreateSchedule {
  teamId: string;
  channelId: string;
  createdBy: string;
  time: string;
  timezone: string;
  nextJobDatetime: string;
}

export const createSchedule = async ({
  teamId,
  channelId,
  createdBy,
  time,
  timezone,
  nextJobDatetime,
}: CreateSchedule): Promise<void> => {
  const { data, error } = await supabase
    .from("schedules")
    .insert({
      team_id: teamId,
      channel_id: channelId,
      created_by: createdBy,
      time,
      timezone,
      next_job_datetime: nextJobDatetime,
    })
    .select();
  error && console.log(error, "[SQL ERROR]");
};
