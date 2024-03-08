"use client";
import { Button } from "@/components/ui/button";
import useSound from "use-sound";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";

interface Props {
  img1: StaticImageData;
  img2: StaticImageData;
  img3: StaticImageData;
  img4: StaticImageData;
}
const HomeComponent: React.FC<Props> = ({ img1, img2, img3, img4 }) => {
  const [playing, setPlaying] = useState(false);
  const [playing2, setPlaying2] = useState(false);
  const [playing3, setPlaying3] = useState(false);
  const [playing4, setPlaying4] = useState(false);
  const [play, { stop }] = useSound(
    "https://firebasestorage.googleapis.com/v0/b/my-saas-1.appspot.com/o/lobservateur.mp3.mp3?alt=media&token=8985ed8c-a960-4631-95f9-ed3ce9db476d"
  );
  const [play2, { stop: stopAudio2 }] = useSound(
    "https://audioplayer.madza.dev/Madza-Persistence.mp3"
  );
  const [play3, { stop: stopAudio3 }] = useSound(
    "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3"
  );
  const [play4, { stop: stopAudio4 }] = useSound(
    "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3"
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1 */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden flex  h-16">
        <Image src={img1} alt="Image 1" className="w-1/4 rounded-3xl" />
        <div className="p-4 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2">Lisa</h3>
        </div>
        <br />
        <div className="my-auto mr-4 ml-auto">
          <Button
            className=" "
            variant="outline"
            onClick={() => {
              if (playing) {
                stop();
              } else {
                play();
                console.log("playing");
              }
              setPlaying(!playing);
            }}
            size="icon"
          >
            {playing ? (
              <PauseIcon className="h-4 w-4" />
            ) : (
              <PlayIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden flex  h-16">
        <Image src={img2} alt="Image 2" className="w-1/4 rounded-3xl" />

        <div className="p-4 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2">Emma</h3>
        </div>
        <br />
        <div className="my-auto mr-4 ml-auto">
          <Button
            className=" "
            variant="outline"
            onClick={() => {
              if (playing2) {
                stopAudio2();
              } else {
                play2();
                console.log("playing");
              }
              setPlaying2(!playing2);
            }}
            size="icon"
          >
            {playing2 ? (
              <PauseIcon className="h-4 w-4" />
            ) : (
              <PlayIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden flex  h-16">
        <Image src={img3} alt="Image 3" className="w-1/4 rounded-3xl" />
        <div className="p-4 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2">Daniel</h3>{" "}
        </div>{" "}
        <br />
        <div className="my-auto mr-4 ml-auto">
          <Button
            className=" "
            variant="outline"
            onClick={() => {
              if (playing3) {
                stopAudio3();
              } else {
                play3();
                console.log("playing");
              }
              setPlaying3(!playing3);
            }}
            size="icon"
          >
            {playing3 ? (
              <PauseIcon className="h-4 w-4" />
            ) : (
              <PlayIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden flex h-16">
        <Image src={img4} alt="Image 4" className="w-1/4 rounded-3xl" />
        <div className="p-4 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2">Michael</h3>{" "}
        </div>{" "}
        <br />
        <div className="my-auto mr-4 ml-auto">
          <Button
            className=" "
            variant="outline"
            onClick={() => {
              if (playing4) {
                stopAudio4();
              } else {
                play4();
                console.log("playing");
              }
              setPlaying4(!playing4);
            }}
            size="icon"
          >
            {playing4 ? (
              <PauseIcon className="h-4 w-4" />
            ) : (
              <PlayIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default HomeComponent;
