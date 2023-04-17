import React, { FC } from "react";
import ButtonAddToSlack from "components/ButtonAddToSlack";
import TextGradient from "components/TextGradient";

const HeroHome: FC = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-4xl md:text-6xl font-extrabold leading-tight md:leading-tight md:tracking-normal mb-4 max-w-[800px] mx-auto"
              data-aos="zoom-y-out"
            >
              Keep your team engaged with{" "}
              <TextGradient>Trivia for Slack</TextGradient>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-lg md:text-xl text-slate-400 mb-8 max-w-[500px] mx-auto px-4 md:px-0"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Discover a new way to have fun with your team on Slack
              </p>
              <div
                className="max-w-xs mx-auto mt-10 sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <ButtonAddToSlack />
              </div>
            </div>
          </div>
          <div
            className="flex justify-center"
            data-aos="zoom-y-out"
            data-aos-delay="450"
          >
            <div className="flex flex-col justify-center max-w-4xl md:min-w-[800px] md:min-h-[600px] rounded-lg">
              <video
                autoPlay={true}
                loop={true}
                muted={true}
                controls={true}
                playsInline={true}
                className="rounded-lg"
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
