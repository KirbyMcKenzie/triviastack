import { Installation } from "@slack/bolt";
import { camelizeKeys } from "humps";
import { supabase } from "./supabaseClient";

export const createInstallationStore = async (
  teamId: string,
  installation: Installation
): Promise<void> => {
  const { error } = await supabase.from("installationStores").insert({
    team_id: teamId,
    installation,
  });
  error && console.log(error, "[SQL ERROR]");
};

export const getInstallationStore = async (
  teamId: string
): Promise<Installation> => {
  const { data } = await supabase
    .from("installationStores")
    .select()
    .eq("channel_id", teamId);

  return camelizeKeys(data) as unknown as Installation;
};
