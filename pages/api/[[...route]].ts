import { App } from "@slack/bolt";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import {
  createNewQuiz,
  getCurrentQuizByChannelId,
  getQuizzesByChannelId,
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
  await say(`Hey there <@${user}>!`);
});

app.message("yeet", async ({ say }) => {
  await say(
    `|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|`
  );
});

app.command("/trivia", async ({ ack, say, payload }) => {
  console.log("/trivia called");
  console.log("/ayy haha");

  say("Kirby is kicking off a new quiz!");
  await ack();

  axios
    .get("https://opentdb.com/api.php?amount=10")
    .then(async (res) => {
      console.log("attempting to create quiz");
      const quiz = await createNewQuiz(
        supabase,
        res.data.results,
        payload.channel_id
      );

      const [firstQuestion] = res.data.results;

      const answersBlock = buildQuestionAnswersBlock([
        firstQuestion.correct_answer,
        ...firstQuestion.incorrect_answers,
      ]);

      const questionBlock = buildQuestionBlock({
        text: firstQuestion.question,
        difficulty: firstQuestion.difficulty,
        category: firstQuestion.category,
        answers: answersBlock,
        userId: payload.user_id,
      });

      console.log(questionBlock, "saying question block");
      await say(questionBlock);
      console.log("posted question");
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
      difficulty: nextQuestion.difficulty,
      category: nextQuestion.category,
      answers: answersBlock,
    });

    await respond(questionBlock);
  } catch (error) {
    await say(
      ":confused:  There was an issue processing that click. Let me fetch the logs.."
    );
    await say(`:bug:  ${(error as string).toString()}`);
  }
});

app.action("play_again", async ({ ack, say, body }) => {
  await ack();
  const channelId = (body as any).channel.id;

  axios.get("https://opentdb.com/api.php?amount=10").then(async (res) => {
    await createNewQuiz(supabase, res.data.results, channelId);

    const [firstQuestion] = res.data.results;

    const answersBlock = buildQuestionAnswersBlock([
      firstQuestion.correct_answer,
      ...firstQuestion.incorrect_answers,
    ]);

    const questionBlock = buildQuestionBlock({
      text: firstQuestion.question,
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
