import { Installation, LogLevel } from "@slack/bolt";
import {
  createInstallationStore,
  getInstallationStore,
} from "services/installationStoreService";
import NextConnectReceiver from "utils/NextConnectReceiver";
import { createNewJob } from "services/jobService";

export const receiver = new NextConnectReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || "invalid",
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  processBeforeResponse: true,
  logLevel: LogLevel.INFO,
  // @ts-ignore
  unhandledRequestTimeoutMillis: 30000,
  stateSecret: "my-state-secret", // TODO: Change this
  scopes: [
    "channels:history",
    "chat:write",
    "commands",
    "im:history",
    "im:write",
    "reactions:write",
    "chat:write.public",
    "users:read",
    "team:read",
  ],
  installerOptions: {
    directInstall: true,
    callbackOptions: {
      success(installation, _options, _callbackReq, callbackRes) {
        let redirectUrl: string;

        if (isNotOrgInstall(installation) && installation.appId !== undefined) {
          // redirect back to Slack native app
          // Changes to the workspace app was installed to, to the app home
          redirectUrl = `slack://app?team=${installation.team.id}&id=${installation.appId}`;
        } else if (isOrgInstall(installation)) {
          // redirect to Slack app management dashboard
          redirectUrl = `${installation.enterpriseUrl}manage/organization/apps/profile/${installation.appId}/workspaces/add`;
        } else {
          // redirect back to Slack native app
          // does not change the workspace the slack client was last in
          redirectUrl = "slack://open";
        }
        let browserUrl = redirectUrl;
        if (isNotOrgInstall(installation)) {
          browserUrl = `https://app.slack.com/client/${installation.team.id}`;
        }
        const htmlResponse = `<html>
        <head>
        <meta http-equiv="refresh" content="0; URL=${escapeHtml(redirectUrl)}">
        <style>
        body {
          padding: 10px 15px;
          font-family: verdana;
          text-align: center;
        }
        </style>
        </head>
        <body>
        <h2>Installation Successful</h2>
        <p>Redirecting to the Slack App... if Slack doesn't open, <a href="${escapeHtml(
          redirectUrl
        )}">click this link</a>. If you prefer to use Slack in the browser, <a href="${escapeHtml(
          browserUrl
        )}" target="_blank">click this link</a> instead.</p>
        </body>
        </html>`;
        callbackRes.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
        });
        callbackRes.end(htmlResponse);
      },
    },
  },
  installationStore: {
    // TODO: tidy up, add try catch
    // populate new team and users data
    storeInstallation: async (installation) => {
      if (installation.team !== undefined) {
        return await createInstallationStore(installation).then(async () => {
          await createNewJob({
            createdBy: installation.user.id,
            teamId: installation.team?.id as string,
            type: "NEW_APP_INSTALL",
            payload: {
              installation,
            },
          });
        });
      }
      console.log(
        `[ERROR] bolt-app [RECEIVER] storeInstallation failed for ${installation.user.id}`
      );
      throw new Error("Failed saving installation data to installationStore");
    },
    fetchInstallation: async (installQuery) => {
      console.log("Fetching installation");
      if (installQuery.teamId !== undefined) {
        return await getInstallationStore(installQuery.teamId);
      }
      console.log(
        `[ERROR] bolt-app [RECEIVER] fetchInstallation failed for  ${installQuery.teamId}`
      );
      throw new Error("Failed fetching installation");
    },
    // TODO: implement this with soft delete
    //   deleteInstallation: async (installQuery) => {
    //     if (installQuery.teamId !== undefined) {
    //       // single team app installation deletion
    //       return await database.delete(installQuery.teamId);
    //     }
    //     throw new Error("Failed to delete installation");
    //   },
  },
});

// Type guard to narrow Installation type to OrgInstallation
function isOrgInstall(
  installation: Installation
): installation is Installation<"v2", true> {
  return installation.isEnterpriseInstall || false;
}

function isNotOrgInstall(
  installation: Installation
): installation is Installation<"v1" | "v2", false> {
  return !isOrgInstall(installation);
}

export function escapeHtml(input: string | undefined | null): string {
  if (input) {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  }
  return "";
}
