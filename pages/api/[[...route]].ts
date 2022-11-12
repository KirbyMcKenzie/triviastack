import { App } from "@slack/bolt";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import next, { NextApiRequest, NextApiResponse } from "next";
import {
  createNewQuiz,
  getQuizzesByChannelId,
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
import { decodeEscapedHTML, titleCase } from "utils/string";

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
  await ack();
  await say("Quick quiz coming up!");

  axios.get("https://opentdb.com/api.php?amount=3").then(async (res) => {
    await createNewQuiz(supabase, res.data.results, payload.channel_id);
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

// TODO: Update message with respond
app.action(/button_click/, async ({ body, ack, say }) => {
  await ack();

  try {
    const answeredBy = (body as any).user;
    const answerValue = (body as any).actions[0].value;
    const channelId = (body as any).channel.id;

    const [firstQuiz] = await getQuizzesByChannelId(supabase, channelId);
    const { id, current_question, questions } = firstQuiz;

    const nextQuestion = questions[current_question];
    const previousQuestion = questions[current_question - 1];
    const isCorrect = previousQuestion.correct_answer === answerValue;

    const updatedQuestions = questions.map((q: Question, index: number) =>
      index + 1 === current_question ? { ...q, is_correct: isCorrect } : q
    );

    console.log(updatedQuestions, "updatedQuestions");

    await updateQuizQuestion(supabase, id, updatedQuestions);

    const score = updatedQuestions.filter((q: Question) => q.is_correct).length;

    if (answeredBy && answerValue) {
      await say({
        blocks: [
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `<@${answeredBy.id}> answered with *${answerValue}* ${
                  isCorrect ? " ✅ " : " ❌ "
                }\n${
                  !isCorrect
                    ? `Correct answer: *${previousQuestion.correct_answer}*`
                    : ""
                }
                `,
              },
            ],
          },
        ],
      });
    }

    if (current_question === questions.length) {
      await updateQuiz(supabase, id, { is_active: false });
      const quizCompleteBlock = buildQuizCompleteBlock(score, questions.length);
      await say(quizCompleteBlock);
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

    await say(questionBlock);
  } catch (error) {
    await say(
      ":confused:  There was an issue processing that click. Let me fetch the logs.."
    );
    await say(`:bug:  ${(error as string).toString()}`);
  }
});

// this is run just in case
const router = receiver.start();

router.get("/api", (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    health: "Alive and Kickin' ✌️",
  });
});

export default router;
