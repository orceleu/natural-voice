"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDownIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import AudioPlayer from "../componentCustom/AudioPlayer";
import { franc, francAll } from "franc";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { SendIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
const defauldVoice =
  "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2FAnthony.mp3?alt=media&token=1da13aec-26ae-4612-9018-ff0ceb6a0b9d";
const axiosInstance = axios.create();
axiosInstance.defaults.timeout = 240000;

export default function VoiceTest() {
  const [languagevalue, setLanguageValue] = useState("en");
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(
    "You can choose from over 12 languages and 50 voices to convert your texts into speech and get your audio file"
  );
  const [urlaudio, seturlAudio] = useState("");

  const [isActive, activeButtonSubmit] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [urlExempleVoice, seturlExempleVoice] = useState(defauldVoice);
  const { toast } = useToast();

  const frameworks = [
    {
      value: "en",
      label: "English",
    },
    {
      value: "fr",
      label: "French",
    },
    {
      value: "ru",
      label: "Russia",
    },
    {
      value: "es",
      label: "Spanish",
    },
    {
      value: "pt",
      label: "Portugal",
    },
    {
      value: "cs",
      label: "Czech",
    },
    {
      value: "it",
      label: "Italian",
    },
    {
      value: "nl",
      label: "Dutch",
    },
    {
      value: "zh-cn",
      label: "Chinese",
    },
    {
      value: "tr",
      label: "Turkish",
    },
    {
      value: "pl",
      label: "Polish",
    },
    {
      value: "ar",
      label: "Arabic",
    },
  ];
  const handleClick = async () => {
    setLoaded(true);
    activeButtonSubmit(true);

    if (text !== "") {
      await axiosInstance
        .post("https://server-natural-voice.onrender.com", {
          text: text,
          language: languagevalue,
          clean_voice: false,
          voice_sample: urlExempleVoice,
        })
        .then((res) => {
          //addUsedChar();
          // fetchPost();
          console.log(res.data);
          const { output } = res.data;
          seturlAudio(output);
          setLoaded(false);
          activeButtonSubmit(false);
        })
        .catch((error) => {
          console.log(error);
          setLoaded(false);
          activeButtonSubmit(false);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: `${error}`,
          });
        });
      //alert("click from client");
    }
  };
  function detectTheLanguage() {
    /*
 English: en 🇺🇸 French: fr 🇫🇷 German: de 🇩🇪 Spanish: es 🇪🇸 Italian: it 🇮🇹 Portuguese: pt 🇵🇹 Czech: cs 🇨🇿 Polish: pl 🇵🇱 Russian: ru 🇷🇺 Dutch: nl 🇳🇱 Turksih: tr 🇹🇷 Arabic: ar 🇦🇪 Mandarin Chinese: zh-cn 🇨🇳

    */
    var detectedLangauge = franc(text);
    var finalDetectedLanguage = "fr";
    if (detectedLangauge == "fra") {
      finalDetectedLanguage = "fr"; //francais 1
    } else if (detectedLangauge == "eng") {
      finalDetectedLanguage = "en"; //anglais 2
    } else if (detectedLangauge == "spa") {
      finalDetectedLanguage = "es"; //espagnole 3
    } else if (detectedLangauge == "rus") {
      finalDetectedLanguage = "ru"; //russe 4
    } else if (detectedLangauge == "cmn") {
      finalDetectedLanguage = "zh-cn"; //mandarin 5
    } else if (detectedLangauge == "ita") {
      finalDetectedLanguage = "it"; //italien 6
    } else if (detectedLangauge == "por") {
      finalDetectedLanguage = "pt"; //portugais 7
    } else if (detectedLangauge == "ces") {
      finalDetectedLanguage = "cs"; //tcheque 8
    } else if (detectedLangauge == "nld") {
      finalDetectedLanguage = "nl"; // Néerlandais 9
    } else if (detectedLangauge == "tur") {
      finalDetectedLanguage = "tr"; // turk //polonais 10
    } else if (detectedLangauge == "pol") {
      finalDetectedLanguage = "pl"; //polonais 11
    } else if (detectedLangauge == "arb") {
      finalDetectedLanguage = "ar"; //arabe 12
    }
    console.log(finalDetectedLanguage);
    setLanguageValue(finalDetectedLanguage);
  }

  return (
    <div className=" flex justify-center ">
      <div className="p-5 shadow-lg rounded-md bg-white">
        <div className="flex items-center space-x-5">
          {" "}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {languagevalue
                  ? frameworks.find(
                      (framework) => framework.value === languagevalue
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
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={(currentValue) => {
                        setLanguageValue(
                          currentValue === languagevalue ? "" : currentValue
                        );
                        setOpen(false);
                        console.log(` language selected: ${languagevalue}`);
                      }}
                    >
                      {framework.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          languagevalue === framework.value
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
          <Button variant="outline">upload voices</Button>
        </div>
        <br />
        <Textarea
          placeholder="Test it yourself."
          className="h-[200px] my-5 "
          value={text}
          maxLength={200}
          onChange={(e: any) => {
            setText(e.target.value);
            detectTheLanguage();
          }}
        />{" "}
        <p className="my-1 ">
          <span>{text.length}</span>/200 Char
        </p>
        <AudioPlayer audioUrl={urlaudio} />
        <br />
        <div className="flex justify-end ">
          <Button disabled={isActive} variant="outline" onClick={handleClick}>
            {isLoaded ? (
              <ReloadIcon className=" h-5 w-5 animate-spin" />
            ) : (
              <p>Test now</p>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
