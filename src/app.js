const { App } = require("@slack/bolt");
require("dotenv").config();
const axios = require("axios");

// Initializes your app with your bot token and signing secret

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const decodeEscapedHTML = (str) => {
  const htmlEntities = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": "`",
    "&apos;": "'",
    "&#039;": "'",
  };
  return str.replace(/&#{0,1}[a-z0-9]+;/gi, (match) => htmlEntities[match]);
};

/**
 * Convert an integer to its words representation
 *
 * @author McShaman (http://stackoverflow.com/users/788657/mcshaman)
 * @source http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript
 */
function numberToEnglish(n, custom_join_character) {
  var string = n.toString(),
    units,
    tens,
    scales,
    start,
    end,
    chunks,
    chunksLen,
    chunk,
    ints,
    i,
    word,
    words;

  var and = custom_join_character || "and";

  /* Is number zero? */
  if (parseInt(string) === 0) {
    return "zero";
  }

  /* Array of units as words */
  units = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];

  /* Array of tens as words */
  tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  /* Array of scales as words */
  scales = [
    "",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion",
    "decillion",
    "undecillion",
    "duodecillion",
    "tredecillion",
    "quatttuor-decillion",
    "quindecillion",
    "sexdecillion",
    "septen-decillion",
    "octodecillion",
    "novemdecillion",
    "vigintillion",
    "centillion",
  ];

  /* Split user arguemnt into 3 digit chunks from right to left */
  start = string.length;
  chunks = [];
  while (start > 0) {
    end = start;
    chunks.push(string.slice((start = Math.max(0, start - 3)), end));
  }

  /* Check if function has enough scale words to be able to stringify the user argument */
  chunksLen = chunks.length;
  if (chunksLen > scales.length) {
    return "";
  }

  /* Stringify each integer in each chunk */
  words = [];
  for (i = 0; i < chunksLen; i++) {
    chunk = parseInt(chunks[i]);

    if (chunk) {
      /* Split chunk into array of individual integers */
      ints = chunks[i].split("").reverse().map(parseFloat);

      /* If tens integer is 1, i.e. 10, then add 10 to units integer */
      if (ints[1] === 1) {
        ints[0] += 10;
      }

      /* Add scale word if chunk is not zero and array item exists */
      if ((word = scales[i])) {
        words.push(word);
      }

      /* Add unit word if array item exists */
      if ((word = units[ints[0]])) {
        words.push(word);
      }

      /* Add tens word if array item exists */
      if ((word = tens[ints[1]])) {
        words.push(word);
      }

      // /* Add 'and' string after units or tens integer if: */
      // if (ints[0] || ints[1]) {
      //   /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
      //   if (ints[2] || (!i && chunksLen)) {
      //     words.push(and);
      //   }
      // }

      /* Add hundreds word if array item exists */
      if ((word = units[ints[2]])) {
        words.push(word + " hundred");
      }
    }
  }

  return words.reverse().join(" ");
}

const SMALL_WORDS =
  /\b(?:an?d?|a[st]|because|but|by|en|for|i[fn]|neither|nor|o[fnr]|only|over|per|so|some|tha[tn]|the|to|up|upon|vs?\.?|versus|via|when|with|without|yet)\b/i;
const TOKENS = /[^\s:–—-]+|./g;
const WHITESPACE = /\s/;
const IS_MANUAL_CASE = /.(?=[A-Z]|\..)/;
const ALPHANUMERIC_PATTERN = /[A-Za-z0-9\u00C0-\u00FF]/;

function titleCase(input) {
  let result = "";
  let m;

  // tslint:disable-next-line
  while ((m = TOKENS.exec(input)) !== null) {
    const { 0: token, index } = m;

    if (
      // Ignore already capitalized words.
      !IS_MANUAL_CASE.test(token) &&
      // Ignore small words except at beginning or end.
      (!SMALL_WORDS.test(token) ||
        index === 0 ||
        index + token.length === input.length) &&
      // Ignore URLs.
      (input.charAt(index + token.length) !== ":" ||
        WHITESPACE.test(input.charAt(index + token.length + 1)))
    ) {
      // Find and uppercase first word character, skips over *modifiers*.
      result += token.replace(ALPHANUMERIC_PATTERN, (m) => m.toUpperCase());
      continue;
    }

    result += token;
  }

  return result;
}

app.command("/trivia", async ({ command, ack, say }) => {
  try {
    await say(
      "|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n|\n"
    );
    await ack();
    axios
      .get("https://opentdb.com/api.php?amount=10")
      .then(async (res) => {
        const headerDate =
          res.headers && res.headers.date
            ? res.headers.date
            : "no response date";
        console.log("Status Code:", res.status);
        console.log("Date in Response header:", headerDate);

        const questions = res.data.results;

        questions.forEach(async (question, index) => {
          console.log(question, "question");
          const decodedQuestion = decodeEscapedHTML(question.question);

          console.log(`📣 [Trivia] - ${decodedQuestion}`);
          // await say(decodedQuestion);

          const answers = question.incorrect_answers.map((answer) => ({
            type: "button",
            text: {
              type: "plain_text",
              text: answer,
              emoji: true,
            },
            value: "click_me_123",
          }));

          await say({
            blocks: [
              {
                type: "divider",
              },

              {
                type: "section",
                text: {
                  type: "plain_text",
                  text: decodedQuestion,
                  emoji: true,
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
                elements: [
                  {
                    type: "button",
                    text: {
                      type: "plain_text",
                      text: question.correct_answer,
                      emoji: true,
                    },
                    value: "click_me_123",
                  },
                  ...answers,
                ],
              },
            ],
          });
        });
      })
      .catch((err) => {
        console.log("Error: ", err.message);
      });
  } catch (error) {
    console.log(error, "err");
    // console.error(error);
  }
});

app.message("yo", async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
