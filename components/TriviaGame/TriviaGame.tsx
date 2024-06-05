import React, { useState } from "react";

import { Lato } from "next/font/google";
import classNames from "classnames";
const lato = Lato({ weight: ["400", "700", "900"], subsets: ["latin"] });

const getPointsByDifficulty = (difficulty: string) => {
  switch (difficulty) {
    case "Hard":
      return 3;
    case "Medium":
      return 2;
    default:
      return 1;
  }
};

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
    text: "Who developed the theory of evolution by natural selection?",
    correctAnswer: "Charles Darwin",
    incorrectAnswers: ["Galileo Galilei", "Albert Einstein", "Isaac Newton"],
    displayAnswers: [
      "Galileo Galilei",
      "Charles Darwin",
      "Albert Einstein",
      "Isaac Newton",
    ],
    category: "Science",
    difficulty: "Medium",
  },
  {
    text: "Who declared victory in India's recent election after falling short of securing a 272-seat majority in parliament?",
    correctAnswer: "Narendra Modi",
    incorrectAnswers: ["Rahul Gandhi", "Jawaharlal Nehru", "Amit Shah"],
    displayAnswers: [
      "Narendra Modi",
      "Rahul Gandhi",
      "Jawaharlal Nehru",
      "Amit Shah",
    ],
    category: "Current Affairs",
    difficulty: "Medium",
  },
  {
    text: "When will the first debate between President Biden and former President Trump take place?",
    correctAnswer: "June 27",
    incorrectAnswers: ["June 20", "June 25", "July 1"],
    displayAnswers: ["June 20", "June 25", "June 27", "July 1"],
    category: "Election 2024",
    difficulty: "Medium",
  },
  {
    text: "When did the demolition of the Berlin wall begin?",
    correctAnswer: "1990",
    incorrectAnswers: ["1984", "1999", "1994"],
    displayAnswers: ["1990", "1984", "1999", "1994"],
    category: "History",
    difficulty: "Hard",
  },
];

interface ButtonProps {
  label: string;
  emoji?: string;
  shouldPing?: boolean;
  isPrimary?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  emoji,
  shouldPing = false,
  isPrimary = false,
  isDisabled = false,
  onClick,
}) => (
  <button
    disabled={isDisabled}
    className={classNames(
      "relative px-4 py-1 border border-gray-300 rounded-md font-semibold h-full disabled:opacity-50",
      {
        "bg-[#147A5C] hover:bg-[#006F50] text-white": isPrimary,
      },
      {
        "hover:bg-gray-50": !isPrimary,
      }
    )}
    onClick={onClick}
  >
    {shouldPing && (
      <span
        className="absolute -top-3 -left-2 h-4 w-4"
        data-aos="zoom-y-out"
        data-aos-delay="2000"
      >
        <span className="animate-ping absolute -left-0.5 -top-0 inline-flex h-5 w-5 rounded-full bg-blue-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500" />
      </span>
    )}

    <span>
      {emoji && (
        <span className="animate-fadeIn mr-2 absolute right-0">{emoji}</span>
      )}
      {label}
    </span>
  </button>
);

const TriviaGame = () => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [hasCompleted, setHasCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswerQuestion = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setPoints(points + getPointsByDifficulty(currentQuestion.difficulty));
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer("");
    if (currentQuestionIndex === questions.length) {
      setHasCompleted(true);
      return;
    } else {
      setCurrentQuestionIndex(() => currentQuestionIndex + 1);
    }
  };

  const handlePlayAgain = () => {
    setScore(0);
    setPoints(0);
    setCurrentQuestionIndex(0);
    setHasCompleted(false);
  };

  return (
    <div className={lato.className}>
      <div className="bg-white border border-gray-100 max-w-3xl mx-auto shadow-2xl text-left px-10 pt-6 pb-12 rounded-3xl hover:scale-105 duration-300 ease-in-out transition-all">
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
          <div className="text-lg">
            <p className="mt-8 text-xl">
              <span className="mr-2">{"🎉"}</span>
              <strong>{"Quiz Complete!"}</strong>
            </p>
            <p className="mt-4 text-xl">
              {"You got "}
              <strong>{score}</strong>
              {" of "}
              <strong>{questions.length}</strong>
              {" questions correct, scoring "}
              <strong>{points} points!</strong>
            </p>
            <p className="mt-2 text-gray-600 text-md">
              {"🏆 Did you know engaged teams are more productive?"}
              <a
                href="https://hbr.org/2013/07/employee-engagement-does-more"
                target="_blank"
                rel="noreferrer"
                className=" ml-1 text-blue-600 hover:underline"
              >
                Learn more
              </a>
            </p>

            <div
              className={classNames("flex items-center justify-between mt-12")}
            >
              {/* <div className={"text-gray-800 transition-opacity duration-300"}>
                {"Play again for a fresh set of questions 👉"}
              </div> */}
              <div className={"h-12 transition-opacity duration-300"}>
                <span className="mr-2">
                  <Button
                    label="Play Again "
                    isPrimary
                    onClick={handlePlayAgain}
                  />
                </span>
                <a
                  href="https://calendly.com/kirby-mckenzie/30min"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button label="Book Demo" onClick={() => {}} />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-8 text-lg min-h-14">
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
                  emoji={
                    selectedAnswer &&
                    selectedAnswer !== answer &&
                    answer === currentQuestion.correctAnswer
                      ? "✅ "
                      : "" ||
                        (selectedAnswer === answer &&
                          selectedAnswer === currentQuestion.correctAnswer)
                      ? "✅ "
                      : "" ||
                        (selectedAnswer === answer &&
                          selectedAnswer !== currentQuestion.correctAnswer)
                      ? "❌ "
                      : ""
                  }
                  label={`${answer}`}
                  shouldPing={
                    !selectedAnswer &&
                    answer === currentQuestion.correctAnswer &&
                    isFirstQuestion
                  }
                  onClick={() => handleAnswerQuestion(answer)}
                />
              ))}
            </div>
            <div
              className={classNames("flex items-center justify-between mt-8")}
            >
              <div
                className={classNames(
                  "opacity-100 text-gray-600 transition-opacity duration-300",
                  {
                    "opacity-100 text-gray-600": !!selectedAnswer,
                  }
                )}
              >
                {!selectedAnswer
                  ? `${
                      isFirstQuestion ? "👆" : ""
                    } Select an answer to continue`
                  : selectedAnswer === currentQuestion.correctAnswer
                  ? "🎉 You answered correctly!"
                  : `Correct Answer: ${currentQuestion.correctAnswer}`}
              </div>
              <div className={"h-12 transition-opacity duration-300"}>
                <Button
                  label="Next Question"
                  isPrimary
                  isDisabled={!selectedAnswer}
                  onClick={handleNextQuestion}
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
