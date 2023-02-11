import { App } from "@slack/bolt";
import { handleViewSubmitFeedback } from "./handleViewSubmitFeedback";

const registerViews = (app: App) => {
  app.view(/submit_feedback/, handleViewSubmitFeedback);
};

export default registerViews;
