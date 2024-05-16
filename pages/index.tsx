import FeatureSection from "components/FeatureSection";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import HeroHome from "components/HeroHome/HeroHome";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TriviaStack</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mx-auto max-w-[1200px] px-5 text-center">
          <HeroHome />

          <div className="my-24">
            <FeatureSection
              title="New Categories Every Week"
              subtitle="Keep up with events and current affairs, with an ever changing set of categories and questions."
              contentNode={
                <div className=" bg-blue-600  rounded-3xl p-5 relative shadow-2xl">
                  <Image
                    alt="Create trivia modal"
                    src="/select-categories.png"
                    height={526}
                    width={474}
                  />
                </div>
              }
            />
          </div>
          {/* <div className="my-24">
            <FeatureSection
              title="Easy Setup"
              subtitle="Looking good over there mate, it's time to have a think about it"
              contentNode={<div>hey haha</div>}
            />
          </div> */}

          <h2 className="text-6xl font-extrabold b-20">
            {"Explore Game Modes"}
          </h2>
          <p className="mt-4 text-blue-600 text-xl font-normal tracking-wider">
            {
              "Whether you're remote, hybrid or in-office, there's a mode that suits your team"
            }
          </p>

          <div className="flex flex-col md:flex-row md:space-x-4 row mb-40">
            <div className="flex flex-col justify-center w-full bg-gray-100 px-8 rounded-[46px] my-12">
              <div className="text-8xl">{"🎉"}</div>
              <h3 className="text-4xl font-extrabold my-8">{"Team Trivia"}</h3>
              <p className="text-xl font-normal">
                Answer questions together as a team, anyone in the channel can
                participate.
              </p>
            </div>
            <div className="flex flex-col justify-center w-full bg-gray-100 px-8 rounded-[46px] my-12 min-h-96">
              <div className="text-8xl">{"🏆"}</div>
              <h3 className="text-4xl font-extrabold my-8">{"Head to Head"}</h3>
              <p className="text-xl font-normal">
                Score points based on the difficulty of the questions. Those
                with the highest points win.
              </p>
            </div>
            <div className="flex flex-col justify-center w-full bg-gray-100 px-8 rounded-[46px] my-12">
              <div className="text-8xl">{"💃"}</div>
              <h3 className="text-4xl font-extrabold my-8">{"Solo"}</h3>
              <p className="text-xl font-normal">
                Play in your direct message at your own pace. Perfect for
                practice or small breaks.
              </p>
            </div>
          </div>

          {/* <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight md:leading-tight md:tracking-normal mb-3">
              ⚡️ Quick Trivia
            </h2>
            <p className="max-w-xl mx-auto text-lg">
              Instantly create a trivia in a channel using the /trivia command.
              You can customize your instant trivia settings in the TriviaStack
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
          {/* <section className="my-16">
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight md:leading-tight md:tracking-normal mb-3">
              ⏳ Daily trivia
            </h2>
            <p className="max-w-xl mx-auto text-lg">
              Start a game at the same time everyday. It&apos;s a great way to
              bond with your team and build a sense of friendly competition.
            </p>
          </section> */}
          {/* <section className="my-16">
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight md:leading-tight md:tracking-normal mb-3">
              🪄 Easy to use
            </h2>
            <p className="max-w-xl mx-auto text-lg">
              No need to download any software or navigate confusing interfaces.
              TriviaStack integrates seamlessly with Slack, making it easy to
              use for anyone in your organization.
            </p>
          </section> */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
