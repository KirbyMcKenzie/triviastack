import { Installation } from "@slack/bolt";
import { camelizeKeys } from "humps";
import { supabase } from "../clients/supabase";

export const createInstallationStore = async (
  installation: Installation
): Promise<void> => {
  const { error } = await supabase.from("teams").upsert({
    id: installation.team?.id,
    name: installation.team?.name,
    installed_by: installation.user.id,
    installation,
  });
  error && console.log(error, "[SQL ERROR]");
};

export const getInstallationStore = async (
  teamId: string
): Promise<Installation> => {
  const { data } = await supabase.from("teams").select().eq("id", teamId);
  //@ts-ignore
  return camelizeKeys(data[0].installation) as unknown as Installation;
};
