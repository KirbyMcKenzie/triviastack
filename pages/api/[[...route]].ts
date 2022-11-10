import { App } from "@slack/bolt";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import {
  createNewQuiz,
  getQuizzesByChannelId,
  updateQuizCurrentQuestion,
  updateQuizQuestion,
} from "services/quizService";
import { Question } from "types/quiz";
import NextConnectReceiver from "utils/NextConnectReceiver";
import { decodeEscapedHTML, titleCase } from "utils/string";

const supabaseUrl = process.env.SUPABASE_URL as string;
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

app.message("yoza", async ({ message, say }) => {
  const user = (message as any).user;
  await say(`Hey there <@${user}>!`);
});

app.message("yeet", async ({ message, say }) => {
  const user = (message as any).user;
  await say(
    `|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|`
  );
});

app.command("/trivia", async ({ ack, say, payload }) => {
  await ack();
  await say("Quick quiz coming up!");

  axios.get("https://opentdb.com/api.php?amount=10").then(async (res) => {
    await createNewQuiz(supabase, res.data.results, payload.channel_id);

    const [firstQuestion] = res.data.results;

    console.log(firstQuestion, "firstQuestion");

    const answers =
      firstQuestion?.incorrect_answers?.map(
        (answer: string, index: number) => ({
          type: "button",
          text: {
            type: "plain_text",
            text: answer,
            emoji: true,
          },
          action_id: `button_click_${index}`,
          value: answer,
        })
      ) || [];

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
            ...answers,
          ],
        },
      ],
    });
  });
});

// TODO: Update message with respond
app.action(/button_click/, async ({ body, ack, say, action }) => {
  await ack();

  try {
    const answeredBy = (body as any).user;
    const answerValue = (body as any).actions[0].value;

    //@ts-ignore
    const [firstQuiz] = await getQuizzesByChannelId(supabase, body.channel.id);
    const { id, current_question, questions } = firstQuiz;

    if (current_question === 10) {
      await say(`🎉 Thats a wrap! Your Score: *69/420* 👏`);
      return;
    }

    await updateQuizCurrentQuestion(supabase, id, current_question + 1);

    const nextQuestion = questions[current_question];
    const previousQuestion = questions[current_question - 1];

    const isCorrect = previousQuestion.correct_answer === answerValue;

    // TODO: Tidy up the junk
    const updatedQuestions = questions.map((question: any, index: number) => ({
      ...question,
      is_correct:
        question.is_correct || index + 1 === current_question
          ? isCorrect
          : question.is_correct || null,
    }));

    await updateQuizQuestion(supabase, id, updatedQuestions);

    if (answeredBy && answerValue) {
      await say({
        blocks: [
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `<@${answeredBy.id}> answered with *${answerValue}* ${
                  isCorrect ? " ✅" : " ❌"
                } `,
              },
            ],
          },
        ],
      });
    }

    const answers = nextQuestion?.incorrect_answers?.map(
      (answer: string, index: number) => ({
        type: "button",
        text: {
          type: "plain_text",
          text: answer,
          emoji: true,
        },

        action_id: `button_click_${index}`,
        value: answer,
      })
    );

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
            ...answers,
          ],
        },
      ],
    });
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
