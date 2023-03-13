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
                Discover a new way to have fun with your team on Slack. Start
                playing for free today, no credit card required.
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <a
                  href="https://slack.com/oauth/v2/authorize?scope=channels%3Ahistory%2Cchat%3Awrite%2Ccommands%2Cim%3Ahistory%2Creactions%3Awrite%2Cchat%3Awrite.public&amp;state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnN0YWxsT3B0aW9ucyI6eyJzY29wZXMiOlsiY2hhbm5lbHM6aGlzdG9yeSIsImNoYXQ6d3JpdGUiLCJjb21tYW5kcyIsImltOmhpc3RvcnkiLCJyZWFjdGlvbnM6d3JpdGUiLCJjaGF0OndyaXRlLnB1YmxpYyJdfSwibm93IjoiMjAyMy0wMy0wNFQwOTowMzoxNi4zNjRaIiwiaWF0IjoxNjc3OTIwNTk2fQ.gnh6HKeOik5ViNC3aD6BiR4odVUCs_e0vF0bPFz1RdE&amp;client_id=2239800642963.4264761473666"
                  // @ts-ignore
                  style={{
                    alignItems: "center",
                    color: "#000",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: 48,
                    display: "inline-flex",
                    fontFamily: "font-family:Lato, sans-serif",
                    fontSize: "16px",
                    paddingLeft: 20,
                    paddingRight: 20,
                    fontWeight: 600,
                    height: 54,
                    width: 210,
                    justifyContent: "center",
                    textDecoration: "none",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ height: 20, width: 20, marginRight: 12 }}
                    viewBox="0 0 122.8 122.8"
                  >
                    <path
                      d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
                      fill="#e01e5a"
                    ></path>
                    <path
                      d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
                      fill="#36c5f0"
                    ></path>
                    <path
                      d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
                      fill="#2eb67d"
                    ></path>
                    <path
                      d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
                      fill="#ecb22e"
                    ></path>
                  </svg>
                  Add to Slack
                </a>
              </div>
            </div>
          </div>
          <div>
            <div
              className="relative flex justify-center mb-8"
              data-aos="zoom-y-out"
              data-aos-delay="450"
            >
              <div className="flex flex-col justify-center max-w-4xl">
                <video
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  controls={true}
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
