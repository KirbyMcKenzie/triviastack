import { App } from "@slack/bolt";
import { handleActionAnswerQuestion } from "./handleActionAnswerQuestion";
import { handleActionDismiss } from "./handleActionDismiss";
import { handleActionNextQuestion } from "./handleActionNextQuestion";
import { handleActionNoop } from "./handleActionNoop";
import { handleActionOpenModalFeedback } from "./handleActionOpenModalFeedback";
import { handleActionPlayAgain } from "./handleActionPlayAgain";

const registerActions = (app: App) => {
  app.action(/answer_question/, handleActionAnswerQuestion);
  app.action(/next_question/, handleActionNextQuestion);
  app.action(/play_again/, handleActionPlayAgain);
  app.action(/feedback_open/, handleActionOpenModalFeedback);
  app.action(/dismiss/, handleActionDismiss);
  app.action(/noop/, handleActionNoop);
};

export default registerActions;
