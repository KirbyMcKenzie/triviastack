import React, { ReactChildren } from "react";

import { Lato } from "next/font/google";
import Logo from "components/Logo/Logo";
const lato = Lato({ weight: ["400", "700", "900"], subsets: ["latin"] });

const Button: React.FC = (props) => (
  <button className="px-4 py-1 border border-gray-300 rounded-md w-full font-semibold hover:bg-gray-50">
    {props.children}
  </button>
);

const TriviaGame = () => {
  return (
    <div className={lato.className}>
      <div className="bg-white border border-gray-100 max-w-3xl mx-auto shadow-2xl text-left px-10 pt-6 pb-12 rounded-xl">
        <div className="flex items-center">
          <div className="bg-gray-50 border border-gray-200 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: 36, width: 36 }}
              viewBox="0 0 122.8 122.8"
            >
              <path
                d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z"
                fill={"#e01e5a"}
              ></path>
              <path
                d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z"
                fill={"#36c5f0"}
              ></path>
              <path
                d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z"
                fill={"#2eb67d"}
              ></path>
              <path
                d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z"
                fill={"#ecb22e"}
              ></path>
            </svg>
          </div>

          <h2 className="text-3xl font-black ml-3">Head to Head Trivia</h2>
        </div>
        <p className="mt-8 text-lg">
          <strong>Question 2/10 - </strong> Why was the New York-Dublin Portal
          temporarily shut down?
        </p>
        <p className="text-gray-500 mt-3">
          <strong>Category:</strong> Current Affairs  ·  
          <strong>Difficulty:</strong> Hard{" "}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <Button>Technical malfunction</Button>
          <Button>Inappropriate content</Button>
          <Button>Weather conditions</Button>
          <Button>Lack of interest</Button>
        </div>
      </div>
    </div>
  );
};

export default TriviaGame;
