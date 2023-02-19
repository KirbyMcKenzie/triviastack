import { App } from "@slack/bolt";
import handleAppHomeOpened from "./handleAppHomeOpened";

const registerEvents = (app: App) => {
  app.event("app_home_opened", handleAppHomeOpened);
};

export default registerEvents;
