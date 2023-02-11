import { App } from "@slack/bolt";
import registerActions from "./actions";
import registerMessages from "./messages";
import registerCommands from "./commands";
import registerViews from "./views";

export const registerListeners = (app: App) => {
  registerActions(app);
  registerCommands(app);
  registerMessages(app);
  registerViews(app);
};
