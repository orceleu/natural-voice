"use client";
import React, { useEffect, useRef, useState } from "react";

import {
  ArrowBigLeft,
  AudioWaveformIcon,
  CheckIcon,
  ChevronDownIcon,
  DeleteIcon,
  LoaderIcon,
  Settings,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as fal from "@fal-ai/serverless-client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
import { Progress } from "@/components/ui/progress";

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
  const [changed, setChange] = useState(false);

  const [step, setStep] = useState("100");
  const [totalSec, setTotalSec] = useState("20");
  const [secStart, setSecStart] = useState("1");
  const [stringList, setStringList] = useState<Item[]>([]);
  const [uploadIsLoaded, setUploadLoaded] = useState(false);
  const [userId, setUserid] = useState("");
  const [open, setOpen] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);

  const [selectedTask, setSelectedTask] = useState("transcribe");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isTranslanteMode, setTranslanteMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const audioUrl = useRef("");
  const isTranslante = useRef(false);
  const task = [
    {
      value: "transcribe",
      label: "transcription ",
    },
    {
      value: "translation",
      label: "translation",
    },
  ];

  const language = [
    {
      value: "en",
      label: "to English ",
    },
    {
      value: "sp",
      label: "to Spanish",
    },
    {
      value: "zh",
      label: "to Shinese",
    },
    {
      value: "it",
      label: "to Italian",
    },
    {
      value: "de",
      label: "to Deutch",
    },
    {
      value: "af",
      label: "to African",
    },
    {
      value: "am",
      label: "to Deutch",
    },
    {
      value: "ar",
      label: "to Deutch",
    },

    {
      value: "as",
      label: "to Deutch",
    },

    {
      value: "az",
      label: "to Deutch",
    },
    {
      value: "ba",
      label: "to Deutch",
    },
    {
      value: "be",
      label: "to Deutch",
    },
    {
      value: "bg",
      label: "to Deutch",
    },
    {
      value: "bn",
      label: "to Deutch",
    },
    {
      value: "bo",
      label: "to Deutch",
    },
    {
      value: "br",
      label: "to Deutch",
    },
    {
      value: "bs",
      label: "to Deutch",
    },
    {
      value: "ca",
      label: "to Deutch",
    },
    {
      value: "cs",
      label: "to Deutch",
    },
    {
      value: "cy",
      label: "to Deutch",
    },
    {
      value: "da",
      label: "to Deutch",
    },
    {
      value: "el",
      label: "to Deutch",
    },
  ];

  /*
  af, am, ar, as, az, ba, be, bg, bn, bo, br, bs, 
  ca, cs, cy, da, de, el, en, es, et, eu, fa, fi, 
  fo, fr, gl, gu, ha, haw, he, hi, hr, ht, hu, hy, 
  id, is, it, ja, jw, ka, kk, km, kn, ko, la, lb, 
  ln, lo, lt, lv, mg, mi, mk, ml, mn, mr, ms, mt,
   my, ne, nl, nn, no, oc, pa, pl, ps, pt, ro, ru, 
   sa, sd, si, sk, sl, sn, so, sq, sr, su, sv, sw, 
   ta, te, tg, th, tk, tl, tr, tt, uk, ur, uz, vi, 
   yi, yo, yue, zh


  */
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
          setUploadLoaded(true);
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
              setProgresspercent(progress);
              if (progresspercent == 100) {
                setChange(!changed);
                console.log("upload finished");
              }
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
  useEffect(() => {
    if (progresspercent == 100) {
      // setTimeout(listAllFile, 3000);
      setTimeout(() => {
        toast({
          title: "Uploaded!",
        });
        setProgresspercent(0);
        setUploadLoaded(false);
      }, 500);
    }
  }, [progresspercent]);

  const submitSpeech = async () => {
    try {
      const result: any = await fal.subscribe("fal-ai/whisper", {
        input: {
          audio_url: audioUrl.current,
          task: selectedTask,
          chunk_level: "segment",
          version: "3",
          batch_size: 64,
          num_speakers: null,
          language: undefined,
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
          <div className="p-3 rounded-md w-full max-w-[900px]">
            <p className="text-2xl md:text-4xl  font-semibold m-5 md:m-10 text-center">
              Speech to text converter.
            </p>
            <p className="text-gray-400 text-center font-serif my-5">
              Upload your audio and get the text in a few second.
            </p>

            <div className="flex justify-center">
              <form onSubmit={handleSubmit}>
                <div className="grid w-[320px] items-center gap-1.5">
                  <Label htmlFor="picture">
                    <div className="flex items-center gap-2">
                      <p>Upload your audio (mp3,wav)</p>
                      <AudioWaveformIcon />
                    </div>
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
            <div className="flex justify-center">
              {uploadIsLoaded ? (
                <Progress value={progresspercent} className="w-[60%] my-3" />
              ) : (
                <p>-</p>
              )}
            </div>

            <div className="mx-3 my-3">
              <div className="flex items-center gap-4">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between"
                    >
                      {selectedTask
                        ? task.find((task) => task.value === selectedTask)
                            ?.label
                        : "Select task..."}
                      <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search Task..."
                        className="h-9"
                      />
                      <CommandEmpty>No Task found.</CommandEmpty>
                      <CommandGroup>
                        {task.map((task: any) => (
                          <CommandItem
                            key={task.value}
                            value={task.value}
                            onSelect={(currentValue) => {
                              setSelectedTask(
                                currentValue === selectedTask
                                  ? ""
                                  : currentValue
                              );
                              setOpen(false);
                              console.log(
                                ` task selected: ${selectedTask} : ${currentValue}`
                              );
                              if (currentValue == "translation") {
                                setTranslanteMode(true);
                              } else {
                                setTranslanteMode(false);
                              }
                            }}
                          >
                            {task.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedTask === task.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <div>
                  {isTranslanteMode ? (
                    <Popover open={openLang} onOpenChange={setOpenLang}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openLang}
                          className="w-[200px] justify-between"
                        >
                          {selectedLanguage
                            ? language.find(
                                (task) => task.value === selectedLanguage
                              )?.label
                            : "Select language..."}
                          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search language..."
                            className="h-9"
                          />
                          <CommandEmpty>No language found.</CommandEmpty>
                          <CommandGroup>
                            {language.map((task: any) => (
                              <CommandItem
                                key={task.value}
                                value={task.value}
                                onSelect={(currentValue) => {
                                  setSelectedLanguage(
                                    currentValue === selectedLanguage
                                      ? ""
                                      : currentValue
                                  );
                                  setOpenLang(false);
                                  console.log(
                                    ` language selected: ${selectedLanguage}`
                                  );
                                }}
                              >
                                {task.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    selectedLanguage === task.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  ) : null}
                </div>
              </div>
            </div>
            <Textarea
              placeholder="result"
              className="m-3 h-[600px]"
              value={texte}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />

            <br />

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
