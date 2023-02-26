import { App } from "@slack/bolt";
import handleSubmitFeedback from "./handleSubmitFeedback";
import handleSubmitStartGame from "./handleSubmitStartGame";

const registerViews = (app: App) => {
  app.view(/submit_feedback/, handleSubmitFeedback);
  app.view(/start_game/, handleSubmitStartGame);
};

export default registerViews;
