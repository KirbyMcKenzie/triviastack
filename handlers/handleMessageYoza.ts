import { KnownEventFromType, SayFn } from "@slack/bolt/dist/types";

export const handleMessageYoza = async (
  message: KnownEventFromType<"message">,
  say: SayFn
) => {
  const user = (message as any).user;
  await say(`Yoza <@${user}> 😼`);
};
