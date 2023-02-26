import { App } from "@slack/bolt";
import handleAnswerQuestion from "./handleAnswerQuestion";
import handleDismiss from "./handleDismiss";
import handleNextQuestion from "./handleNextQuestion";
import handleNoop from "./handleNoop";
import handleOpenModalFeedback from "./handleOpenModalFeedback";
import handleOpenModalCreateGame from "./handleOpenModalCreateGame";
import handlePlayAgain from "./handlePlayAgain";

const registerActions = (app: App) => {
  app.action(/answer_question/, handleAnswerQuestion);
  app.action(/dismiss/, handleDismiss);
  app.action(/open_feedback/, handleOpenModalFeedback);
  app.action(/open_create_game/, handleOpenModalCreateGame);
  app.action(/next_question/, handleNextQuestion);
  app.action(/noop/, handleNoop);
  app.action(/play_again/, handlePlayAgain);
};

export default registerActions;
