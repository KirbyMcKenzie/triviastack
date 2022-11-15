import { App } from "@slack/bolt";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import {
  createNewQuiz,
  getCurrentQuizByChannelId,
  updateQuiz,
  updateQuizCurrentQuestion,
  updateQuizQuestion,
} from "services/quizService";
import { Question } from "types/quiz";
import {
  buildQuestionAnswersBlock,
  buildQuestionBlock,
  buildQuizCompleteBlock,
} from "utils/blocks";
import NextConnectReceiver from "utils/NextConnectReceiver";

const DEFAULT_NUM_QUESTIONS = 10;
const MAX_QUESTIONS = 50;

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const receiver = new NextConnectReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || "invalid",
  processBeforeResponse: true,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: receiver,
  developerMode: false,
});

app.message("yoza", async ({ message, say }) => {
  const user = (message as any).user;
  await say(`Hey my bro <@${user}>!`);
});

app.message("yeet", async ({ say }) => {
  await say(`|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|`);
});

const triviaSlashCommand =
  process.env.NODE_ENV === "production" ? "/trivia" : "/dev-trivia";

app.command(triviaSlashCommand, async ({ ack, say, client, payload }) => {
  const numberOfQuestions = payload.text || DEFAULT_NUM_QUESTIONS;

  await ack();

  console.log(payload, "payload");

  if (numberOfQuestions > 50) {
    await client.chat.postEphemeral({
      token: process.env.SLACK_BOT_TOKEN,
      channel: payload.channel_id,
      user: payload.user_id,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "😵‍💫  Sorry, can't do that. We only support up to 50 questions at this time.",
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
          text: `*<@${payload.user_id}> has kicked off a game of trivia* 📣\n\n`,
        },
      },
    ],
  });

  await axios
    .get(`https://opentdb.com/api.php?amount=${numberOfQuestions}`)
    .then(async (res) => {
      console.log(res, "created new quiz");
      const quiz = await createNewQuiz(
        supabase,
        res.data.results,
        payload.channel_id
      );
      const [firstQuestion] = res.data.results;

      const numberOfQuestions = res.data.results.length;

      const answersBlock = buildQuestionAnswersBlock([
        firstQuestion.correct_answer,
        ...firstQuestion.incorrect_answers,
      ]);

      const questionBlock = buildQuestionBlock({
        text: firstQuestion.question,
        difficulty: firstQuestion.difficulty,
        questionNumber: 1,
        totalQuestions: numberOfQuestions,
        category: firstQuestion.category,
        answers: answersBlock,
        userId: payload.user_id,
      });

      await say(questionBlock);
    })
    .catch((error) => {
      console.log(error, "error fetching quiz");
    });
});

// TODO: add error handling
app.action(/answer_question/, async ({ body, ack, respond }) => {
  await ack();

  const answeredBy = (body as any).user;
  const answerValue = (body as any).actions[0].value;
  const channelId = (body as any).channel.id;

  const quiz = await getCurrentQuizByChannelId(supabase, channelId);
  const { id, current_question, questions } = quiz;

  // TODO: can probably rename to answeredQuestion
  const previousQuestion = questions[current_question - 1];

  const answersBlock = buildQuestionAnswersBlock([
    previousQuestion.correct_answer,
    ...previousQuestion.incorrect_answers,
  ]);

  const questionBlock = buildQuestionBlock({
    text: previousQuestion.question,
    questionNumber: current_question,
    totalQuestions: questions.length,
    difficulty: previousQuestion.difficulty,
    category: previousQuestion.category,
    answers: answersBlock,
    answeredValue: answerValue,
    userId: answeredBy.id,
    correctAnswer: previousQuestion.correct_answer,
    isCorrect: previousQuestion.correct_answer === answerValue,
    isFinalQuestion: current_question === questions.length,
  });

  const isCorrect = previousQuestion.correct_answer === answerValue;

  const updatedQuestions = questions.map((q: Question, index: number) =>
    index + 1 === current_question ? { ...q, is_correct: isCorrect } : q
  );

  await updateQuizQuestion(supabase, id, updatedQuestions);
  await respond(questionBlock);
});

app.action(/next_question/, async ({ body, ack, say, respond }) => {
  await ack();

  try {
    const answerValue = (body as any).actions[0].value;
    const channelId = (body as any).channel.id;

    const quiz = await getCurrentQuizByChannelId(supabase, channelId);
    const { id, current_question, questions } = quiz;

    const nextQuestion = questions[current_question];
    const previousQuestion = questions[current_question - 1];
    const isCorrect = previousQuestion.correct_answer === answerValue;

    const updatedQuestions = questions.map((q: Question, index: number) =>
      index + 1 === current_question ? { ...q, is_correct: isCorrect } : q
    );

    // TODO: finish quiz - maybe move
    if (current_question === questions.length) {
      await updateQuiz(supabase, id, { is_active: false });

      const score = updatedQuestions.filter(
        (q: Question) => q.is_correct
      ).length;

      const quizCompleteBlock = buildQuizCompleteBlock(score, questions.length);
      await respond(quizCompleteBlock);
      return;
    }

    await updateQuizCurrentQuestion(supabase, id, current_question + 1);

    // TODO: consider merging question and answer block
    const answersBlock = buildQuestionAnswersBlock([
      nextQuestion.correct_answer,
      ...nextQuestion.incorrect_answers,
    ]);

    const questionBlock = buildQuestionBlock({
      text: nextQuestion.question,
      questionNumber: current_question + 1,
      totalQuestions: questions.length,
      difficulty: nextQuestion.difficulty,
      category: nextQuestion.category,
      answers: answersBlock,
    });

    await respond(questionBlock);
  } catch (error) {
    await say(
      ":confused:  There was an issue processing that click. Let me fetch the logs.."
    );
    console.log(error);
    await say(`:bug:  ${(error as string).toString()}`);
  }
});

app.action("play_again", async ({ ack, say, body }) => {
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
          text: `*<@${userId}> has kicked off another game of trivia* 📣 \n`,
        },
      },
    ],
  });

  await axios
    .get(`https://opentdb.com/api.php?amount=${DEFAULT_NUM_QUESTIONS}`)
    .then(async (res) => {
      await createNewQuiz(supabase, res.data.results, channelId);

      const [firstQuestion] = res.data.results;

      const numberOfQuestions = res.data.results.length;

      const answersBlock = buildQuestionAnswersBlock([
        firstQuestion.correct_answer,
        ...firstQuestion.incorrect_answers,
      ]);

      const questionBlock = buildQuestionBlock({
        text: firstQuestion.question,
        questionNumber: 1,
        totalQuestions: numberOfQuestions,
        difficulty: firstQuestion.difficulty,
        category: firstQuestion.category,
        answers: answersBlock,
      });

      await say(questionBlock);
    });
});

// this is run just in case
const router = receiver.start();

router.get("/api", (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    health: "Alive and Kickin' ✌️",
  });
});

export default router;
