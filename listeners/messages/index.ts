import { App } from "@slack/bolt";

import handleBloodyOath from "./handleBloodyOath";
import handleYeet from "./handleYeet";
import handleYoza from "./handleMessageYoza";

const isDev = process.env.NODE_ENV === "development";

const registerMessages = (app: App) => {
  isDev && app.message("yeet", handleYeet);
  app.message("yeet", handleYeet);
  app.message("yoza", handleYoza);
  app.message(/bloody oath/, handleBloodyOath);
};

export default registerMessages;
