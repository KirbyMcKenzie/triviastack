import { shuffle } from "./array";
import { titleCase } from "./string";
import { decode } from "html-entities";

interface Question {
  text: string;
  questionNumber: string | number;
  totalQuestions: string | number;
  category: string;
  difficulty: string;
  answers: string[];
  userId?: string;
  answeredValue?: string;
  correctAnswer?: string;
  isCorrect?: boolean;
  isFinalQuestion?: boolean;
}

// TODO: refactor
export const buildQuestionBlock = ({
  text,
  questionNumber,
  totalQuestions,
  difficulty,
  category,
  answers,
  correctAnswer,
  answeredValue,
  userId = undefined,
  isCorrect = false,
  isFinalQuestion = false,
}: Question) => ({
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          // TODO: tidy this up
          totalQuestions > 1
            ? `*${
                questionNumber === totalQuestions
                  ? ":rotating_light: Final Question"
                  : `Question ${questionNumber}/${totalQuestions}`
              }* - ${decode(text)}`
            : decode(text),
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
    ...(answeredValue
      ? [
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `<@${userId}> answered with *${decode(answeredValue)}*\n${
                  !isCorrect ? `Correct answer: *${decode(correctAnswer)}*` : ""
                }`,
              },
            ],
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                style: "primary",
                text: {
                  type: "plain_text",
                  text: isFinalQuestion ? "Finish Quiz" : "Next Question",
                  emoji: true,
                },
                action_id: "next_question",
              },
            ],
          },
        ]
      : []),
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

// TODO: Refactor into single map
export const buildQuestionAnswersBlock = (
  answers: string[],
  answerType: "multiple" | "boolean" = "multiple",
  answerValue: string | undefined = undefined
) => {
  const [correctAnswer] = answers;

  if (answerType == "boolean") {
    return answers
      .sort()
      .reverse()
      .map((answer, index) => ({
        type: "button",
        text: {
          type: "plain_text",
          text: decode(
            answerValue === answer
              ? `${
                  correctAnswer === answer ? `✅  ${answer}` : `❌  ${answer}`
                }`
              : answer
          ),
          emoji: true,
        },

        action_id: `answer_question${index}`,
        value: answer,
      }));
  }

  return shuffle(
    answers.map((answer, index) => ({
      type: "button",
      text: {
        type: "plain_text",
        text: decode(
          !!answerValue
            ? `${
                correctAnswer === answer
                  ? `✅  ${answer}`
                  : `${answerValue === answer ? `❌` : ""}  ${answer}`
              }`
            : answer
        ),
        emoji: true,
      },

      action_id: `answer_question${index}`,
      value: answer,
    }))
  );
};
