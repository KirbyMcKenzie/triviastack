import { rest } from "msw";
// import { Quiz } from "types/quiz";

export const handlers = [
  rest.get("https://the-trivia-api.com/api/questions", (_req, res, ctx) => {
    return res(
      ctx.json<any>({
        title: "Lord of the Rings",
        imageUrl: "/book-cover.jpg",
        description:
          "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.",
      })
    );
  }),
];
