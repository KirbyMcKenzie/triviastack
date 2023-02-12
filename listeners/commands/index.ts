import { App } from "@slack/bolt";
import handleQuickQuiz from "./handleQuickQuiz";

const registerCommands = (app: App) => {
  app.command("/trivia", handleQuickQuiz);
};

export default registerCommands;
