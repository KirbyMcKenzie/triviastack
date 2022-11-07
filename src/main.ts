/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import { App } from '@slack/bolt';
import dotenv from 'dotenv';
import { decodeEscapedHTML, titleCase } from './helpers/string';
dotenv.config();

import { createClient } from '@supabase/supabase-js';
import { createNewQuiz, getQuizzesByChannelId } from './services/quizService';

const supabaseUrl = 'https://dlxythnybkfecdobxkkg.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command('/trivia', async ({ ack, say, payload }) => {
  await ack();
  await say('Quick quiz coming up!');

  axios.get('https://opentdb.com/api.php?amount=10').then(async (res) => {
    await createNewQuiz(supabase, res.data.results, payload.channel_id);

    const firstQuestion = res.data.results[0];

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
          type: 'section',
          text: {
            type: 'plain_text',
            text: decodeEscapedHTML(firstQuestion.question),
            emoji: true,
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `*Category:* ${
                firstQuestion.category
              }  *·*  *Difficulty:* ${titleCase(firstQuestion.difficulty)}`,
            },
          ],
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: firstQuestion.correct_answer,
                emoji: true,
              },
              action_id: 'button_click',
              value: firstQuestion.correct_answer,
            },
            // ...answers,
          ],
        },
      ],
    });
  });
});

app.action('button_click', async ({ body, ack, say }) => {
  await ack();
  await say(`<@${body.user.id}> clicked the button`);

  const [firstQuiz] = await getQuizzesByChannelId(supabase, body.channel.id);

  await supabase
    .from('quizzes')
    //@ts-ignore
    .update({ current_question: firstQuiz.current_question + 1 })
    //@ts-ignore
    .eq('id', firstQuiz.id);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  console.log(firstQuiz.questions, 'data');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const nextQuestion = firstQuiz.questions[firstQuiz.current_question + 1];

  console.log(nextQuestion, 'nextQuestion');

  await say({
    blocks: [
      {
        type: 'divider',
      },

      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: decodeEscapedHTML(nextQuestion.question),
          emoji: true,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `*Category:* ${
              nextQuestion.category
            }  *·*  *Difficulty:* ${titleCase(nextQuestion.difficulty)}`,
          },
        ],
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: nextQuestion.correct_answer,
              emoji: true,
            },
            action_id: 'button_click',
            value: nextQuestion.correct_answer,
          },
          // ...answers,
        ],
      },
    ],
  });
});

app.message('yo', async ({ message, say }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const response = await say(`Hey there <@${message.user}>!`);
  console.log(response, 'response');
});

(async (): Promise<void> => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
