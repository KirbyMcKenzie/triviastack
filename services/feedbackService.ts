import { SlackUser } from "types/user";
import { supabase } from "./supabaseClient";

// TODO: consider using object params here
export const createFeedback = async (
  teamId: string,
  channelId: string,
  feedback: string,
  user: SlackUser
): Promise<void> => {
  const { error } = await supabase.from("feedbacks").insert({
    team_id: teamId,
    channel_id: channelId,
    feedback,
    user,
  });
  error && console.log(error, "[SQL ERROR]");
};
