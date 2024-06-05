import React, { useState } from "react";

import { Lato } from "next/font/google";
import classNames from "classnames";
const lato = Lato({ weight: ["400", "700", "900"], subsets: ["latin"] });

const questions = [
  {
    text: "What event led to the collapse of the Francis Scott Key Bridge in Baltimore?",
    correctAnswer: "Struck by cargo ship",
    incorrectAnswers: ["Tsunami", "Earthquake", "Struck by  Iceberg"],
    displayAnswers: [
      "Tsunami",
      "Struck by cargo ship",
      "Struck by Iceberg",
      "Earthquake",
    ],
    category: "Current Affairs",
    difficulty: "Easy",
  },
  {
    text: "Hey man 2",
    correctAnswer: "hey",
    incorrectAnswers: ["oi", "nah", "ok"],
    displayAnswers: ["oi", "hey", "nah", "ok"],
    category: "Current Affairs",
    difficulty: "Medium",
  },
  {
    text: "Hey man",
    correctAnswer: "hey 2",
    incorrectAnswers: ["oi", "nah", "ok"],
    displayAnswers: ["oi", "hey", "nah", "ok"],
    category: "Current Affairs",
    difficulty: "Medium",
  },
  {
    text: "Hey man",
    correctAnswer: "hey 2",
    incorrectAnswers: ["oi", "nah", "ok"],
    displayAnswers: ["oi", "hey", "nah", "ok"],
    category: "Current Affairs",
    difficulty: "Medium",
  },
];

interface ButtonProps {
  label: string;
  shouldPing?: boolean;
  isPrimary?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  shouldPing = false,
  isPrimary = false,
  onClick,
}) => (
  <button
    className={classNames(
      "relative px-4 py-1 border border-gray-300 rounded-md font-semibold hover:bg-gray-50 h-full",
      {
        "bg-[#006F50] hover:bg-[#147A5C] text-white": isPrimary,
      }
    )}
    onClick={onClick}
  >
    {shouldPing && (
      <span className="absolute -top-3 -left-2 h-4 w-4">
        <span className="animate-ping absolute -left-0.5 -top-0 inline-flex h-5 w-5 rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
      </span>
    )}

    <span>{label}</span>
  </button>
);

const TriviaGame = () => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [hasCompleted, setHasCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleClick = (answer: string) => {
    setSelectedAnswer(answer);
    // if (currentQuestionIndex === questions.length) {
    //   setHasCompleted(true);
    //   return;
    // } else {
    //   setCurrentQuestionIndex(() => currentQuestionIndex + 1);
    // }
  };

  const currentQuestion = questions[currentQuestionIndex];

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

        {!currentQuestion?.text || hasCompleted ? (
          <div>
            <p className="mt-8 text-lg">
              <strong>{"You did it!"}</strong>
              {` You managed to score 5/10`}
            </p>
          </div>
        ) : (
          <>
            <p className="mt-8 text-lg">
              <strong>{`Question ${currentQuestionIndex + 1}/${
                questions.length
              } - `}</strong>
              {` ${currentQuestion.text}`}
            </p>
            <p className="text-gray-500 mt-3">
              <strong>Category:</strong> {currentQuestion.category}  ·  
              <strong>Difficulty:</strong> {currentQuestion.difficulty}{" "}
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentQuestion.displayAnswers.map((answer) => (
                <Button
                  key={answer}
                  label={`${
                    selectedAnswer === answer &&
                    selectedAnswer === currentQuestion.correctAnswer
                      ? "✅ "
                      : ""
                  }
                  ${
                    selectedAnswer &&
                    selectedAnswer !== answer &&
                    answer === currentQuestion.correctAnswer
                      ? "✅ "
                      : ""
                  }
                  ${
                    selectedAnswer === answer &&
                    selectedAnswer !== currentQuestion.correctAnswer
                      ? "❌ "
                      : ""
                  } ${answer}`}
                  shouldPing={
                    answer === currentQuestion.correctAnswer &&
                    currentQuestionIndex === 0
                  }
                  onClick={() => handleClick(answer)}
                />
              ))}
            </div>
            <div
              className={classNames("flex items-center justify-between mt-8")}
            >
              <div
                className={classNames(
                  "opacity-0 text-gray-600 transition-opacity duration-300",
                  {
                    "opacity-100 text-gray-600": !!selectedAnswer,
                  }
                )}
              >
                {selectedAnswer === currentQuestion.correctAnswer
                  ? "🎉 You answered correctly!"
                  : `Correct Answer: ${currentQuestion.correctAnswer}`}
              </div>
              <div className="h-12">
                <Button
                  label="Next Question"
                  isPrimary
                  onClick={() => console.log("next")}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TriviaGame;
