import { supabase } from "clients/supabase";
import { camelizeKeys, decamelizeKeys } from "humps";

export interface User {
  id: string;
  teamId: string;
  name: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  timezone?: string;
  isBot: boolean;
  isAdmin: boolean;
  isOwner: boolean;
  isPrimaryOwner: boolean;
  title?: string;
}

export type NewUser = Omit<User, "updatedAt" | "createdAt">;

// TODO: Probably don't need to return the new users here
export const createUser = async (user: NewUser): Promise<User> => {
  const { data, error } = await supabase
    .from("users")
    .insert(decamelizeKeys(user))
    .select();
  error && console.log(error, "[SQL ERROR]");
  return camelizeKeys(data) as unknown as User;
};
