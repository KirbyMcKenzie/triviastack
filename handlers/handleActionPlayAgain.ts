import {
  AckFn,
  SayArguments,
  DialogValidation,
  SlackAction,
  SayFn,
  SlackActionMiddlewareArgs,
} from "@slack/bolt";
import apiClient from "services/apiClient";
import { createNewQuiz } from "services/quizService";
import { shuffle } from "utils/array";
import { buildQuestionAnswersBlock, buildQuestionBlock } from "utils/blocks";

const DEFAULT_NUM_QUESTIONS = 10;

export const handleActionPlayAgain = async ({
  ack,
  body,
  say,
}: SlackActionMiddlewareArgs) => {
  const channelId = (body as any).channel.id;
  const userId = (body as any).user.id;

  await ack();
  await say({
    blocks: [
      { type: "divider" },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*<@${userId}> has kicked off another game of trivia*  📣 \n`,
        },
      },
    ],
  });

  await apiClient
    .get(`https://opentdb.com/api.php?amount=${DEFAULT_NUM_QUESTIONS}`)
    .then(async (res) => {
      const questions = res.data.results.map((question: any) => ({
        ...question,
        answers: shuffle([
          question.correctAnswer,
          ...question.incorrectAnswers,
        ]),
      }));

      const [firstQuestion] = questions;

      const quiz = await createNewQuiz(questions, channelId);

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
      });

      await say(questionBlock);
    });
};
