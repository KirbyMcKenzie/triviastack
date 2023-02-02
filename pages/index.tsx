// import { createClient } from "@supabase/supabase-js";
import type { NextPage } from "next";

// TODO: Setup login properly
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

// console.log(supabaseUrl, "supabaseUrl");

// const supabase = createClient(supabaseUrl, supabaseKey);

// async function signInWithSlack() {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "slack",
//   });
//   console.log({ data, error }, "signin response");
// }

// async function signOut() {
//   const { error } = await supabase.auth.signOut();
//   console.log({ error }, "signOut response");
// }

const Home: NextPage = () => {
  return (
    <div>
      <div>Hello World!</div>
      {/* <button onClick={signInWithSlack}>{"Sign in"}</button>
      <button onClick={signOut}>{"Log out"}</button> */}
    </div>
  );
};

export default Home;
