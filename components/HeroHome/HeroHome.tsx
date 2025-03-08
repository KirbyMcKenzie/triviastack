import React, { FC } from "react";
import ButtonAddToSlack from "components/ButtonAddToSlack";
import TriviaGame from "components/TriviaGame";

const HeroHome: FC = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto md:px-5">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-4xl md:text-7xl px-6 font-black leading-tight md:leading-tight md:tracking-tight mb-10 max-w-[870px] mx-auto"
              data-aos="zoom-y-out"
            >
              Keep your team engaged with Trivia for Slack
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-lg font-light text-gray-300 tracking-wider mb-8 max-w-[420px] mx-auto px-4 md:px-0"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Fun and engaging trivia with new questions added every day
              </p>
              <div
                className="flex justify-center mt-10 sm:flex sm:justify-center row"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <ButtonAddToSlack
                  logoColor="white"
                  color="white"
                  backgroundColor="#2758E7"
                  border="none"
                />
              </div>
            </div>
          </div>
          <div
            className="flex justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="400"
          >
            <div className="flex flex-col justify-center max-w-6xl min-w-full">
              <TriviaGame />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
