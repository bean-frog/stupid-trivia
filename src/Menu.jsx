import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Menu() {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [isAudioPlaying, setAudioPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Initial volume

  const audioRef = React.createRef();

  useEffect(() => {
    const audioElement = audioRef.current;

    if (isAudioPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    audioElement.volume = volume;
  }, [isAudioPlaying, volume]);

  const displayMenu = () => {
    setMenuVisibility(true);
  };

  const closeMenu = () => {
    setMenuVisibility(false);
  };

  const toggleAudio = () => {
    setAudioPlaying(!isAudioPlaying);
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
    <div className="h-fit w-screen bg-white absolute top-0 left-0 z-[999]">
      <FontAwesomeIcon
        className="absolute p-2 top-0 left-0 cursor-pointer"
        onClick={displayMenu}
        icon={faBars}
      />

      <div
        className={`h-fit w-fit bg-slate-100 rounded-md absolute top-6 left-2 p-4 ${isMenuVisible ? '' : 'hidden'}`}
      >
        <button onClick={closeMenu} className="float-right text-2xl">
          &times;
        </button>
        <p className="pb-4">Stupid Trivia Menu</p>
        <label className="pr-2" for="audiocb">
          Music
        </label>
          <input name="audiocb" type="checkbox" checked={isAudioPlaying} onChange={toggleAudio} />
        <br />
        <label for="musicvol" className="pr-2">
          Music Volume
        </label>
        <input
            name="musicvol"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="transform translate-y-1"
          />
        <audio loop="true" ref={audioRef} src="./goofyahbeat.mp3" />
      </div>
    </div>
  );
}

export default Menu;