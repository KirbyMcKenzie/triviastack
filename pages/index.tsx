import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import HeroHome from "components/HeroHome/HeroHome";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Triviabot</title>
      </Head>
      <div
        className="flex flex-col min-h-screen overflow-hidden text-white"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #111729 62.5%)",
        }}
      >
        <Header />
        <main className="flex-grow max-w-8 mx-auto px-5 text-center">
          <HeroHome />
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight md:leading-tight md:tracking-normal mb-3">
              ⚡️ Quick Trivia
            </h2>
            <p className="max-w-xl mx-auto text-lg">
              Instantly create a trivia in a channel using the /trivia command.
              You can customize your instant trivia settings in the Triviabot
              app home.{" "}
            </p>
          </section>
          <section className="my-16">
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight md:leading-tight md:tracking-normal mb-3">
              😎 Create your own Trivia
            </h2>
            <p className="max-w-xl mx-auto text-lg">
              Choose your own adventure, select the difficulty level,
              categories, or the number of questions to make each game unique.
            </p>
          </section>
          <section className="my-16">
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight md:leading-tight md:tracking-normal mb-3">
              ⏳ Daily trivia
            </h2>
            <p className="max-w-xl mx-auto text-lg">
              Start a game at the same time everyday. It&apos;s a great way to
              bond with your team and build a sense of friendly competition.
            </p>
          </section>
          <section className="my-16">
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight md:leading-tight md:tracking-normal mb-3">
              🪄 Easy to use
            </h2>
            <p className="max-w-xl mx-auto text-lg">
              No need to download any software or navigate confusing interfaces.
              Triviabot integrates seamlessly with Slack, making it easy to use
              for anyone in your organization.
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
