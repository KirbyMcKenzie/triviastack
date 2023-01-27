import { App } from "@slack/bolt";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { camelizeKeys } from "humps";
import {
  createNewQuiz,
  getCurrentQuizByChannelId,
  updateQuiz,
  updateQuizCurrentQuestion,
  updateQuizQuestion,
} from "services/quizService";
import { Question } from "types/quiz";
import { shuffle } from "utils/array";
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

const apiClient = axios.create();

apiClient.interceptors.response.use((response) => {
  response.data = camelizeKeys(response.data);

  return response;
});

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

      const quiz = await createNewQuiz(supabase, questions, payload.channel_id);

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
});

// TODO: add error handling
app.action(/answer_question/, async ({ body, ack, respond }) => {
  await ack();

  const answeredBy = (body as any).user;
  const answerValue = (body as any).actions[0].value;
  const channelId = (body as any).channel.id;

  const quiz = await getCurrentQuizByChannelId(supabase, channelId);
  const { id, currentQuestion, questions } = quiz;

  console.log(currentQuestion, "currentQuestion");

  // TODO: can probably rename to answeredQuestion
  const previousQuestion = questions[currentQuestion - 1];

  const answersBlock = buildQuestionAnswersBlock(
    previousQuestion.answers,
    previousQuestion.type,
    answerValue,
    previousQuestion.correctAnswer
  );

  const questionBlock = buildQuestionBlock({
    text: previousQuestion.question,
    questionNumber: currentQuestion,
    totalQuestions: questions.length,
    difficulty: previousQuestion.difficulty,
    category: previousQuestion.category,
    answers: answersBlock,
    answeredValue: answerValue,
    userId: answeredBy.id,
    correctAnswer: previousQuestion.correctAnswer,
    isCorrect: previousQuestion.correctAnswer === answerValue,
    isFinalQuestion: currentQuestion === questions.length,
  });

  const isCorrect = previousQuestion.correctAnswer === answerValue;

  //@ts-ignore
  const updatedQuestions = questions.map((q: Question, index: number) =>
    index + 1 === currentQuestion ? { ...q, isCorrect } : q
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
    const { id, currentQuestion, questions } = quiz;

    const nextQuestion = questions[currentQuestion];
    const previousQuestion = questions[currentQuestion - 1];
    const isCorrect = previousQuestion.correct_answer === answerValue;

    const updatedQuestions = questions.map((q: Question, index: number) =>
      index + 1 === currentQuestion ? { ...q, is_correct: isCorrect } : q
    );

    // TODO: finish quiz - maybe move
    if (currentQuestion === questions.length) {
      // TODO: investigate if we should map these
      //@ts-ignore
      await updateQuiz(supabase, id, { is_active: false });

      const score = updatedQuestions.filter(
        //@ts-ignore
        (q: Question) => q.is_correct
      ).length;

      const quizCompleteBlock = buildQuizCompleteBlock(score, questions.length);
      await respond(quizCompleteBlock);
      return;
    }

    await updateQuizCurrentQuestion(supabase, id, currentQuestion + 1);

    // TODO: consider merging question and answer block
    const answersBlock = buildQuestionAnswersBlock(
      nextQuestion.answers,
      nextQuestion.type
    );

    const questionBlock = buildQuestionBlock({
      text: nextQuestion.question,
      questionNumber: currentQuestion + 1,
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
          text: `*<@${userId}> has kicked off another game of trivia*  📣 \n`,
        },
      },
    ],
  });

  await apiClient
    .get(`https://opentdb.com/api.php?amount=${DEFAULT_NUM_QUESTIONS}`)
    .then(async (res) => {
      const [firstQuestion] = res.data.results;
      const numberOfQuestions = res.data.results.length;

      // TODO: fix this
      const answers = shuffle([
        firstQuestion.correctAnswer,
        ...firstQuestion.incorrectAnswers,
      ]);

      await createNewQuiz(supabase, res.data.results, channelId);

      const answersBlock = buildQuestionAnswersBlock(
        [firstQuestion.correctAnswer, ...firstQuestion.incorrectAnswers],
        firstQuestion.type
      );

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
