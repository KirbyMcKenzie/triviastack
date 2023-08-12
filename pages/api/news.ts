import { NextApiRequest, NextApiResponse } from "next";

export type JobType = "CREATE_QUIZ" | "NEW_APP_INSTALL";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = "5f7a3598ee3e4179ac59ed47f2a2b51a";
  // Array of news sources
  const sources = [
    "reuters",
    "bbc-news",
    "associated-press",
    "bbc-sport",
    "the-wall-street-journal",
  ];

  try {
    const newsPromises = sources.map(async (source) => {
      // URL for the top headlines endpoint of News API for each source
      const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;

      // Send a GET request to the News API for each source
      const response = await fetch(url);
      const data = await response.json();

      // Extract and process the top news articles for each source
      return data.articles.map((article: any) => ({
        title: article.title,
        content: article.content || article.description,
        source: source,
      }));
    });

    // Wait for all promises to complete and combine the results
    const allNews = await Promise.all(newsPromises);

    // Flatten the array of arrays into a single array of objects
    const combinedNews = [].concat(...allNews);

    // Return the combined top trending news as a JSON response
    res.status(200).json(combinedNews);
  } catch (error) {
    // Return an error response if any of the API requests failed
    res.status(500).json({ message: (error as any).message });
  }
};

export default handler;
