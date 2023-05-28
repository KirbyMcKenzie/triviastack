import { supabase } from "clients/supabase";
import { camelizeKeys } from "humps";

export type JobType = "CREATE_QUIZ";

export interface Job {
  id: string;
  type: JobType;
  payload?: unknown;
  status: "pending" | "in_progress" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  createdBy: string;
  retryCount?: number;
  error?: string;
}

export type NewJob = Omit<Job, "id" | "status" | "updatedAt" | "createdAt">;

export const createNewJob = async ({
  type,
  payload,
  createdBy,
}: NewJob): Promise<Job> => {
  const { data, error } = await supabase
    .from("jobs")
    .insert({
      type: type,
      created_by: createdBy,
      payload: payload,
    })
    .select();
  error && console.log(error, "[SQL ERROR]");
  return camelizeKeys(data) as unknown as Job;
};
