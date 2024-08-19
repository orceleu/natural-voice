"use client";
import { Button } from "@/components/ui/button";
import useSound from "use-sound";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import { Player } from "react-simple-player";

interface Props {
  img1: StaticImageData;
  img2: StaticImageData;
  img3: StaticImageData;
  img4: StaticImageData;
}

const HomeComponent: React.FC<Props> = ({ img1, img2, img3, img4 }) => {
  const person = [
    {
      name: "Lisa",
      picture: img1,
      audioUrl:
        "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2FDanielGenerate.wav?alt=media&token=8f3f9605-706b-4dbc-9ac4-75fb3c212043",
    },
    {
      name: "Emma",
      picture: img2,
      audioUrl:
        "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2FDanielGenerate.wav?alt=media&token=8f3f9605-706b-4dbc-9ac4-75fb3c212043",
    },
    {
      name: "Daniel",
      picture: img3,
      audioUrl:
        "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2FDanielGenerate.wav?alt=media&token=8f3f9605-706b-4dbc-9ac4-75fb3c212043",
    },
    {
      name: "Michael",
      picture: img4,
      audioUrl:
        "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2FAnhonyGenerate.wav?alt=media&token=8544ae0a-3abb-4b07-8f30-7f90e3ae8126 ",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {person.map((item, index) => (
          <div
            className="bg-gray-50 animate-slidein  rounded-[30px] grid"
            key={index}
          >
            <Image
              key={index + 3}
              src={item.picture}
              alt=""
              className="w-[60px] h-[60px] rounded-[60px] mx-auto my-2 "
            />
            <h3
              key={index + 1}
              className="text-sm font-semibold my-auto mx-auto"
            >
              <p key={index + 4} className="font-mono">
                {item.name}
              </p>
            </h3>
            <div key={index + 2} className="mx-auto mb-auto mt-1">
              <Player
                key={index + 5}
                src={item.audioUrl}
                height={40}
                hideVolume
              />
            </div>
          </div>
        ))}
      </div>
      <p className=" my-10 text-center text-emerald-500 bg-emerald-50 rounded-xl font-mono">
        and 50 more...
      </p>
    </>
  );
};
export default HomeComponent;
