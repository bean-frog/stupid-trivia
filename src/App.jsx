import React, { useState } from 'react';
import Game from './Game';
import './built.css';
import Menu from './Menu';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);


function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [isModalVisible, setModalVisibility] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };
 const returnToMenu = () => {
    setGameStarted(false);
  };
  const displayAbout = () => {
    setModalVisibility(true);
  };

  const closeAbout = () => {
    setModalVisibility(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-500">
    <Menu />
      {gameStarted ? (
         <Game returnToMenu={returnToMenu} />
      ) : (
        <div className="text-center rounded-md bg-slate-400 h-fit w-fit p-12">
          <h1 className="text-3xl font-bold mb-4">Stupid Trivia</h1>
          <h1 className="text-lg font-bold mb-4">A game by <a className="underline" target="_blank" href="https://beanfrog.xyz">beanfrog</a></h1>
          <div className="flex flex-col">
          <button
            className="bg-emerald-400 hover:bg-emerald-500 rounded-md hover:scale-[1.01] active:scale-95 mb-2 text-white px-4 py-2 text-xl"
            onClick={startGame}
          >
            Play
          </button>
          <button
            className="text-white px-4 py-2 bg-slate-400 hover:bg-slate-500 rounded-md hover:scale-[1.01] active:scale-95 text-white px-4 py-2 text-xl"
            onClick={displayAbout}
          >
            About
          </button>
          </div>
          <div
            id="aboutModal"
            className={`modal fixed inset-0 flex items-center justify-center ${
              isModalVisible ? '' : 'hidden'
            }`}
          >
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

           <div className="modal-content bg-white p-8 rounded-lg shadow-md relative">
              <span
                id="closeButton"
                className="close absolute top-0 right-0 p-4 cursor-pointer text-2xl"
                onClick={closeAbout}
              >
                &times;
              </span>
              <p className="text-xl">Stupid Trivia</p>
              <p className="text-lg">A trivia game where most of the questions have absurd answers, inspired by <a href="https://www.youtube.com/watch?v=iUpVZ0_f6ic" className="underline">this</a> YouTube video.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
