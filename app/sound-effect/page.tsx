"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowBigLeft,
  DeleteIcon,
  LoaderIcon,
  Settings,
  TrashIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import * as fal from "@fal-ai/serverless-client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import axios from "axios";
import tiktokCreator from "../../public/tiktokcreator.jpg";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import dog from "../../public/dogbarking.jpg";
import firework from "../../public/firework.jpeg";
import helicopter from "../../public/helicopter.jpg";
import keyboard from "../../public/keyboard.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  QuestionMarkCircledIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
fal.config({
  credentials:
    "3acaf80b-c509-4c6d-a9a3-53201a9b9822:2779e88cfa33dbafceb17400f21c6b6d",
});
export default function SoundEffect() {
  const router = useRouter();
  const [texte, setText] = useState("");
  const [step, setStep] = useState("100");
  const [totalSec, setTotalSec] = useState("20");
  const [secStart, setSecStart] = useState("1");

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const creatsoundinclient = async () => {
    try {
      const result: any = await fal.subscribe("fal-ai/stable-audio", {
        input: {
          prompt: texte,
          seconds_total: Number(totalSec),
          steps: Number(step),
          seconds_start: Number(secStart),
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
        toast({
          variant: "default",
          title: "Process finished.",
          description: "Audio downloading... ",
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error.",
        description: `${error}`,
      });
    }

    //console.log(result.audio_file.url as string);
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
    <>
      <Button
        onClick={() => router.back()}
        className="fixed top-5 start-5"
        variant="outline"
      >
        <ArrowBigLeft />
      </Button>
      <div className="p-5 md:p-10 ">
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="flex justify-center">
          <div className="p-3 rounded-md  max-w-[900px]">
            <p className="text-2xl font-semibold m-5 text-center">
              Sound effect generator.
            </p>
            <p className="text-gray-400 text-center font-serif">
              describe any sound your want and get it in few second.
            </p>
            <p className="mt-20 underline font-mono mx-10 text-gray-400">
              SAMPLE
            </p>

            <div className="flex justify-center mx-5 md:mx-10 mb-[50px]">
              <ScrollArea className="w-full max-w-[700px] whitespace-nowrap rounded-md border">
                <div className="flex justify-center m-5 md:m-10">
                  <div className="flex items-center gap-2 ">
                    <Image
                      className="size-[100px] rounded-md  hover:bg-slate-300 p-1"
                      onClick={() => setText("helicopter sound flying")}
                      src={helicopter}
                      alt=""
                    />

                    <Image
                      className="size-[100px] rounded-md  hover:bg-slate-300 p-1"
                      onClick={() => setText("a dog barking")}
                      src={dog}
                      alt=""
                    />

                    <Image
                      className="size-[100px] rounded-md  hover:bg-slate-300 p-1"
                      onClick={() =>
                        setText("Fireworks exploding in the night sky")
                      }
                      src={firework}
                      alt=""
                    />

                    <Image
                      className="size-[100px] rounded-md  hover:bg-slate-300 p-1"
                      onClick={() => setText("Keyboard typing sound effect")}
                      src={keyboard}
                      alt=""
                    />
                    <Image
                      className="size-[100px] rounded-md  hover:bg-slate-300 p-1"
                      onClick={() => setText("Keyboard typing sound effect")}
                      src={keyboard}
                      alt=""
                    />
                    <Image
                      className="size-[100px] rounded-md  hover:bg-slate-300 p-1"
                      onClick={() => setText("Keyboard typing sound effect")}
                      src={keyboard}
                      alt=""
                    />
                    <Image
                      className="size-[100px] rounded-md  hover:bg-slate-300 p-1"
                      onClick={() => setText("Keyboard typing sound effect")}
                      src={keyboard}
                      alt=""
                    />
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <div className="flex justify-center">
              <Textarea
                placeholder="Type your message here.(english only)"
                className="h-[100px] md:h-[200px] max-w-[700px]"
                onChange={(e) => setText(e.target.value)}
                value={texte}
              />
            </div>

            <br />
            <Accordion type="single" collapsible className="m-10">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="font-semibold">Additional Settings </p>
                  <Settings />
                </AccordionTrigger>
                <AccordionContent>
                  <div className=" flex justify-center m-4 ">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="step">
                        Step:
                        <span className="text-sm text-gray-400">
                          ( The number of steps to denoise the audio for Default
                          value: 100)
                        </span>
                        <span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <QuestionMarkCircledIcon className="w-4 h-4" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  The number of steps to denoise the audio for
                                  Default value: 100
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </span>
                      </Label>
                      <Input
                        placeholder="Step"
                        value={step}
                        onChange={(e) => setStep(e.target.value)}
                      />

                      <Label htmlFor="total sec">
                        Total second:
                        <span className="text-sm text-gray-400">
                          (The duration of the audio clip to generate Default
                          value: 20)
                        </span>
                        <span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <QuestionMarkCircledIcon className="h-4 w-4" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  The duration of the audio clip to generate
                                  Default value: 20
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </span>
                      </Label>
                      <Input
                        placeholder="total second"
                        value={totalSec}
                        onChange={(e) => setTotalSec(e.target.value)}
                      />
                      <Label htmlFor="second start">
                        Second start:
                        <span className="text-sm text-gray-400">
                          (The start point of the audio clip to generate)
                        </span>
                        <span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <QuestionMarkCircledIcon className="w-4 h-4" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  The start point of the audio clip to generate
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </span>
                      </Label>
                      <Input
                        placeholder="second start"
                        value={secStart}
                        onChange={(e) => setSecStart(e.target.value)}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex justify-center">
              <div className="flex items-center gap-5 mt-10">
                <Button
                  onClick={() => {
                    if (texte !== "") {
                      //generateSoundEffect();
                      creatsoundinclient();
                      setLoading(true);
                    } else {
                      console.log("empty texte");
                      toast({
                        variant: "destructive",
                        title: "Text error.",
                        description: "Empty text",
                      });
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <LoaderIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    <p>Generate</p>
                  )}
                </Button>
                <Button onClick={() => setText("")} variant="destructive">
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
