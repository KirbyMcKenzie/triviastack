import { setupServer } from "msw/node";
import { handlers } from "./handlers";

console.log("setting up server!!!");

export const server = setupServer(...handlers);
