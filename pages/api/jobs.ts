import { camelizeKeys } from "humps";
import { NextApiRequest, NextApiResponse } from "next";
import { updateJob } from "services/jobService";
import { handleCreateQuiz } from "jobs/handleCreateQuiz";
import { handleNewAppInstall } from "jobs/handleNewAppInstall";

export type JobType = "CREATE_QUIZ" | "NEW_APP_INSTALL";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { record } = camelizeKeys(req.body);
  const { id, status, retryCount, type } = record;
  console.log(`[JOBS] Job record updated - id: ${id}`);

  if (status === "success" || status === "failed") {
    console.log(`[JOBS] Job record ignored with status: ${status} - id: ${id}`);
    return await res.status(204);
  }

  if (retryCount >= 3) {
    // TODO: message user to inform of error
    console.log(`[JOBS] Job retry count exceed, marking as failed - id: ${id}`);
    await updateJob({
      id,
      status: "failed",
      updatedAt: new Date().toISOString(),
    });
    return await res.status(500);
  }

  try {
    switch (type) {
      case "CREATE_QUIZ":
        await handleCreateQuiz(record);
        break;
      case "NEW_APP_INSTALL":
        await handleNewAppInstall(record);
        break;

      default:
        console.log(`[JOBS] Unknown job type: ${type}`);
        break;
    }
    return await res.status(200);
  } catch (error) {
    console.log(`[JOBS] Job failed, updating job status - id: ${id}`);

    await updateJob({
      id,
      error: error as any,
      updatedAt: new Date().toISOString(),
      retryCount: retryCount + 1,
    });
  }

  return await res.status(200);
};

export default handler;

export const config = {
  api: {
    externalResolver: true,
  },
};
