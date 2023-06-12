import { Installation } from "@slack/bolt";
import { camelizeKeys } from "humps";
import { supabase } from "../clients/supabase";

export const createInstallationStore = async (
  teamId: string,
  installation: Installation
): Promise<void> => {
  const { error } = await supabase.from("installations").upsert(
    {
      team_id: teamId,
      installation,
    }
    // { onConflict: "team_id" }
  );
  error && console.log(error, "[SQL ERROR]");
};

export const getInstallationStore = async (
  teamId: string
): Promise<Installation> => {
  const { data } = await supabase
    .from("installations")
    .select()
    .eq("team_id", teamId);
  //@ts-ignore
  return camelizeKeys(data[0].installation) as unknown as Installation;
};
