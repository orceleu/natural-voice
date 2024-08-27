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
      name: "Rihanna",
      picture: img1,
      audioUrl:
        "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2FRihannaoriginal.mp3?alt=media&token=df26ad63-92ea-48ae-ba5a-7b99265713e4",
      audioClone:
        "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2FRihannaclone.wav?alt=media&token=ebbc1652-417d-4153-8c7f-6acb0d454c5d",
      lang: "en",
    },
    {
      name: "Donald Trump",
      picture: img2,
      audioUrl:
        "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2Ftrumporiginal.mp3?alt=media&token=d82cdf77-b991-49c2-a993-36ce26848912",
      audioClone:
        "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2Ftrumpclone.wav?alt=media&token=0819b32c-7088-43f9-8f15-db9bf906bec3",
      lang: "en",
    },
    {
      name: "Snoop dog",
      picture: img3,
      audioUrl:
        "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2Fsnoopdogoriginal.mp3?alt=media&token=d7962900-57ba-4458-ba7c-69c115ba85ce",
      audioClone:
        "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2Fsnoopdogclone.wav?alt=media&token=900ebed4-036f-46b5-95d4-53878d0c6d54",
      lang: "en",
    },
    {
      name: "Gad Elmaleh",
      picture: img4,
      audioUrl:
        "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2Fgadelmaleh.mp3?alt=media&token=cacc52d9-ebd7-4601-9837-a4c2f60ef040",
      audioClone:
        "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2Fgadelmalehclone.wav?alt=media&token=476c485c-1be6-4cba-8399-567f11423954",
      lang: "fr",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {person.map((item, index) => (
          <div
            className="bg-gray-50 animate-slidein1 rounded-[30px] grid"
            key={index}
          >
            <div
              className=" rounded-[24px] w-3 h-3 bg-emerald-400 animate-ping"
              key={index + 6}
            ></div>
            <Image
              key={index + 3}
              src={item.picture}
              alt=""
              className="w-[60px] h-[60px] rounded-[60px] mx-auto my-2 shadow-md shadow-yellow-300"
            />
            <h3
              key={index + 1}
              className="text-sm font-semibold my-auto mx-auto"
            >
              <p key={index + 4} className="font-mono">
                <span className="mx-1">{item.name}</span>
                <span className=" text-gray-400">({item.lang})</span>
              </p>
            </h3>
            <div key={index + 2} className="mx-auto mb-auto mt-1">
              <div className="grid gap-1">
                <div className="flex items-center gap-1">
                  <p className="text-gray-500 font-mono">(Original)</p>
                  <Player
                    key={index + 5}
                    src={item.audioUrl}
                    height={40}
                    hideVolume
                  />
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-gray-500 font-mono">(Cloned)</p>
                  <Player
                    key={index + 5}
                    src={item.audioClone}
                    height={40}
                    hideVolume
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className=" my-10 text-center text-emerald-500 bg-emerald-50 rounded-xl font-mono">
        and 15 preregistred voices...
      </p>
    </>
  );
};
export default HomeComponent;
