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
  const screenshotRef = useRef(null);

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

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAnswerSubmit = () => {
    setIsButtonDisabled(true);

    const correctAnswer = randomQuestions[currentQuestionIndex].answer
      .trim()
      .toLowerCase()
      .replace(" ", "")
      .replace(",", "")
      .replace(".", "");
    const userAnswerLowerCase = userAnswer
      .trim()
      .toLowerCase()
      .replace(" ", "")
      .replace(",", "")
      .replace(".", "");

    const isAnswerCorrect = userAnswerLowerCase === correctAnswer;

    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };
  const takeScreenshot = () => {
    if (screenshotRef.current) {
      html2canvas(screenshotRef.current)
        .then((canvas) => {
          const dataURL = canvas.toDataURL();
          if (navigator.clipboard) {
            navigator.clipboard.writeText(dataURL)
              .then(() => {
                console.log('Screenshot copied to clipboard!');
              })
              .catch((error) => {
                console.error('Error copying to clipboard:', error);
              });
          } else {
            alert('Clipboard API not supported on this browser. You can manually take a screenshot.');
          }
        })
        .catch((error) => {
          console.error('Error capturing screenshot:', error);
        });
    }
  };
  
const copyText = () => {
  const message = `I just got a score of ${score}/10 in Stupid Trivia! Join me at https://beanfrog.xyz/projects/stupid-trivia`
  if (navigator.clipboard) {
    navigator.clipboard.writeText(message)
      .then(() => {
        console.log('text copied to clipboard!');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  } else {
    alert('Clipboard API not supported on this browser.');
  }
}


  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setUserAnswer("");
    setIsCorrect(null);
    setIsButtonDisabled(false);
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
    <div ref={screenshotRef} className="max-w-xl mx-auto mt-16 p-6 bg-gray-100 rounded-lg shadow-md h-[400px] w-[500px]">

      <h1 className="mb-4 text-3xl font-bold">Stupid Trivia</h1>
      {currentQuestionIndex < randomQuestions.length ? (
        <div>
          <p className="mb-2 text-lg">
            {randomQuestions[currentQuestionIndex].question}
          </p>
          <input
            type="text"
            value={userAnswer}
            onChange={handleAnswerChange}
            className="p-2 mb-4 w-full border"
          />
          <div className="flex">
            <button
              onClick={handleAnswerSubmit}
              className="flex-shrink-0 mr-2 text-white px-4 py-2 bg-emerald-400 hover:bg-emerald-500 rounded-md hover:scale-[1.01] active:scale-95"
              disabled={isButtonDisabled}
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
          <div className="flex flex-col justify-center items-center">
            <p className="mt-2 text-2xl text-center">Your score was:</p>
            <p className="mt-2 text-5xl font-bold text-center text-blue-500">
              {score}/10
            </p>
            <p className="mt-2 text-black">{getCurrentDate()}</p>
            <button
              onClick={handleResetGame}
              className="mt-4 text-white px-4 py-2 bg-emerald-400 hover:bg-emerald-500 rounded-md hover:scale-[1.01] active:scale-95"
            >
              Play Again
            </button>
            <div className="flex flex-row">
            <button
           onClick={takeScreenshot}
            className="mt-2 mr-2 text-white px-4 py-2 bg-emerald-400 hover:bg-emerald-500 rounded-md hover:scale-[1.01] active:scale-95"
          >
            Screenshot
          </button>

          <button
           onClick={copyText}
            className="mt-2 text-white px-4 py-2 bg-emerald-400 hover:bg-emerald-500 rounded-md hover:scale-[1.01] active:scale-95"
          >
            Copy text
          </button>
              </div>
            

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
