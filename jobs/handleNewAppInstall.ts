import { camelizeKeys } from "humps";
import { NextApiRequest } from "next";
import { WebClient } from "@slack/web-api";
import { createUser } from "services/userService";
import { updateJob } from "services/jobService";

export const handleNewAppInstall = async (record: Record<string, any>) => {
  const { createdBy, payload, id } = record;
  const { installation } = payload;
  console.log(`[JOBS] handleNewAppInstall triggered by ${createdBy}`);

  const { user } = await new WebClient(installation.bot?.token).users.info({
    user: installation.user.id,
    token: installation.user.token,
  });

  console.log("Attempting to create new users");
  // TODO: upsert this
  await createUser({
    id: installation.user.id,
    teamId: installation.team?.id || "",
    displayName: user?.name || "",
    name: user?.real_name || "",
    title: user?.profile?.title,
    timezone: user?.tz,
    isAdmin: !!user?.is_admin,
    isBot: !!user?.is_bot,
    isOwner: !!user?.is_owner,
    isPrimaryOwner: !!user?.is_primary_owner,
  });

  await new WebClient(process.env.SLACK_BOT_TOKEN).chat
    .postMessage({
      channel: process.env.SLACK_CHANNEL_APP_INSTALL || "No Channel Set",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `🎉 *New App Install* 🎉 \n\nWorkspace: *${
              installation.team?.name
            }*\nInstalled by: *${user?.real_name || user?.name}*`,
          },
        },
      ],
    })
    .then(async () => {
      console.log(`[JOBS] Job successful, updating job status - id: ${id}`);

      await updateJob({
        id,
        status: "success",
        updatedAt: new Date().toISOString(),
      });
    });
};
