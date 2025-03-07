import FeatureSection from "components/FeatureSection";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import HeroHome from "components/HeroHome/HeroHome";
import type { NextPage } from "next";
import NextHead from "next/head";
import Image from "next/image";
import BackgroundGradient from "components/BackgroundGradient";
import GameModeCard from "components/GameModeCard/GameModeCard";

const Head = () => (
  <NextHead>
    <title>TriviaStack</title>
    <meta
      name="description"
      content="Keep your team engaged with Trivia for Slack."
    />
    <meta property="og:title" content="TriviaStack" />
    <meta
      property="og:description"
      content="Keep your team engaged with Trivia for Slack."
    />
    <meta property="og:image" content="/og-thumbnail.png" />
  </NextHead>
);

const Home: NextPage = () => {
  return (
    <>
      <Head />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mx-auto text-center z-10 overflow-hidden">
          <HeroHome />

          <div className="max-w-[1200px] mx-auto px-6">
            <div>
              <div className="my-24 md:my-64" data-aos="zoom-y-out">
                <FeatureSection
                  title="Keep up with News"
                  subtitle="Stay in the know with new current affair questions everyday. Keeping your trivia sessions fresh and your team in sync with the latest headlines and trends."
                  contentSide="left"
                  contentNode={
                    <div className="p-12 bg-black/30 backdrop-blur-sm transition-colors rounded-3xl shadow-3xl">
                      <div className="text-8xl hover:scale-110 transition-all ease-in-out">
                        {"🗞️"}
                      </div>
                    </div>
                  }
                />
              </div>

              <div className="my-24 md:my-64" data-aos="zoom-y-out">
                <FeatureSection
                  title="Scheduled Trivia"
                  subtitle="Set up your trivia games to run on any day of the week at your preferred time."
                  contentNode={
                    <div className="p-12 bg-slate-800/30 rounded-3xl shadow-3xl">
                      <div className="text-8xl hover:scale-110 transition-all ease-in-out">
                        {"⏰"}
                      </div>
                    </div>
                  }
                />
              </div>

              <div className="my-24 md:my-64" data-aos="zoom-y-out">
                <FeatureSection
                  title="Install in Seconds"
                  subtitle="Quick, simple and free. No credit card required."
                  contentSide="left"
                  contentNode={
                    <div className="bg-blue-600 rounded-3xl p-5 relative shadow-3xl">
                      <Image
                        alt="Create trivia modal"
                        src="/onboarding-dm.png"
                        height={142}
                        width={696}
                      />
                    </div>
                  }
                />
              </div>

              <h2
                className="text-4xl md:text-6xl font-extrabold mt-32"
                data-aos="zoom-y-out"
              >
                {"Explore Game Modes"}
              </h2>
              <p
                className="mt-4 mb-12 text-slate-300 text-lg font-light tracking-wide md:tracking-wider"
                data-aos="zoom-y-out"
                data-aos-delay="100"
              >
                Whether you&apos;re remote, hybrid or in-office, there&apos;s a
                mode that suits everyone
              </p>

              <div
                className="flex flex-col md:flex-row md:space-x-4 row md:mb-40"
                data-aos="zoom-y-out"
              >
                <GameModeCard
                  emoji="🎉"
                  title="Team"
                  subtitle="Answer questions together as a team, anyone in the channel can participate."
                />
                <GameModeCard
                  emoji="🏆"
                  title="Head to Head"
                  subtitle="Score points based on the difficulty of the questions. Scores are shared at the end."
                />
                <GameModeCard
                  emoji="💃"
                  title="Solo"
                  subtitle="Play in your direct messages at your own pace. Perfect for practice or small breaks."
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <div
        className="absolute -top-[22rem] md:top-0 left-0 right-0 bottom-0 opacity-70"
        data-aos="zoom-y-out"
        data-aos-delay="800"
      >
        <BackgroundGradient />
      </div>
    </>
  );
};

export default Home;
