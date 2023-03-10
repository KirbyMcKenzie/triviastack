import { App } from "@slack/bolt";

import handleBloodyOath from "./handleBloodyOath";
import handleYoza from "./handleMessageYoza";

const registerMessages = (app: App) => {
  app.message("yoza", handleYoza);
  app.message(/bloody oath/, handleBloodyOath);
};

export default registerMessages;
