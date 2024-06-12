import React, { useState } from "react";
import pluralize from "pluralize";
import { Lato } from "next/font/google";
import classNames from "classnames";
const lato = Lato({ weight: ["400", "700", "900"], subsets: ["latin"] });
import { useReward } from "react-rewards";
import questionsData from "./questions.json";
import LogoSlack from "components/LogoSlack";
import TriviaGameButton from "./TriviaGameButton";

const calendlyLink = "https://calendly.com/kirby-mckenzie/30min";
const learnMoreLink = "https://hbr.org/2013/07/employee-engagement-does-more";

const getRandomQuestions = (questions: any, numQuestions: number = 5): any => {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numQuestions);
};

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

const TriviaGame = () => {
  const [questions, setQuestions] = useState(questionsData.slice(0, 5));
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [hasCompleted, setHasCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;

  const { reward, isAnimating } = useReward("rewardId", "confetti", {
    lifetime: 400,
    spread: 100,
    elementCount: 200,
  });

  const handleAnswerQuestion = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setPoints(points + getPointsByDifficulty(currentQuestion.difficulty));
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer("");
    console.log({ currentQuestionIndex, len: questions.length });
    if (currentQuestionIndex + 1 === questions.length) {
      setHasCompleted(true);
      reward();
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
    setQuestions(getRandomQuestions(questionsData, 5));
  };

  return (
    <div className={lato.className} id="rewardId">
      <div className=" bg-white border-2 border-gray-100 max-w-[820px] mx-auto shadow-3xl text-left px-5 py-4 md:px-10 md:pt-8 md:pb-10 md:rounded-3xl duration-300 ease-in-out transition-all">
        <div className="flex items-center">
          <div className="bg-gray-50 border border-gray-200 p-1.5 md:p-2 rounded-lg h-10 w-10  md:h-14 md:w-14 hover:scale-75 transition-all duration-300">
            <LogoSlack />
          </div>

          <h2 className="text-2xl md:text-4xl font-black ml-3">Play Trivia</h2>
        </div>

        {!currentQuestion?.text || hasCompleted ? (
          <div className="md:text-lg">
            <p className="mt-8 text-xl md:text-2xl">
              <span className="mr-2">{"🎉"}</span>
              <strong>{"Quiz Complete!"}</strong>
            </p>
            <p className="mt-4 text-lg md:text-2xl">
              {"You got "}
              <strong>{score}</strong>
              {" of "}
              <strong>{questions.length}</strong>
              {" questions correct, scoring "}
              <strong>
                {points} {pluralize("points", points)}!
              </strong>
            </p>
            <p className="mt-3 text-gray-600 md:text-lg">
              {"🏆 Did you know engaged teams are more productive?"}
              <a
                href={learnMoreLink}
                target="_blank"
                rel="noreferrer"
                className=" ml-1 text-blue-600 hover:underline"
              >
                Learn more
              </a>
            </p>

            <div className="border-t border-gray-100 mt-[60px]" />

            <div
              className={classNames("flex items-center justify-between mt-8")}
            >
              {/* <div className={"text-gray-800 transition-opacity duration-300"}>
                {"Play again for a fresh set of questions 👉"}
              </div> */}
              <div className={"h-12 transition-opacity duration-300"}>
                <span className="mr-2">
                  <TriviaGameButton
                    label="Play Again"
                    isPrimary
                    onClick={handlePlayAgain}
                  />
                </span>
                <a href={calendlyLink} target="_blank" rel="noreferrer">
                  <TriviaGameButton label="Book Demo" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className="mt-8 text-lg md:text-2xl min-h-16">
              <strong>{`Question ${currentQuestionIndex + 1}/${
                questions.length
              } - `}</strong>
              {currentQuestion.text}
            </p>
            <p className="text-gray-500 md:text-lg mt-3">
              <strong>Category:</strong> {currentQuestion.category}  ·  
              <strong>Difficulty:</strong> {currentQuestion.difficulty}{" "}
            </p>

            <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentQuestion.displayAnswers.map((answer) => (
                <TriviaGameButton
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
            <div className="flex items-center justify-between mt-8">
              <div
                className={classNames(
                  "opacity-100 text-gray-700 transition-opacity duration-300 max-w-48 md:max-w-full",
                  {
                    "opacity-100 text-gray-700": !!selectedAnswer,
                  }
                )}
              >
                <strong>
                  {!selectedAnswer && isFirstQuestion
                    ? `Select an answer to continue ${
                        isFirstQuestion ? "👆" : ""
                      }`
                    : selectedAnswer === currentQuestion.correctAnswer
                    ? `🎉 You answered correctly!`
                    : ""}

                  {selectedAnswer &&
                  selectedAnswer !== currentQuestion.correctAnswer ? (
                    <>
                      <strong> Correct Answer: </strong>
                      {currentQuestion.correctAnswer}
                    </>
                  ) : (
                    ""
                  )}
                </strong>

                {selectedAnswer === currentQuestion.correctAnswer && (
                  <span className="animate-fadeIn ml-2 p-0.5 bg-gray-100 text-sm border border-gray-300 text-red-700 rounded ">{`+${getPointsByDifficulty(
                    currentQuestion.difficulty
                  )} ${pluralize(
                    "points",
                    getPointsByDifficulty(currentQuestion.difficulty)
                  )}`}</span>
                )}
              </div>

              <div
                className={
                  "hidden md:block h-12 transition-opacity duration-300"
                }
              >
                <TriviaGameButton
                  label={
                    currentQuestionIndex + 1 === questions.length
                      ? "Finish Trivia"
                      : "Next Question"
                  }
                  isPrimary
                  isDisabled={!selectedAnswer || isAnimating}
                  onClick={handleNextQuestion}
                />
              </div>
              <div className={"md:hidden h-12 transition-opacity duration-300"}>
                <TriviaGameButton
                  label={
                    currentQuestionIndex + 1 === questions.length
                      ? "Finish"
                      : "Next"
                  }
                  isPrimary
                  isDisabled={!selectedAnswer || isAnimating}
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
