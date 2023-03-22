import ButtonAddToSlack from "components/ButtonAddToSlack/ButtonAddToSlack";
import React, { useState } from "react";
// import Modal from "../utils/Modal";

function HeroHome() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative">
      {/* Illustration behind hero content */}

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
                Discover a new way to have fun with your team on Slack.
                {/* Start playing for free today, no credit card required. */}
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
          <div>
            <div
              className="relative flex justify-center"
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
              {/* <button
                className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setVideoModalOpen(true);
                }}
                aria-controls="modal"
              >
                <svg
                  className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                  <path d="M10 17l6-5-6-5z" />
                </svg>
                <span className="ml-3">Watch the full video (2 min)</span>
              </button> */}
            </div>

            {/* Modal */}
            {/* <Modal
              id="modal"
              ariaLabel="modal-headline"
              show={videoModalOpen}
              handleClose={() => setVideoModalOpen(false)}
            >
              <div className="relative pb-9/16">
                <iframe
                  className="absolute w-full h-full"
                  src="https://player.vimeo.com/video/174002812"
                  title="Video"
                  allowFullScreen
                ></iframe>
              </div>
            </Modal> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
