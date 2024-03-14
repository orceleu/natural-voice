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
      audioUrl: "audio",
    },
    {
      name: "Emma",
      picture: img2,
      audioUrl: "audio",
    },
    {
      name: "Daniel",
      picture: img3,
      audioUrl: "audio",
    },
    {
      name: "Michael",
      picture: img4,
      audioUrl:
        " https://firebasestorage.googleapis.com/v0/b/my-saas-1.appspot.com/o/lobservateur.mp3.mp3?alt=media&token=8985ed8c-a960-4631-95f9-ed3ce9db476d",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {person.map((item, index) => (
          <div className="bg-gray-50 rounded-[30px] flex h-16" key={index}>
            <Image src={item.picture} alt="" className="w-1/5 rounded-[30px]" />
            <h3 className="text-sm font-semibold my-auto mx-auto">
              <p>{item.name}</p>
            </h3>
            <div className="ml-auto my-auto mr-5">
              <Player src={item.audioUrl} height={40} hideVolume />
            </div>
          </div>
        ))}
      </div>
      <p className=" my-10 text-center bg-emerald-50 rounded-xl">
        and 50 more...
      </p>
    </>
  );
};
export default HomeComponent;
