import { App } from "@slack/bolt";
import handleSubmitFeedback from "./handleSubmitFeedback";

const registerViews = (app: App) => {
  app.view(/submit_feedback/, handleSubmitFeedback);
};

export default registerViews;
