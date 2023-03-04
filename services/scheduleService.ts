import { supabase } from "../clients/supabase";

export interface CreateSchedule {
  teamId: string;
  channelId: string;
  createdBy: string;
  time: string;
  timezone: string;
}

export const createSchedule = async ({
  teamId,
  channelId,
  createdBy,
  time,
  timezone,
}: CreateSchedule): Promise<void> => {
  const { data, error } = await supabase
    .from("schedules")
    .insert({
      team_id: teamId,
      channel_id: channelId,
      created_by: createdBy,
      time,
      timezone,
    })
    .select();
  error && console.log(error, "[SQL ERROR]");
};
