import { supabase } from "clients/supabase";
import { camelizeKeys } from "humps";

export interface User {
  id: string;
  teamId: string;
  name: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  timezone: string;
  isBot: boolean;
  isAdmin: boolean;
  isOwner: boolean;
  isPrimaryOwner: boolean;
  title: boolean;
}

export const createUser = async (user: User): Promise<User> => {
  const { data, error } = await supabase.from("jobs").insert(user).select();
  error && console.log(error, "[SQL ERROR]");
  return camelizeKeys(data) as unknown as User;
};
