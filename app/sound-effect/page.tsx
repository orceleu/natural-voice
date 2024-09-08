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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
fal.config({
  credentials:
    "3acaf80b-c509-4c6d-a9a3-53201a9b9822:2779e88cfa33dbafceb17400f21c6b6d",
});
export default function SoundEffect() {
  const router = useRouter();
  const [texte, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const creatsoundinclient = async () => {
    try {
      const result: any = await fal.subscribe("fal-ai/stable-audio", {
        input: {
          prompt: texte,
          seconds_total: 30,
          steps: 100,
          seconds_start: 1,
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
    } catch (error) {
      setLoading(false);
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
          <div className="p-3 rounded-md shadow-md max-w-[900px]">
            <p className="text-2xl font-semibold m-5 text-center">Sample.</p>
            <p className="text-gray-400 text-center">
              describe any sound your want and get it in few second.
            </p>
            <div className="flex justify-center m-5 md:m-10 mb-[50px]">
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
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="font-semibold">Additional Settings </p>
                  <Settings />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="m-4">
                    <p className="my-2 "> More parameter.</p>

                    <Input placeholder="Step" />
                    <br />
                    <Input placeholder="total second" />
                    <br />
                    <Input placeholder="second start" />
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
