import { supabase } from "clients/supabase";
import { camelizeKeys, decamelizeKeys } from "humps";

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
  teamId: string;
  retryCount?: number;
  error?: string;
}

export interface NewJob {
  type: JobType;
  payload?: unknown;
  createdBy: string;
  teamId: string;
}

export const createNewJob = async ({
  type,
  payload,
  createdBy,
  teamId,
}: NewJob): Promise<Job> => {
  const { data, error } = await supabase
    .from("jobs")
    .insert({
      type: type,
      created_by: createdBy,
      team_id: teamId,
      payload: payload,
    })
    .select();
  error && console.log(error, "[SQL ERROR]");
  return camelizeKeys(data) as unknown as Job;
};

export const updateJob = async (job: Partial<Job>): Promise<void> => {
  const { error } = await supabase
    .from("jobs")
    .update({ ...decamelizeKeys(job) })
    .eq("id", job.id);
  error && console.log(error, "[SQL ERROR]");
};
