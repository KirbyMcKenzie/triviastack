import { App } from "@slack/bolt";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import {
  createNewQuiz,
  getQuizzesByChannelId,
  updateQuizCurrentQuestion,
} from "services/quizService";
import NextConnectReceiver from "utils/NextConnectReceiver";
import { decodeEscapedHTML, titleCase } from "utils/string";

const supabaseUrl = "https://dlxythnybkfecdobxkkg.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const receiver = new NextConnectReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || "invalid",
  // The `processBeforeResponse` option is required for all FaaS environments.
  // It allows Bolt methods (e.g. `app.message`) to handle a Slack request
  // before the Bolt framework responds to the request (e.g. `ack()`). This is
  // important because FaaS immediately terminate handlers after the response.
  processBeforeResponse: true,
});

// Initializes your app with your bot token and the AWS Lambda ready receiver
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: receiver,
  developerMode: false,
});

app.event("message", async ({ event, say }) => {
  const text = (event as any).text;
  say({
    text: text || "Hello world!",
  });
});

app.message("yo", async ({ message, say }) => {
  const user = (message as any).user;
  await say(`Hey there <@${user}>!`);
});

app.command("/trivia", async ({ ack, say, payload }) => {
  await ack();
  await say("Quick quiz coming up!");

  axios.get("https://opentdb.com/api.php?amount=10").then(async (res) => {
    await createNewQuiz(supabase, res.data.results, payload.channel_id);

    const [firstQuestion] = res.data.results;

    // const answers = firstQuestion.incorrect_answers.map((answer) => ({
    //   type: 'button',
    //   text: {
    //     type: 'plain_text',
    //     text: answer,
    //     emoji: true,
    //   },
    //   action_id: 'button_click',
    //   value: answer,
    // }));

    await say({
      blocks: [
        {
          type: "section",
          text: {
            type: "plain_text",
            text: decodeEscapedHTML(firstQuestion.question),
            emoji: true,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `*Category:* ${
                firstQuestion.category
              }  *·*  *Difficulty:* ${titleCase(firstQuestion.difficulty)}`,
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
                text: firstQuestion.correct_answer,
                emoji: true,
              },
              action_id: "button_click",
              value: firstQuestion.correct_answer,
            },
            // ...answers,
          ],
        },
      ],
    });
  });
});

app.action("button_click", async ({ body, ack, say }) => {
  await ack();

  //@ts-ignore
  const [firstQuiz] = await getQuizzesByChannelId(supabase, body.channel.id);
  const { id, current_question, questions } = firstQuiz;

  await updateQuizCurrentQuestion(supabase, id, current_question + 1);

  const nextQuestion = questions[current_question + 1];

  console.log(nextQuestion, "nextQuestion");

  await say({
    blocks: [
      {
        type: "divider",
      },

      {
        type: "section",
        text: {
          type: "plain_text",
          text: decodeEscapedHTML(nextQuestion.question),
          emoji: true,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `*Category:* ${
              nextQuestion.category
            }  *·*  *Difficulty:* ${titleCase(nextQuestion.difficulty)}`,
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
              text: nextQuestion.correct_answer,
              emoji: true,
            },
            action_id: "button_click",
            value: nextQuestion.correct_answer,
          },
          // ...answers,
        ],
      },
    ],
  });
});

// this is run just in case
const router = receiver.start();

router.get("/api", (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    test: true,
  });
});

export default router;
