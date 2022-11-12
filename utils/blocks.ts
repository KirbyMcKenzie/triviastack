import { shuffle } from "./array";
import { decodeEscapedHTML, titleCase } from "./string";

interface Question {
  text: string;
  category: string;
  difficulty: string;
  answers: string[];
  userId?: string;
}

export const buildQuestionBlock = ({
  text,
  difficulty,
  category,
  answers,
  userId = undefined,
}: Question) => ({
  blocks: [
    ...(userId
      ? [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `📣  *<@${userId}> has kicked off a game of trivia* \n`,
            },
          },
        ]
      : []),
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: decodeEscapedHTML(text),
        emoji: true,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `*Category:* ${category}  *·*  *Difficulty:* ${titleCase(
            difficulty
          )}`,
        },
      ],
    },
    {
      type: "actions",
      elements: answers,
    },
  ],
});

export const buildQuizCompleteBlock = (score: number, total: number) => ({
  blocks: [
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `🎉  *Quiz Complete!*\n\nYour Score: *${score}/${total}* 👏\nNot a bad effort 🤷‍♂️`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Daily quiz streak: ✨ *10* ✨",
      },
    },

    {
      type: "divider",
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          style: "primary",
          text: {
            type: "plain_text",
            text: "Play again",
            emoji: true,
          },
          action_id: "play_again",
        },
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

export const buildQuestionAnswersBlock = (answers: string[]) =>
  shuffle(
    answers.map((answer, index) => ({
      type: "button",
      text: {
        type: "plain_text",
        text: answer,
        emoji: true,
      },

      action_id: `button_click_${index}`,
      value: answer,
    }))
  );
