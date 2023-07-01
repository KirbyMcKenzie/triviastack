import { AllMiddlewareArgs, SlackActionMiddlewareArgs } from "@slack/bolt";
import {
  getQuizById,
  updateQuiz,
  updateQuizCurrentQuestion,
} from "services/quizService";
import { Question } from "types/quiz";
import { buildQuizCompleteBlock, buildQuestionBlock } from "utils/blocks";

// TODO: refactor flow
// get first unansweredQuestion
// if none, finish the game
// respond with latest question
const handleNextQuestion = async ({
  ack,
  action,
  body,
  logger,
  respond,
}: SlackActionMiddlewareArgs & AllMiddlewareArgs) => {
  await ack();

  const answerValue = (body as any).actions[0].value;
  const userId = body?.user.id;
  const quizId = (action as any).action_id.split("_")[2];

  logger.info(`[ACTION] Next question called by ${userId}`);

  const quiz = await getQuizById(quizId);
  const { currentQuestion, questions } = quiz;

  const nextQuestion = questions[currentQuestion];
  const previousQuestion = questions[currentQuestion - 1];
  const isCorrect = previousQuestion.correctAnswer === answerValue;

  const updatedQuestions = questions.map((q: Question, index: number) =>
    index + 1 === currentQuestion ? { ...q, is_correct: isCorrect } : q
  );

  if (currentQuestion === questions.length) {
    //@ts-ignore
    // TODO: double check if this is still working
    await updateQuiz(quizId, { is_active: false });

    const score = updatedQuestions.filter(
      ({ isCorrect }: Question) => isCorrect
    ).length;

    // TODO: add quiz id to pass to play_again block
    const quizCompleteBlock = buildQuizCompleteBlock(quizId, score, questions.length);
    await respond(quizCompleteBlock);
    return;
  }

  const questionBlock = buildQuestionBlock({
    quizId,
    question: nextQuestion,
    currentQuestion: currentQuestion + 1,
    totalQuestions: questions.length,
    answeredValue: answerValue,
    userId,
  });

  logger.info(`[ACTION] next question block: ${JSON.stringify(questionBlock)}`);

  await respond(questionBlock).catch((error) =>
    // logger.error(`[ACTION] next question respond question block - ${error}`)
    console.log(error)
  );
  await updateQuizCurrentQuestion(quizId, currentQuestion + 1);
};

export default handleNextQuestion;
