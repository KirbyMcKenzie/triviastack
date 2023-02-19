import { App } from "@slack/bolt";
import registerActions from "./actions";
import registerCommands from "./commands";
import registerEvents from "./events";
import registerMessages from "./messages";
import registerViews from "./views";

export const registerListeners = (app: App) => {
  registerActions(app);
  registerCommands(app);
  registerEvents(app);
  registerMessages(app);
  registerViews(app);
};
