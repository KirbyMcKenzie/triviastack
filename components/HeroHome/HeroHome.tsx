import React, { FC } from "react";
import ButtonAddToSlack from "components/ButtonAddToSlack";
import DemoButton from "components/DemoButton";

const HeroHome: FC = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto md:px-5">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-4xl md:text-7xl font-black leading-tight md:leading-tight md:tracking-tight mb-4 max-w-[860px] mx-auto"
              data-aos="zoom-y-out"
            >
              Keep your team engaged with Trivia for Slack
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-2xl font-light md:text-2xl text-gray-600 tracking-wider mb-8 max-w-[500px] mx-auto px-4 md:px-0"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Fun and engaging trivia with new questions added everyday
              </p>
              <div
                className="flex justify-center mt-10 sm:flex sm:justify-center row"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div className="mr-4">
                  <ButtonAddToSlack
                    logoColor="white"
                    color="white"
                    backgroundColor="#2758E7"
                  />
                </div>
                <DemoButton />
              </div>

              {/* <p className="mt-4 text-slate-500">
                {"🤑 Install for free, no credit card required."}
              </p> */}
            </div>
          </div>
          <div
            className="flex justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="400"
          >
            <div className="flex flex-col justify-center max-w-6xl min-w-full">
              <video
                autoPlay={true}
                loop={true}
                muted={true}
                controls={true}
                playsInline={true}
                className="shadow-3xl md:rounded-3xl"
                src="/hero-video.mp4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
