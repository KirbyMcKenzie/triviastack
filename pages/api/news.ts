import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const sources = [
  "reuters",
  "bbc-news",
  "associated-press",
  "bbc-sport",
  "the-wall-street-journal",
];

const NUM_QUESTIONS = 10;
const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const newsPromises = sources.map(async (source) => {
    const url = `${NEWS_API_URL}?sources=${source}&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.articles.map((article: any) => ({
      title: article.title,
      content: article.content || article.description,
    }));
  });

  const combinedNews = await Promise.all(newsPromises);

  console.log(combinedNews, "combinedNews");

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
          Act as a trivia game service, generating trivia questions and converting them into JSON responses for another service to consume. 
          You will accept an array of news headlines and descriptions and parse them to generate trivia questions. 
          For topics covered by multiple articles, prioritize questions based on trending news articles, giving preference to topics with more coverage.
          Write the questions for a general audience, ensure that questions related to tragic or distressing news maintain a sensitive and empathetic tone, 
          avoid an explicit focus on death tolls, the alleged crime or anything that would make people uncomfortable.
          `,
      },
      {
        role: "user",
        content: `
        Generate RFC8259 compliant JSON responses with the following format.
        Create ${NUM_QUESTIONS} trivia questions, each with four multiple-choice answers with the correct answer highlighted.
        Keep each answer text limited to 32 characters or less.
        Ensure variety in the questions for each request using the provided news data:
        ${JSON.stringify([].concat(...combinedNews))}`,
      },
    ],
    // What sampling temperature to use, between 0 and 2.
    // Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
    temperature: 0.8,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
  });

  const gptResponse = JSON.parse(
    (response.data as any).choices[0].message.content
  );

  return res.status(200).json({ response: gptResponse });
};

export default handler;
