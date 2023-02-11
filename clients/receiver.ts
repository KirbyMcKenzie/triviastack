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
  logLevel: LogLevel.DEBUG,
  stateSecret: "my-state-secret",
  scopes: [
    "channels:history",
    "chat:write",
    "commands",
    "im:history",
    "reactions:write",
  ],
  // TODO: move this out of here
  installationStore: {
    storeInstallation: async (installation) => {
      console.log("storeInstallation called");
      if (installation.team !== undefined) {
        return await createInstallationStore(
          installation.team.id,
          installation
        );
      }
      // TODO: Log and alert
      throw new Error("Failed saving installation data to installationStore");
    },
    fetchInstallation: async (installQuery) => {
      console.log("fetchInstallation called");
      if (installQuery.teamId !== undefined) {
        return await getInstallationStore(installQuery.teamId);
      }
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
