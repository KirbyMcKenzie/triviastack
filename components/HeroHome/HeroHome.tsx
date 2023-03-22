import ButtonAddToSlack from "components/ButtonAddToSlack/ButtonAddToSlack";
import React, { useState } from "react";

function HeroHome() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tight md:leading-tight md:tracking-normal mb-4 max-w-[800px] mx-auto"
              data-aos="zoom-y-out"
            >
              Keep your team engaged with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400">
                Trivia for Slack
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-slate-400 mb-8 max-w-[500px] mx-auto px-4 md:px-0"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Discover a new way to have fun with your team on Slack
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
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
            <div className="flex flex-col justify-center max-w-4xl md:min-w-[800px] md:min-h-[600px] bg-slate-800 rounded-lg">
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
}

export default HeroHome;
