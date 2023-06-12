import { Installation, LogLevel } from "@slack/bolt";
import {
  createInstallationStore,
  getInstallationStore,
} from "services/installationStoreService";
import NextConnectReceiver from "utils/NextConnectReceiver";

export const receiver = new NextConnectReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || "invalid",
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  processBeforeResponse: true,
  logLevel: LogLevel.INFO,
  stateSecret: "my-state-secret", // TODO: Change this
  scopes: [
    "channels:history",
    "chat:write",
    "commands",
    "im:history",
    "reactions:write",
    "chat:write.public",
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
        <h2>Thank you!</h2>
        <p>Redirecting to the Slack App... click <a href="${escapeHtml(
          redirectUrl
        )}">here</a>. If you use the browser version of Slack, click <a href="${escapeHtml(
          browserUrl
        )}" target="_blank">this link</a> instead.</p>
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
    storeInstallation: async (installation) => {
      if (installation.team !== undefined) {
        return await createInstallationStore(
          installation.team.id,
          installation
        );
      }
      console.log(
        `[ERROR] bolt-app [RECEIVER] storeInstallation failed for ${installation.user.id}`
      );
      throw new Error("Failed saving installation data to installationStore");
    },
    fetchInstallation: async (installQuery) => {
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
