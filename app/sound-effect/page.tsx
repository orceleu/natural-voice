"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigLeft, LoaderIcon } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as fal from "@fal-ai/serverless-client";

import axios from "axios";
fal.config({
  credentials:
    "3acaf80b-c509-4c6d-a9a3-53201a9b9822:2779e88cfa33dbafceb17400f21c6b6d",
});
export default function SoundEffect() {
  const router = useRouter();
  const [texte, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const creatsoundinclient = async () => {
    const result: any = await fal.subscribe("fal-ai/stable-audio", {
      input: {
        prompt: texte,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    if (result) {
      setLoading(false);
      router.push(result.audio_file.url as string);
    }
    console.log(result.audio_file.url as string);
  };
  const generateSoundEffect = async () => {
    await axios
      .post("/api/soundeffect", { text: texte })
      .then((res) => {
        const { url } = res.data;
        console.log(url.audio_file.url);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  return (
    <div className="p-10">
      <p className="text-emerald-600 text-4xl text-center">
        Sound effect generator
      </p>
      <p className="text-2xl font-semibold m-5">Sample.</p>
      <div className="flex justify-center">
        <div className="flex items-center gap-2 ">
          <div
            className="size-[100px] rounded-md bg-slate-500 hover:bg-slate-300 p-5"
            onClick={() => setText("helicopter sound flying")}
          >
            <p className="text-center text-white font-bold">
              helicopter sound flying
            </p>
          </div>
          <div
            className="size-[100px] rounded-md bg-slate-500 hover:bg-slate-300 p-5"
            onClick={() => setText("A dog barking in the park")}
          >
            <p className="text-center text-white font-bold">
              A dog barking in the park
            </p>
          </div>
          <div
            className="size-[100px] rounded-md bg-slate-500 hover:bg-slate-300 p-5"
            onClick={() => setText("Fireworks exploding in the night sky")}
          >
            <p className="text-center text-white font-bold">
              Fireworks exploding in the night sky
            </p>
          </div>
          <div className="size-[100px] rounded-md bg-slate-500 hover:bg-slate-300 p-5">
            <p className="text-center text-white font-bold">
              helicopter sound flying
            </p>
          </div>
        </div>
      </div>

      <Button onClick={() => router.back()} className="m-10">
        <ArrowBigLeft />
      </Button>

      <Textarea
        placeholder="Type your message here.(english only)"
        className="h-[100px] md:h-[200px] "
        onChange={(e) => setText(e.target.value)}
        value={texte}
      />

      <br />
      <Button
        onClick={() => {
          if (texte !== "") {
            //generateSoundEffect();
            creatsoundinclient();
            setLoading(true);
          } else {
            console.log("empty texte");
          }
        }}
        disabled={loading}
      >
        {loading ? (
          <LoaderIcon className="h-5 w-5 animate-spin" />
        ) : (
          <p>Generate sound effect</p>
        )}
      </Button>
    </div>
  );
}
