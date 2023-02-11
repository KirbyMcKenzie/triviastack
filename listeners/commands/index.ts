import { App } from "@slack/bolt";
import { handleCommandQuickQuiz } from "./handleCommandQuickQuiz";

const registerCommands = (app: App) => {
  app.command("/trivia", handleCommandQuickQuiz);
};

export default registerCommands;
