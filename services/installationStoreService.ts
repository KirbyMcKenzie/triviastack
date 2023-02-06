import { Installation } from "@slack/bolt";
import { camelizeKeys } from "humps";
import { supabase } from "./supabaseClient";

export const createInstallationStore = async (
  teamId: string,
  installation: Installation
): Promise<void> => {
  const { error } = await supabase.from("installationStores").upsert(
    {
      team_id: teamId,
      installation,
    },
    { onConflict: "team_id" }
  );
  error && console.log(error, "[SQL ERROR]");
};

export const getInstallationStore = async (
  teamId: string
): Promise<Installation> => {
  const { data } = await supabase
    .from("installationStores")
    .select()
    .eq("team_id", teamId);
  console.log(
    //@ts-ignore
    data,
    "getInstallationStore:::::installationService"
  );
  //@ts-ignore
  return camelizeKeys(data[0].installation) as unknown as Installation;
};
