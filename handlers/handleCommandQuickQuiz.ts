import { AckFn, SayFn, SlashCommand } from "@slack/bolt/dist/types";
import { WebClient } from "@slack/web-api";
import apiClient from "services/apiClient";
import { createNewQuiz } from "services/quizService";
import { shuffle } from "utils/array";
import { buildQuestionAnswersBlock, buildQuestionBlock } from "utils/blocks";

const DEFAULT_NUM_QUESTIONS = 10;
const MAX_QUESTIONS = 50;

export const handleCommandQuickQuiz = async (
  ack: AckFn<string>,
  say: SayFn,
  client: WebClient,
  payload: SlashCommand
) => {
  await ack();

  const numberOfQuestions = payload.text || DEFAULT_NUM_QUESTIONS;
  if (numberOfQuestions > MAX_QUESTIONS) {
    await client.chat.postEphemeral({
      token: process.env.SLACK_BOT_TOKEN,
      channel: payload.channel_id,
      user: payload.user_id,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `😵‍💫  Sorry, can't do that. We only support up to ${MAX_QUESTIONS} questions at this time.`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `If you're interested in more questions, please get in touch 😼`,
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "💡 Give product feedback",
                emoji: true,
              },
              value: "click_me_123",
              action_id: "actionId-1",
            },
          ],
        },
      ],
    });
    return;
  }

  await say({
    blocks: [
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*<@${payload.user_id}> has kicked off a game of trivia*  📣\n\n`,
        },
      },
    ],
  });

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
