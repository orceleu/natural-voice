"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { PlayCircleIcon, DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioPlayer from "../componentCustom/AudioPlayer";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { BoxSelectIcon, ChevronDownIcon } from "lucide-react";

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

const frameworks = [
  {
    value: "en",
    label: "english",
  },
  {
    value: "fr",
    label: "french",
  },
  {
    value: "rs",
    label: "russia",
  },
  {
    value: "sp",
    label: "spanish",
  },
  {
    value: "pg",
    label: "portugal",
  },
];

export default function Dashboard() {
  //https://replicate.delivery/pbxt/KymPMxIaMKKWCtfLIy0rOx6pKSKZWM3HaOHKoFxf9t40f03kA/output.wav

  const [open, setOpen] = React.useState(false);
  const [languagevalue, setLanguageValue] = React.useState("fr");
  const { toast } = useToast();

  const [text, setText] = useState("");
  const [textvalue, settextValues] = useState("");
  const [isActive, activeButtonSubmit] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  function remplacerPointsParPointVirgules(chaine: string): string {
    return chaine.replace(/\./g, ";");
  }
  const handleClick = async () => {
    var text = remplacerPointsParPointVirgules(textvalue);
    setLoaded(true);
    activeButtonSubmit(true);
    if (textvalue !== "") {
      await axios
        .post("/api/speak", {
          text: text,
          language: languagevalue,
          clean_voice: false,
        })
        .then((res) => {
          console.log(res.data);
          const { output } = res.data;
          setText(output);
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
            description:
              "There was a problem with your request. verify your connexion and try again.",
          });
        });
      //alert("click from client");
    }
  };

  const handleActiveButton = () => {
    if (textvalue.length < 5) {
      activeButtonSubmit(true);
    } else {
      activeButtonSubmit(false);
    }
  };
  useEffect(() => {
    handleActiveButton();
  }, [textvalue]);

  return (
    <div className="grid w-full mx-9">
      <div className="flex justify-center">
        <p className="text-md  text-center mx-7 mb-7">
          Paste your text and get your voice
        </p>
      </div>

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
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandEmpty>No framework found.</CommandEmpty>
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
                  <BoxSelectIcon
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
      <br />
      <div className=" grid w-full   ">
        <br />
        <br />
        <Textarea
          placeholder="Type your message here."
          onChange={(e) => {
            settextValues(e.target.value);
            handleActiveButton();
          }}
          value={textvalue}
        />
        <div className=" flex justify-center">
          <div className="fixed bottom-4 grid gap-2">
            <div className="flex justify-center space-x-4 mt-4">
              <Button
                onClick={handleClick}
                disabled={isActive}
                variant="outline"
                size="icon"
              >
                {isLoaded ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <PlayCircleIcon className="h-4 w-4" />
                )}
              </Button>

              <Button
                onClick={() => {
                  settextValues("");
                }}
                disabled={isActive}
                variant="outline"
                size="icon"
              >
                <DeleteIcon className="h-3 w-3" />
              </Button>
            </div>

            <AudioPlayer audioUrl={text} />
          </div>
        </div>
      </div>
    </div>
  );
}
