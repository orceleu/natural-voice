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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { franc, francAll } from "franc";

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

import { auth } from "@/app/firebase/config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";

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

const voices = [
  {
    value: "en",
    label: "David ",
  },
  {
    value: "fr",
    label: "Michael",
  },
  {
    value: "ru",
    label: "Anthony",
  },
  {
    value: "sp",
    label: "Linda",
  },
  {
    value: "pg",
    label: "Jennifer",
  },
];
const axiosInstance = axios.create();
axiosInstance.defaults.timeout = 240000;
export default function Dashboard() {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openVoice, setOpenVoice] = React.useState(false);
  const [languagevalue, setLanguageValue] = React.useState("fr");
  const [voicevalue, setvoiceValue] = React.useState("fr");

  const [text, setText] = useState("");
  const [textvalue, settextValues] = useState("");
  const [isActive, activeButtonSubmit] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserid] = useState("");

  /*
  const uploadAudio = async (file: File) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userStorageRef = firebase.storage().ref().child('audios').child(currentUser.uid);
      const uploadTask = userStorageRef.child(file.name).put(file);
      // Vous pouvez écouter les événements de progression de téléchargement ici
      return uploadTask;
    }
  };
  

  // Fonction pour récupérer les données audio de l'utilisateur
const getUserAudios = async () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const userStorageRef = firebase.storage().ref().child('audios').child(currentUser.uid);
    const listResult = await userStorageRef.listAll();
    const audioUrls = await Promise.all(
      listResult.items.map((item) => item.getDownloadURL())
    );
    return audioUrls;
  }
  return [];
};*/

  const logOut = async () => {
    await signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const name = currentUser?.displayName;
        const uiid = currentUser?.uid;
        console.log(currentUser?.displayName);
        if (name !== undefined && name !== null) {
          setUserName(name);
          setUserid(uiid);
        } else {
        }
      }
      if (currentUser == null) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [user]);

  function remplacerPointsParPointVirgules(chaine: string): string {
    return chaine.replace(/[\r\n]+/g, "");
  }
  function detectTheLanguage() {
    /*
 English: en 🇺🇸 French: fr 🇫🇷 German: de 🇩🇪 Spanish: es 🇪🇸 Italian: it 🇮🇹 Portuguese: pt 🇵🇹 Czech: cs 🇨🇿 Polish: pl 🇵🇱 Russian: ru 🇷🇺 Dutch: nl 🇳🇱 Turksih: tr 🇹🇷 Arabic: ar 🇦🇪 Mandarin Chinese: zh-cn 🇨🇳

    */
    var detectedLangauge = franc(remplacerPointsParPointVirgules(textvalue));
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
  const handleClick = async () => {
    /* const config: AxiosRequestConfig = {
      timeout: 240000, // Temps d'attente en millisecondes (10 secondes dans cet exemple)
    };
*/
    var text = remplacerPointsParPointVirgules(textvalue);
    setLoaded(true);
    activeButtonSubmit(true);
    if (textvalue !== "") {
      await axiosInstance
        .post("https://server-natural-voice.onrender.com", {
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
            description: `${error}`,
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
      detectTheLanguage();
    }
  };
  useEffect(() => {
    handleActiveButton();
  }, [textvalue]);

  return (
    <div className="flex justify-center mt-4">
      <div className="grid w-full mx-9">
        <div className="ml-auto mr-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">My...</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>GitHub</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logOut}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p>{userName}</p>
        </div>
        <div className="flex justify-center">
          <p className="text-3xl text-center mx-7 mb-7 text-emerald-700 hover:text-emerald-800 font-semibold ">
            Paste your text and get your voice
          </p>
        </div>
        <div className="flex items-center space-x-2 mb-5">
          <Checkbox id="terms" checked />
          <Label htmlFor="terms">auto detect language</Label>
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
              <CommandInput placeholder="Search language..." className="h-9" />
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
        <Popover open={openVoice} onOpenChange={setOpenVoice}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openVoice}
              className="w-[200px] justify-between"
            >
              {voicevalue
                ? voices.find((voices) => voices.value === voicevalue)?.label
                : "Select language..."}
              <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Voice..." className="h-9" />
              <CommandEmpty>No voice found.</CommandEmpty>
              <CommandGroup>
                {voices.map((voices) => (
                  <CommandItem
                    key={voices.value}
                    value={voices.value}
                    onSelect={(currentValue) => {
                      setvoiceValue(
                        currentValue === voicevalue ? "" : currentValue
                      );
                      setOpenVoice(false);
                      console.log(` language selected: ${voicevalue}`);
                    }}
                  >
                    {voices.label}
                    <BoxSelectIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        voicevalue === voices.value
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
          <div className="grid w-full gap-1.5">
            <Textarea
              placeholder="Type your message here."
              onChange={(e) => {
                settextValues(e.target.value);
                handleActiveButton();
              }}
              value={textvalue}
            />

            <p className="text-sm text-muted-foreground">
              Your message will be copied to the support team.
            </p>
          </div>
          <div className=" flex justify-center">
            <div className=" grid gap-2">
              <div className="flex justify-center space-x-4 mt-4">
                <Button
                  onClick={handleClick}
                  disabled={isActive}
                  variant="outline"
                  size="icon"
                >
                  {isLoaded ? (
                    <ReloadIcon className=" h-4 w-4 animate-spin" />
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
              <br />
              <AudioPlayer audioUrl={text} />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
