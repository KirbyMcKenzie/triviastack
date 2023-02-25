import { App } from "@slack/bolt";
import handleSubmitFeedback from "./handleSubmitFeedback";
import handleSubmitStartQuickQuiz from "./handleSubmitStartQuickQuiz";

const registerViews = (app: App) => {
  app.view(/submit_feedback/, handleSubmitFeedback);
  app.view(/start_quick_quiz/, handleSubmitStartQuickQuiz);
};

export default registerViews;
