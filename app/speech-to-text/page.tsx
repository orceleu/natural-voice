"use client";
import React, { useEffect, useRef, useState } from "react";

import {
  ArrowBigLeft,
  AudioWaveformIcon,
  DeleteIcon,
  LoaderIcon,
  Settings,
  TrashIcon,
} from "lucide-react";
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
import { signOut, onAuthStateChanged, User } from "firebase/auth";

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
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { auth, storage } from "../firebase/config";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from "firebase/storage";

interface Item {
  name: string;
  path: string;
  url: string;
}
fal.config({
  credentials:
    "3acaf80b-c509-4c6d-a9a3-53201a9b9822:2779e88cfa33dbafceb17400f21c6b6d",
});
export default function SpeeToText() {
  const router = useRouter();
  const [texte, setText] = useState("");
  const [step, setStep] = useState("100");
  const [totalSec, setTotalSec] = useState("20");
  const [secStart, setSecStart] = useState("1");
  const [stringList, setStringList] = useState<Item[]>([]);
  const [uploadIsLoaded, setUploadLoaded] = useState(false);
  const [userId, setUserid] = useState("");

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const audioUrl = useRef("");

  const deleteFile = async (audioPath: string) => {
    const storageRef2 = await ref(storage, audioPath);
    deleteObject(storageRef2)
      .then(() => {
        //setChange(!changed);
        const copyfuits = [...stringList];
        const updateFuits = copyfuits.filter(
          (fuits) => fuits.path !== audioPath
        );
        //setStringList(updateFuits);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    if (user?.uid) {
      deleteFile(`users/${user?.uid}/speechToText/audio`);
    } else {
      console.log("uid not found ");
    }
  }, [user]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];

    if (!file) {
      toast({
        variant: "destructive",
        title: "No file found.",
      });
    } else {
      if (file && file.type.startsWith("audio/")) {
        //console.log("est un fichier audio");
        //console.log(`${file.size / 1024} KB`);
        if (file.size > 2000000) {
          toast({
            variant: "destructive",
            title: "audio size too large (> 2MB).",
          });
        } else {
          // setUploadLoaded(true);
          const storageRef = ref(
            storage,
            `users/${user?.uid}/speechToText/audio`
          );
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              // setProgresspercent(progress);
              // if (progresspercent == 100) {
              //  setChange(!changed);
              //console.log("upload finished");
              //}
            },
            (error) => {
              alert(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                //setAudioUrl(downloadURL);
                console.log(downloadURL);
                audioUrl.current = downloadURL;
              });
            }
          );
        }
      } else {
        //console.log("nest pas");
        toast({
          variant: "destructive",
          title: "Only audio file can be uploaded.",
        });
      }
    }
  };

  const submitSpeech = async () => {
    try {
      const result: any = await fal.subscribe("fal-ai/whisper", {
        input: {
          audio_url: audioUrl.current,
          task: "transcribe",
          chunk_level: "segment",
          version: "3",
          batch_size: 64,
          num_speakers: null,
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
        setText(result.text as string);
        console.log(result.text);

        toast({
          variant: "default",
          title: "Note.",
          description: "Process finished... ",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const name = currentUser?.displayName;
        const userEmail = currentUser?.email;
        const uiid = currentUser?.uid;
        // setUserEmail(userEmail);
        setUserid(uiid);
        console.log(currentUser?.displayName);
        if (name !== undefined && name !== null) {
          //setUserName(name);
        } else {
        }
      }
      if (currentUser == null) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [user]);
  /* const creatsoundinclient = async () => {
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
        //route.push(result.audio_file.url as string);
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
*/
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
              Speech to text converter.
            </p>
            <p className="text-gray-400 text-center font-serif">
              Upload your audio and get the text in a few second.
            </p>

            <div className="flex justify-center">
              <form onSubmit={handleSubmit}>
                <div className="grid w-[320px] items-center gap-1.5">
                  <Label htmlFor="picture">
                    Upload your voice(mp3,wav)
                    <AudioWaveformIcon />
                  </Label>
                  <Input id="picture" type="file" />
                </div>
                <Button
                  type="submit"
                  className="my-2"
                  disabled={uploadIsLoaded}
                >
                  {uploadIsLoaded ? (
                    <ReloadIcon className=" h-5 w-5 animate-spin" />
                  ) : (
                    "Upload"
                  )}
                </Button>
              </form>
            </div>

            <Textarea
              placeholder="result"
              className="m-3"
              value={texte}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />

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
                    //generateSoundEffect();
                    submitSpeech();
                    setLoading(true);
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <LoaderIcon className="h-5 w-5 animate-spin" />
                  ) : (
                    <p>Convert</p>
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
