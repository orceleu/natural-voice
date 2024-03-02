import React, { useState } from "react";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const [audio] = useState(new Audio(audioUrl));

  const play = () => {
    audio.play();
  };

  const pause = () => {
    audio.pause();
  };

  const download = () => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "audio";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-xs mx-auto p-4 bg-gray-200 rounded-lg shadow-md">
      <audio controls className="w-full" src={audioUrl}></audio>
      <div className="flex justify-center space-x-4 mt-4">
        <button className="btn btn-primary" onClick={play}>
          Lecture
        </button>
        <button className="btn btn-primary" onClick={pause}>
          Pause
        </button>
        <button className="btn btn-primary" onClick={download}>
          Télécharger laudio
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
