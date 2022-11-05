/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
import { App } from '@slack/bolt';
import * as dotenv from 'dotenv';
import { decodeEscapedHTML, titleCase } from './helpers/string';
dotenv.config();
const axios = require('axios');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command('/trivia', async ({ ack, say }) => {
  try {
    await say(
      '|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n',
    );
    await ack();
    axios
      .get('https://opentdb.com/api.php?amount=10')
      .then(async (res) => {
        const questions = res.data.results;

        questions.forEach(async (question) => {
          console.log(question, 'question');
          const decodedQuestion = decodeEscapedHTML(question.question);

          console.log(`📣 [Trivia] - ${decodedQuestion}`);

          const answers = question.incorrect_answers.map((answer) => ({
            type: 'button',
            text: {
              type: 'plain_text',
              text: answer,
              emoji: true,
            },
            value: 'click_me_123',
          }));

          await say({
            blocks: [
              {
                type: 'divider',
              },

              {
                type: 'section',
                text: {
                  type: 'plain_text',
                  text: decodedQuestion,
                  emoji: true,
                },
              },
              {
                type: 'context',
                elements: [
                  {
                    type: 'mrkdwn',
                    text: `*Category:* ${
                      question.category
                    }  *·*  *Difficulty:* ${titleCase(question.difficulty)}`,
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
                      text: question.correct_answer,
                      emoji: true,
                    },
                    value: 'click_me_123',
                  },
                  ...answers,
                ],
              },
            ],
          });
        });
      })
      .catch((err) => {
        console.log('Error: ', err.message);
      });
  } catch (error) {
    console.log(error, 'err');
    // console.error(error);
  }
});

app.message('yo', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  //@ts-ignore
  await say(`Hey there <@${message.user}>!`);
});

(async (): Promise<void> => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
