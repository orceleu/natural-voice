"use client";
import React, { useState } from "react";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  return (
    <div className="max-w-xs mx-auto p-4 bg-gray-200 rounded-lg shadow-md">
      <audio controls className="w-full" src={audioUrl}></audio>
      <div className="flex justify-center space-x-4 mt-4">
        <button className="btn btn-primary">Read</button>
        <button className="btn btn-primary">Pause</button>
        <button className="btn btn-primary">Download audio</button>
      </div>
    </div>
  );
};

export default AudioPlayer;
