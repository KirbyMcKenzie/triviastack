import { App } from "@slack/bolt";
import { handleMessageBloodyOath } from "./handleMessageBloodyOath";
import { handleMessageYeet } from "./handleMessageYeet";
import { handleMessageYoza } from "./handleMessageYoza";

const isDev = process.env.NODE_ENV === "development";

const registerMessages = (app: App) => {
  isDev && app.message("yeet", handleMessageYeet);
  app.message("yoza", handleMessageYoza);
  app.message(/bloody oath/, handleMessageBloodyOath);
};

export default registerMessages;
