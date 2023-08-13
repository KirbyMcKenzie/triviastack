import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export type JobType = "CREATE_QUIZ" | "NEW_APP_INSTALL";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Array of news sources
  const sources = [
    "reuters",
    "bbc-news",
    "associated-press",
    "bbc-sport",
    "the-wall-street-journal",
  ];

  const newsPromises = sources.map(async (source) => {
    // URL for the top headlines endpoint of News API for each source
    const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${process.env.NEWS_API_KEY}`;

    // Send a GET request to the News API for each source
    const response = await fetch(url);
    const data = await response.json();

    // Extract and process the top news articles for each source
    return data.articles.map((article: any) => ({
      title: article.title,
      content: article.content || article.description,
    }));
  });

  // Wait for all promises to complete and combine the results
  const allNews = await Promise.all(newsPromises);

  // Flatten the array of arrays into a single array of objects
  const combinedNews = [].concat(...allNews);

  console.log(combinedNews, "this is the fucking news");

  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `
          Act as a trivia game service, generating trivia questions and converting them into json responses for another service to consume. 
          You will accept an array of news headlines and descriptions and parse them to generate 10 trivia questions. 
          Because there many sources, you will see multiple articles covering the same topic, when this happens, only generate the one question on the topic, but order the questions based on the most trending news articles. E.g. 4 headlines about a wildfire would rank first instead of a story about a football game with 2 articles. Also take into consideration what you think sounds like a significant event. 
          Keep each answer text limit to 32 or less characters.
          When covering tragedies, disasters and depressing news, make sure to write the questions with sensitivity and empathy in mind, don't phrase the questions in a way that would make people uncomfortable such as focusing on the death toll, or a criminals name. But rather focus on what is happening in general, e.g. 'there are devastating wildfires in which US state'   
          `,
      },
      {
        role: "user",
        content: `Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation. Write 5 trivia questions with four multi choice answers, highlight the correct answer, change up the questions each time, here is the news data: 
        ${JSON.stringify(combinedNews)}`,
      },
    ],
    temperature: 0.8,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
  });

  console.log(JSON.stringify(response.data), "response");

  return res.status(200).json({ response: response.data });
};

export default handler;
