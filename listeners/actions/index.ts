import { App } from "@slack/bolt";
import handleAnswerQuestion from "./handleAnswerQuestion";
import handleDismiss from "./handleDismiss";
import handleNextQuestion from "./handleNextQuestion";
import handleNoop from "./handleNoop";
import handleOpenModalFeedback from "./handleOpenModalFeedback";
import handleOpenModalQuickQuiz from "./handleOpenModalQuickQuiz";
import handlePlayAgain from "./handlePlayAgain";

const registerActions = (app: App) => {
  app.action(/answer_question/, handleAnswerQuestion);
  app.action(/dismiss/, handleDismiss);
  app.action(/feedback_open/, handleOpenModalFeedback);
  app.action(/quick_quiz_open/, handleOpenModalQuickQuiz);
  app.action(/next_question/, handleNextQuestion);
  app.action(/noop/, handleNoop);
  app.action(/play_again/, handlePlayAgain);
};

export default registerActions;
