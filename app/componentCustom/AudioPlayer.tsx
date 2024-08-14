"use client";
import React, { useState } from "react";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  return (
    <div className="max-w-xs mx-auto p-4  rounded-lg ">
      <audio controls src={audioUrl}></audio>
    </div>
  );
};

export default AudioPlayer;
