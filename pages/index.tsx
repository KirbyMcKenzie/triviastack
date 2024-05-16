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
        <main className="flex-grow mx-auto px-5 text-center">
          <HeroHome />

          <div className="my-24">
            <FeatureSection
              title="Start a Game in Seconds"
              subtitle="Simply select a game mode, pick some categories and jump right in."
              contentNode={
                <div className="flex flex-col justify-center max-w-4xl shadow-2xl rounded-3xl">
                  <video
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    controls={true}
                    playsInline={true}
                    className="rounded-3xl"
                    src="/create-trivia-modal.mp4"
                  />
                </div>
                // <div className="shadow shadow-white bg-blue-600 rounded-3xl p-6 relative">
                //   <Image
                //     alt="Create trivia modal"
                //     src="/create-trivia-modal.png"
                //     height={338}
                //     width={350}
                //   />

                //   {/* <div className="h-4 bg-blue-600 absolute left-0 right-0 blur-md" /> */}
                // </div>
              }
            />
          </div>

          <div className="my-24">
            <FeatureSection
              title="Easy Setup"
              subtitle="Looking good over there mate, it's time to have a think about it"
              contentNode={<div>hey haha</div>}
            />
          </div>
          <div className="my-24">
            <FeatureSection
              title="Easy Setup"
              subtitle="Looking good over there mate, it's time to have a think about it"
              contentNode={<div>hey haha</div>}
            />
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
