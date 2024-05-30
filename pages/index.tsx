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
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mx-auto text-center">
          <HeroHome />

          <div className="max-w-[1200px] mx-auto px-6">
            <h2
              className="text-4xl md:text-6xl font-extrabold mt-32"
              data-aos="zoom-y-out"
            >
              {"Explore Game Modes"}
            </h2>
            <p className="mt-4 mb-12 text-blue-600 text-xl font-normal tracking-wide md:tracking-wider">
              {
                "Whether you're remote, hybrid or in-office, there's a mode that suits everyone"
              }
            </p>

            <div
              className="flex flex-col md:flex-row md:space-x-4 row md:mb-40"
              data-aos="zoom-y-out"
            >
              <div className="flex flex-col justify-center w-full bg-gray-100 px-8 rounded-[46px] my-3 md:my-12 min-h-[380px]">
                <div className="text-8xl hover:scale-125 transition-all ease-in-out">
                  {"🎉"}
                </div>
                <h3 className="text-4xl font-extrabold my-8">
                  {"Team Trivia"}
                </h3>
                <p className="text-xl font-normal">
                  Answer questions together as a team, anyone in the channel can
                  participate.
                </p>
              </div>
              <div className="flex flex-col justify-center w-full bg-gray-100 px-8 rounded-[46px] my-3 md:my-12 min-h-[380px]">
                <div className="text-8xl hover:scale-125 transition-all ease-in-out">
                  {"🏆"}
                </div>
                <h3 className="text-4xl font-extrabold my-8">
                  {"Head to Head"}
                </h3>
                <p className="text-xl font-normal">
                  Score points based on the difficulty of the questions. Those
                  with the highest points win.
                </p>
              </div>
              <div className="flex flex-col justify-center w-full bg-gray-100 px-8 rounded-[46px] my-3 md:my-12 min-h-[380px]">
                <div className="text-8xl hover:scale-125 transition-all ease-in-out">
                  {"💃"}
                </div>
                <h3 className="text-4xl font-extrabold my-8">{"Solo"}</h3>
                <p className="text-xl font-normal">
                  Play in your direct messages at your own pace. Perfect for
                  practice or small breaks.
                </p>
              </div>
            </div>

            <div className="my-24 md:mt-48 md:mb-64" data-aos="zoom-y-out">
              <FeatureSection
                title="New Categories Every Week"
                subtitle="Keep up with events and current affairs, with an ever changing set of categories and questions."
                contentNode={
                  <div className=" bg-blue-600  rounded-3xl p-5 relative shadow-3xl">
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

            <div className="my-24 md:my-64" data-aos="zoom-y-out">
              <FeatureSection
                title="Keep up with News"
                subtitle="Stay in the know with new current affair questions everyday. Keeping your trivia sessions fresh and your team in sync with the latest headlines and trends."
                contentSide="left"
                contentNode={
                  <div className="p-12 bg-white rounded-3xl shadow-3xl">
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
                subtitle="Coming soon - Set up your trivia games to run on any day of the week at your preferred time."
                contentNode={
                  <div className="p-12 bg-white rounded-3xl shadow-3xl">
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
                  <div className=" bg-blue-600  rounded-3xl p-5 relative shadow-3xl">
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

            <div className="mt-18 mb-64 md:my-18" data-aos="zoom-y-out">
              <div
                className="flex flex-col md:flex-row justify-between items-center w-full p-8  md:p-16 min-h-[500px] rounded-[46px] my-12"
                style={{ backgroundColor: "#F7F7F7" }}
              >
                <div className="max-w-[466px] md:text-left">
                  <h2 className="text-4xl md:text-5xl font-extrabold">
                    {"Happy Teams are Productive Teams"}
                  </h2>
                  <p className="text-xl font-normal  mt-6">
                    According to HBR, companies with higher employee engagement
                    scores saw higher productivity, profitability, and customer
                    ratings.
                  </p>
                  <a
                    href="https://hbr.org/2013/07/employee-engagement-does-more"
                    target="_blank"
                    rel="noreferrer"
                    className="block my-6 text-blue-600 text-xl hover:underline"
                  >
                    Learn more
                  </a>
                </div>
                <div>
                  <Image
                    alt="Create trivia modal"
                    src="/trivia-reaction.png"
                    height={362}
                    width={582}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
