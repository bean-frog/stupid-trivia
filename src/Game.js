import React, { useState, useEffect, useRef } from "react";
import questions from "./questions";
import html2canvas from "html2canvas";

const getRandomQuestions = (questionsArray, numberOfQuestions = 10) => {
  const shuffledQuestions = questionsArray.sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, numberOfQuestions);
};

const Game = ({ returnToMenu }) => {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const gameContainerRef = useRef(null);

  const handleResetGame = () => {
    const selectedQuestions = getRandomQuestions(questions);
    setRandomQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setIsCorrect(null);
    setScore(0);
  };

  useEffect(() => {
    const selectedQuestions = getRandomQuestions(questions);
    setRandomQuestions(selectedQuestions);
  }, []);

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleAnswerSubmit = () => {
    const correctAnswer = randomQuestions[currentQuestionIndex].answer
      .trim()
      .toLowerCase();
    const userAnswerLowerCase = userAnswer.trim().toLowerCase();

    const isAnswerNumeric = !isNaN(userAnswerLowerCase);
    const isAnswerCorrect =
      (isAnswerNumeric && userAnswerLowerCase === correctAnswer) ||
      (!isAnswerNumeric &&
        (userAnswerLowerCase.includes(correctAnswer) ||
          correctAnswer.includes(userAnswerLowerCase) ||
          getCommonLength(userAnswerLowerCase, correctAnswer) >=
            Math.ceil(correctAnswer.length * 0.2)));

    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const getCommonLength = (str1, str2) => {
    let commonLength = 0;
    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
      if (str1[i] === str2[i]) {
        commonLength++;
      } else {
        break;
      }
    }
    return commonLength;
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setUserAnswer("");
    setIsCorrect(null);
  };

  const handleScreenshot = async () => {
    if (gameContainerRef.current) {
      try {
        const screenshot = await html2canvas(gameContainerRef.current);
        const imageDataUrl = screenshot.toDataURL();

        // Copy the image to the clipboard
        copyToClipboard(imageDataUrl);
        alert("Screenshot copied to clipboard!");
      } catch (error) {
        console.error("Error capturing screenshot:", error);
        alert("Error capturing screenshot. Please try again.");
      }
    }
  };
 const copyToClipboard = (imageDataUrl) => {
    navigator.clipboard.writeText(imageDataUrl)
      .then(() => {
        console.log('Screenshot copied to clipboard!');
      })
      .catch((err) => {
        console.error('Unable to copy to clipboard', err);
      });
  };

const getCurrentDate = () => {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  let newDate = new Date();
  let date = newDate.getDate();
  let month = months[newDate.getMonth()];
  let year = newDate.getFullYear();
  let formattedDate = (date < 10) ? `0${date}` : `${date}`;
  return `${formattedDate} ${month} ${year}`;
};

  return (
    <div ref={gameContainerRef} className="max-w-xl mx-auto mt-16 p-6 bg-gray-100 rounded-lg shadow-md h-[400px] w-[500px]">

      <h1 className="text-3xl font-bold mb-4">Stupid Trivia</h1>
      {currentQuestionIndex < randomQuestions.length ? (
        <div>
          <p className="text-lg mb-2">
            {randomQuestions[currentQuestionIndex].question}
          </p>
          <input
            type="text"
            value={userAnswer}
            onChange={handleAnswerChange}
            className="border p-2 mb-4 w-full"
          />
          <div className="flex">
            <button
              onClick={handleAnswerSubmit}
              className="flex-shrink-0 mr-2 text-white px-4 py-2 bg-emerald-400 hover:bg-emerald-500 rounded-md hover:scale-[1.01] active:scale-95"
            >
              Submit Answer
            </button>
            {isCorrect !== null && (
              <button
                onClick={handleNextQuestion}
                className="flex-shrink-0 text-white px-4 py-2 bg-slate-400 hover:bg-slate-500 rounded-md hover:scale-[1.01] active:scale-95"
              >
                Next Question
              </button>
            )}
          </div>
          {isCorrect !== null && (
            <p
              className={`${
                isCorrect ? "text-emerald-500" : "text-red-500"
              } mb-2`}
            >
              {isCorrect
                ? "Correct!"
                : `Incorrect. The correct answer is "${randomQuestions[currentQuestionIndex].answer}".`}
            </p>
          )}
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl mt-2 text-center">Your score was:</p>
            <p className="text-5xl mt-2 text-blue-500 font-bold text-center">
              {score}/10
            </p>
            <p className="text-black mt-2">{getCurrentDate()}</p>
            <button
              onClick={handleResetGame}
              className="mt-4 text-white px-4 py-2 bg-emerald-400 hover:bg-emerald-500 rounded-md hover:scale-[1.01] active:scale-95"
            >
              Play Again
            </button>
             <button
            onClick={handleScreenshot}
            className="mt-2 text-white px-4 py-2 bg-emerald-400 hover:bg-emerald-500 rounded-md hover:scale-[1.01] active:scale-95"
          >
            Screenshot your score
          </button>
            <button
              onClick={returnToMenu}
              className="mt-2 text-white px-4 py-2 bg-slate-400 hover:bg-slate-500 rounded-md hover:scale-[1.01] active:scale-95"
            >
              Exit to main menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
