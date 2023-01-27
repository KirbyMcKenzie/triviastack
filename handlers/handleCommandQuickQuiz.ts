import { SlackCommandMiddlewareArgs } from "@slack/bolt/dist/types";
import apiClient from "services/apiClient";
import { createNewQuiz } from "services/quizService";
import { shuffle } from "utils/array";
import {
  buildErrorMaxQuestionsExceeded,
  buildQuestionAnswersBlock,
  buildQuestionBlock,
  buildQuizNewGameHeader,
} from "utils/blocks";

const DEFAULT_NUM_QUESTIONS = 10;
const MAX_QUESTIONS = 50;

export const handleCommandQuickQuiz = async ({
  ack,
  say,
  respond,
  payload,
}: SlackCommandMiddlewareArgs) => {
  await ack();

  const numberOfQuestions = payload.text || DEFAULT_NUM_QUESTIONS;
  if (numberOfQuestions > MAX_QUESTIONS) {
    return await respond(buildErrorMaxQuestionsExceeded(MAX_QUESTIONS));
  }

  await say(buildQuizNewGameHeader(payload.user_id));

  await apiClient
    .get(`https://opentdb.com/api.php?amount=${numberOfQuestions}`)
    .then(async (res) => {
      const questions = res.data.results.map((question: any) => ({
        ...question,
        answers: shuffle([
          question.correctAnswer,
          ...question.incorrectAnswers,
        ]),
      }));

      const [firstQuestion] = questions;

      const quiz = await createNewQuiz(questions, payload.channel_id);

      console.log("-------------------------------------------");
      console.log({ quiz, questions }, "😎 Created new quiz");
      console.log("-------------------------------------------");

      const answersBlock = buildQuestionAnswersBlock(
        firstQuestion.answers,
        firstQuestion.type
      );

      const questionBlock = buildQuestionBlock({
        text: firstQuestion.question,
        difficulty: firstQuestion.difficulty,
        questionNumber: 1,
        totalQuestions: questions.length,
        category: firstQuestion.category,
        answers: answersBlock,
        userId: payload.user_id,
      });

      await say(questionBlock);
    })
    .catch((error) => {
      console.log(error, "error fetching quiz");
    });
};
