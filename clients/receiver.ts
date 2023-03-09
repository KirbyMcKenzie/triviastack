import { LogLevel } from "@slack/bolt";
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
  installationStore: {
    // TODO: could we scan for extra data at this point?
    // TODO: could we start onboarding here?
    storeInstallation: async (installation) => {
      if (installation.team !== undefined) {
        return await createInstallationStore(
          installation.team.id,
          installation
        );
      }
      console.log(
        `[ERROR] bolt-app [RECEIVER] storeInstallation failed for  ${installation.team.id}`
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
