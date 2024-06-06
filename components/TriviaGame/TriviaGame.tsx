import React, { useState } from "react";
import pluralize from "pluralize";
import { Lato } from "next/font/google";
import classNames from "classnames";
const lato = Lato({ weight: ["400", "700", "900"], subsets: ["latin"] });
import { useReward } from "react-rewards";

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

const questionsData = [
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
    text: "What planet is known as the Red Planet?",
    correctAnswer: "Mars",
    incorrectAnswers: ["Jupiter", "Saturn", "Venus"],
    displayAnswers: ["Mars", "Jupiter", "Saturn", "Venus"],
    category: "Science",
    difficulty: "Easy",
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
    text: "Who painted the Mona Lisa?",
    correctAnswer: "Leonardo da Vinci",
    incorrectAnswers: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
    displayAnswers: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Claude Monet",
      "Leonardo da Vinci",
    ],
    category: "Society & Culture",
    difficulty: "Medium",
  },
  {
    text: "What is the chemical formula for table salt?",
    correctAnswer: "NaCl",
    incorrectAnswers: ["KCl", "CaCl2", "Na2SO4"],
    displayAnswers: ["NaCl", "KCl", "CaCl2", "Na2SO4"],
    category: "Science",
    difficulty: "Hard",
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
    text: "What is the capital of France?",
    correctAnswer: "Paris",
    incorrectAnswers: ["London", "Berlin", "Rome"],
    displayAnswers: ["Paris", "London", "Berlin", "Rome"],
    category: "General Knowledge",
    difficulty: "Easy",
  },

  {
    text: "In which year did World War II end?",
    correctAnswer: "1945",
    incorrectAnswers: ["1944", "1943", "1942"],
    displayAnswers: ["1945", "1944", "1943", "1942"],
    category: "History",
    difficulty: "Easy",
  },
  {
    text: "Who wrote the play 'Romeo and Juliet'?",
    correctAnswer: "William Shakespeare",
    incorrectAnswers: ["Charles Dickens", "Mark Twain", "Jane Austen"],
    displayAnswers: [
      "William Shakespeare",
      "Charles Dickens",
      "Mark Twain",
      "Jane Austen",
    ],
    category: "Society & Culture",
    difficulty: "Easy",
  },
  {
    text: "Which element has the chemical symbol 'O'?",
    correctAnswer: "Oxygen",
    incorrectAnswers: ["Osmium", "Oganesson", "Ozone"],
    displayAnswers: ["Osmium", "Oganesson", "Ozone", "Oxygen"],
    category: "Science",
    difficulty: "Easy",
  },
  {
    text: "What is the largest ocean on Earth?",
    correctAnswer: "Pacific Ocean",
    incorrectAnswers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    displayAnswers: [
      "Indian Ocean",
      "Atlantic Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    category: "General Knowledge",
    difficulty: "Easy",
  },
  {
    text: "What is the main ingredient in traditional Japanese miso soup?",
    correctAnswer: "Soybeans",
    incorrectAnswers: ["Rice", "Tofu", "Seaweed"],
    displayAnswers: ["Soybeans", "Rice", "Tofu", "Seaweed"],
    category: "Society & Culture",
    difficulty: "Easy",
  },
  {
    text: "Who is known as the 'King of Pop'?",
    correctAnswer: "Michael Jackson",
    incorrectAnswers: ["Elvis Presley", "Prince", "Madonna"],
    displayAnswers: ["Michael Jackson", "Elvis Presley", "Prince", "Madonna"],
    category: "Music",
    difficulty: "Easy",
  },
  {
    text: "What is the smallest prime number?",
    correctAnswer: "2",
    incorrectAnswers: ["1", "3", "5"],
    displayAnswers: ["2", "1", "3", "5"],
    category: "General Knowledge",
    difficulty: "Easy",
  },
  {
    text: "What is the powerhouse of the cell?",
    correctAnswer: "Mitochondria",
    incorrectAnswers: ["Nucleus", "Ribosome", "Endoplasmic Reticulum"],
    displayAnswers: [
      "Nucleus",
      "Ribosome",
      "Mitochondria",
      "Endoplasmic Reticulum",
    ],
    category: "Science",
    difficulty: "Medium",
  },
  {
    text: "Who painted the Mona Lisa?",
    correctAnswer: "Leonardo da Vinci",
    incorrectAnswers: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
    displayAnswers: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Claude Monet",
      "Leonardo da Vinci",
    ],
    category: "Society & Culture",
    difficulty: "Medium",
  },
  {
    text: "Which planet has the most moons?",
    correctAnswer: "Jupiter",
    incorrectAnswers: ["Saturn", "Uranus", "Neptune"],
    displayAnswers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    category: "Science",
    difficulty: "Medium",
  },
  {
    text: "In which year did the Titanic sink?",
    correctAnswer: "1912",
    incorrectAnswers: ["1905", "1915", "1920"],
    displayAnswers: ["1912", "1905", "1915", "1920"],
    category: "History",
    difficulty: "Medium",
  },
  {
    text: "Who directed the film 'Pulp Fiction'?",
    correctAnswer: "Quentin Tarantino",
    incorrectAnswers: ["Steven Spielberg", "Martin Scorsese", "James Cameron"],
    displayAnswers: [
      "Steven Spielberg",
      "Martin Scorsese",
      "Quentin Tarantino",
      "James Cameron",
    ],
    category: "Film & TV",
    difficulty: "Medium",
  },
  {
    text: "What is the longest river in the world?",
    correctAnswer: "Nile River",
    incorrectAnswers: ["Amazon River", "Yangtze River", "Mississippi River"],
    displayAnswers: [
      "Amazon River",
      "Yangtze River",
      "Mississippi River",
      "Nile River",
    ],
    category: "General Knowledge",
    difficulty: "Medium",
  },
  {
    text: "Who composed the music for the ballet 'Swan Lake'?",
    correctAnswer: "Pyotr Ilyich Tchaikovsky",
    incorrectAnswers: [
      "Ludwig van Beethoven",
      "Johann Sebastian Bach",
      "Wolfgang Amadeus Mozart",
    ],
    displayAnswers: [
      "Ludwig van Beethoven",
      "Pyotr Ilyich Tchaikovsky",
      "Johann Sebastian Bach",
      "Wolfgang Amadeus Mozart",
    ],
    category: "Music",
    difficulty: "Medium",
  },
  {
    text: "What is the chemical formula for table salt?",
    correctAnswer: "NaCl",
    incorrectAnswers: ["KCl", "CaCl2", "Na2SO4"],
    displayAnswers: ["NaCl", "KCl", "CaCl2", "Na2SO4"],
    category: "Science",
    difficulty: "Hard",
  },
  {
    text: "What year did the Berlin Wall fall?",
    correctAnswer: "1989",
    incorrectAnswers: ["1987", "1990", "1991"],
    displayAnswers: ["1989", "1987", "1990", "1991"],
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
}) => {
  return (
    <button
      disabled={isDisabled}
      className={classNames(
        "relative px-4 py-1 border border-gray-300 rounded-md font-semibold h-full disabled:opacity-50 md:text-lg",
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
      <div className="bg-white border-2 border-gray-100 max-w-[820px] mx-auto shadow-3xl text-left px-8 py-6 md:px-10 md:pt-8 md:pb-10 rounded-3xl duration-300 ease-in-out transition-all">
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

          <h2 className="text-3xl md:text-4xl font-black ml-3">
            Head to Head Trivia
          </h2>
        </div>

        {!currentQuestion?.text || hasCompleted ? (
          <div className="text-lg">
            <p className="mt-8 text-2xl">
              <span className="mr-2">{"🎉"}</span>
              <strong>{"Quiz Complete!"}</strong>
            </p>
            <p className="mt-4 text-2xl">
              {"You got "}
              <strong>{score}</strong>
              {" of "}
              <strong>{questions.length}</strong>
              {" questions correct, scoring "}
              <strong>{points} points!</strong>
            </p>
            <p className="mt-3 text-gray-600 text-lg">
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

            <div className="border-t border-gray-100 mt-[60px]" />

            <div
              className={classNames("flex items-center justify-between mt-8")}
            >
              {/* <div className={"text-gray-800 transition-opacity duration-300"}>
                {"Play again for a fresh set of questions 👉"}
              </div> */}
              <div className={"h-12 transition-opacity duration-300"}>
                <span className="mr-2">
                  <Button
                    label="Play Again"
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
            <p className="mt-8 text-xl md:text-2xl min-h-16">
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
            <div className="flex items-center justify-between mt-8">
              <div
                className={classNames(
                  "opacity-100 text-gray-700 transition-opacity duration-300",
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
                <Button
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
                <Button
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
