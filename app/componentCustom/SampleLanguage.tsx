"use client";
import Image, { StaticImageData } from "next/image";

import { Player } from "react-simple-player";

interface Props {
  french: StaticImageData;
  english: StaticImageData;
  russia: StaticImageData;
  spanish: StaticImageData;
  portugal: StaticImageData;
  czech: StaticImageData;
  italian: StaticImageData;
  dutch: StaticImageData;
  chinese: StaticImageData;
  turkish: StaticImageData;
  polish: StaticImageData;
  arabic: StaticImageData;
}
/*
 <div className="mx-auto mb-auto mt-1">
              <Player src={item.audio} height={40} hideVolume />
            </div>

*/
const SampleLanguage: React.FC<Props> = ({
  french,
  english,
  russia,
  spanish,
  portugal,
  czech,
  italian,
  dutch,
  chinese,
  turkish,
  polish,
  arabic,
}) => {
  const sampleLanguage = [
    {
      flag: french,
      name: "French",
      audio: "audio",
    },
    {
      flag: english,
      name: "English",
      audio: "",
    },
    {
      flag: russia,
      name: "Russia",
      audio: "audio",
    },
    {
      flag: spanish,
      name: "Spanish",
      audio: "audio",
    },
    {
      flag: portugal,
      name: "Portugal",
      audio: "audio",
    },
    {
      flag: czech,
      name: "Czech",
      audio: "audio",
    },
    {
      flag: italian,
      name: "Italian",
      audio: "audio",
    },

    {
      flag: dutch,
      name: "Dutch",
      audio: "audio",
    },
    {
      flag: chinese,
      name: "Chinese",
      audio: "audio",
    },
    {
      flag: turkish,
      name: "Turkish",
      audio: "audio",
    },
    {
      flag: polish,
      name: "Polish",
      audio: "audio",
    },
    {
      flag: arabic,
      name: "Arabic",
      audio: "audio",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sampleLanguage.map((item, index) => (
          <div className="bg-slate-700 rounded-sm grid p-10" key={index}>
            <Image
              src={item.flag}
              alt=""
              className="w-[60px] h-[60px] rounded-[60px] mx-auto my-2 "
            />
            <h3 className="text-sm font-serif text-white  my-auto mx-auto">
              <p>{item.name}</p>
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};
export default SampleLanguage;
