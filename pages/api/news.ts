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

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const newsPromises = sources.map(async (source) => {
    const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${process.env.NEWS_API_KEY}`;

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
          Act as a trivia game service, generating trivia questions and converting them into json responses for another service to consume. 
          You will accept an array of news headlines and descriptions and parse them to generate ${NUM_QUESTIONS} trivia questions. 
          Because there many sources, you will see multiple articles covering the same topic, when this happens, only generate the one question on the topic, but order the questions based on the most trending news articles. E.g. 4 headlines about a wildfire would rank first instead of a story about a football game with 2 articles. Also take into consideration what you think sounds like a significant event. 
          Keep each answer text limit to 32 or less characters.
          When covering tragedies, disasters and depressing news, make sure to write the questions with sensitivity and empathy in mind, don't phrase the questions in a way that would make people uncomfortable such as focusing on the death toll or the crime itself. But rather focus on what is happening in general, e.g. 'there are devastating wildfires in which US state'   
          `,
      },
      {
        role: "user",
        content: `Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation. Write 5 trivia questions with four multi choice answers, highlight the correct answer, change up the questions each time, here is the news data: 
        ${JSON.stringify([].concat(...combinedNews))}`,
      },
    ],
    // TODO: figure out what these actually do
    temperature: 0.8,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
  });

  console.log(response, "response");

  const gptResponse = JSON.parse(
    (response.data as any).choices[0].message.content
  );

  return res.status(200).json({ response: gptResponse });
};

export default handler;
