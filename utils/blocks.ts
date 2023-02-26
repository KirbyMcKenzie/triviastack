import { decode } from "html-entities";
import { Question } from "types/quiz";
import { getGameOverEmoji, getGameOverResponse } from "./quiz";
import { titleCase } from "./string";

export interface QuestionBlockProps {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  answeredValue?: string;
  userId?: string;
  disableButtons?: boolean;
  isSuperQuiz?: boolean;
  isFirstGame?: boolean;
  hasError?: boolean;
}

export interface QuestionAnswerBlockProps {
  answers: string[];
  type: "Multiple Choice" | "boolean";
  // type: "multiple" | "boolean";
  answerValue: string | undefined;
  correctAnswer: string | undefined;
  disableButtons?: boolean;
}

export const buildQuestionBlock = ({
  question,
  currentQuestion,
  totalQuestions,
  answeredValue,
  disableButtons,
  userId,
  isSuperQuiz = false,
  isFirstGame = true,
  hasError,
}: QuestionBlockProps) => ({
  blocks: [
    ...(!isFirstGame ? [{ type: "divider" }] : []),
    {
      type: "section",
      text: isSuperQuiz
        ? {
            type: "mrkdwn",
            text: `🚨 *<@${userId}> has kicked off ${
              isFirstGame ? "a" : "another"
            } game of SUPER TRIVIA* 🚨\n\n`,
          }
        : {
            type: "mrkdwn",
            text: `*<@${userId}> has kicked off ${
              isFirstGame ? "a" : "another"
            } game of trivia*  📣\n\n`,
          },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          totalQuestions > 1
            ? `*${
                currentQuestion === totalQuestions
                  ? ":rotating_light: Final Question"
                  : `Question ${currentQuestion}/${totalQuestions}`
              }* - ${decode(question.question)}`
            : decode(question.question),
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `*Category:* ${
            question.category
          }  *·*  *Difficulty:* ${titleCase(question.difficulty)}`,
        },
      ],
    },
    {
      type: "actions",
      elements: buildQuestionAnswersBlock({
        type: question.type,
        answers: question.answers,
        answerValue: answeredValue,
        correctAnswer: question.correctAnswer,
        disableButtons,
      }),
    },
    ...(answeredValue
      ? [
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `<@${userId}> answered with *${decode(answeredValue)}*\n${
                  answeredValue !== question.correctAnswer
                    ? `Correct answer: *${decode(question.correctAnswer)}*`
                    : ""
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
                  text:
                    currentQuestion === totalQuestions
                      ? "Finish Quiz"
                      : "Next Question",
                  emoji: true,
                },
                action_id: "next_question",
              },
            ],
          },
          ...(hasError
            ? [
                {
                  type: "divider",
                },
              ]
            : []),
          ...(hasError
            ? [
                {
                  type: "context",
                  elements: [
                    {
                      type: "mrkdwn",
                      text: "😵‍💫 There was an issue processing that click. Please try again, and <https://triviabot.app/support|contact support> if the issue persists.",
                    },
                  ],
                },
              ]
            : []),
        ]
      : []),
  ],
});

export const buildQuestionAnswersBlock = ({
  answers = [],
  type = "Multiple Choice",
  answerValue,
  correctAnswer,
  disableButtons = false,
}: QuestionAnswerBlockProps) => {
  if (type == "boolean") {
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

        action_id: disableButtons ? `noop${index}` : `answer_question${index}`,
        value: answer,
      }));
  }

  return answers.map((answer, index) => ({
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

    action_id: disableButtons ? `noop${index}` : `answer_question${index}`,
    value: answer,
  }));
};

export const buildQuizCompleteBlock = (score: number, total: number) => ({
  blocks: [
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `🎉  *Quiz Complete!*\n\nYour Score: *${score}/${total}* ${getGameOverEmoji(
          score,
          total
        )}\n${getGameOverResponse(score, total)}`,
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
          value: "feedback_open",
          action_id: "feedback_open",
        },
      ],
    },
  ],
});

export const buildErrorMaxQuestionsExceeded = (
  maxQuestions: number,
  isEphemeral = true
) => ({
  response_type: isEphemeral
    ? "ephemeral"
    : ("in_channel" as "ephemeral" | "in_channel"),
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `😵‍💫  Sorry, can't do that. We only support up to ${maxQuestions} questions at this time.`,
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
            text: "Dismiss",
            emoji: true,
          },
          value: "dismiss",
          action_id: "dismiss",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "💡 Give product feedback",
            emoji: true,
          },
          value: "feedback_open",
          action_id: "feedback_open",
        },
      ],
    },
  ],
});

// TODO: keep this just in case gen quiz is too slow
export const buildQuizNewGameHeader = (
  userId: string,
  isFirstGame = false,
  isSuperQuiz = false
) => ({
  blocks: [
    {
      type: "divider",
    },
    {
      type: "section",
      text: isSuperQuiz
        ? {
            // TODO: jazz this up a bit
            type: "mrkdwn",
            text: `🚨 *<@${userId}> has kicked off ${
              isFirstGame ? "a" : "another"
            } game of SUPER TRIVIA* 🚨\n\n`,
          }
        : {
            type: "mrkdwn",
            text: `*<@${userId}> has kicked off ${
              isFirstGame ? "a" : "another"
            } game of trivia*  📣\n\n`,
          },
    },
  ],
});
