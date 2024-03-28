"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { AudioWaveformIcon, SendIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioPlayer from "../componentCustom/AudioPlayer";
import { Player } from "react-simple-player";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CheckIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { BoxSelectIcon, ChevronDownIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { storage } from "@/app/firebase/config";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
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
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

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

const frameworksDrawer = [
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

const publicVoices = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2FDaniel.mp3?alt=media&token=5dc3afa9-fa4f-4985-a673-93b949b3d22b",
    name: "Daniel ",
  },
  {
    url: "fr",
    name: "Michael",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2FAnthony.mp3?alt=media&token=1da13aec-26ae-4612-9018-ff0ceb6a0b9d",
    name: "Anthony",
  },
  {
    url: "sp",
    name: "Linda",
  },
  {
    url: "pg",
    name: "Jennifer",
  },
];

interface Item {
  name: string;
  path: string;
  url: string;
}
const defauldVoice =
  "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2FAnthony.mp3?alt=media&token=1da13aec-26ae-4612-9018-ff0ceb6a0b9d";
const axiosInstance = axios.create();
axiosInstance.defaults.timeout = 240000;

// Renders errors or successfull transactions on the screen.
function Message({ content }: any) {
  return <>{content}</>;
}

export default function Dashboard() {
  const [message, setMessage] = useState("");

  const [changed, setChange] = useState(false);
  const [stringList, setStringList] = useState<Item[]>([]);
  const [urlExempleVoice, seturlExempleVoice] = useState(defauldVoice);
  const [nameVoiceSelected, setNameVoiceSelected] = useState("");
  const [verifystringList, setverifyStringList] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [screenShotseconds, setSreenShotSeconds] = useState("");

  const [progresspercent, setProgresspercent] = useState(0);

  const { toast } = useToast();
  const router = useRouter();
  const [openIndrawer, setOpenIndrawer] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openVoice, setOpenVoice] = React.useState(false);
  const [languagevalue, setLanguageValue] = React.useState("fr");
  const [voicevalue, setvoiceValue] = React.useState("fr");

  const [text, setText] = useState("");
  const [textvalue, settextValues] = useState("");
  const [isActive, activeButtonSubmit] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [uploadIsLoaded, setUploadLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserid] = useState("");

  const [havingPlan, setHavingPlan] = useState(true);
  //users utilisation
  const [usedCharCurrent, setUsedCharCurrent] = useState(0);
  const [planType, setplanType] = useState("");
  const [planTypeValue, setplanTypeValue] = useState(0);

  const addUsedChar = async () => {
    try {
      await updateDoc(doc(db, "users", userId), {
        used_char: usedCharCurrent - textvalue.length,
      });

      console.log("great! .");
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const fetchPost = async () => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setHavingPlan(true);
      setUsedCharCurrent(docSnap.data().used_char);
      setplanType(` ${docSnap.data().plan}`);

      console.log(`
        Currrent Plan:
        ${docSnap.data().plan}\n
        start date:
       ${docSnap.data().start_date}\n
        end date:
       ${docSnap.data().end_date}\n
        used char:
       ${docSnap.data().used_char}
      `);
      console.log(Date.now());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("no plan found!");
      setHavingPlan(false);
    }
  };

  useEffect(() => {
    if (userId !== "") {
      fetchPost();
    }
  }, [userId]);

  //upload audio
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
        console.log(`${file.size / 1024} KB`);
        if (file.size > 1000000) {
          toast({
            variant: "destructive",
            title: "audio size too large (> 1MB).",
          });
        } else {
          setUploadLoaded(true);
          const storageRef = ref(
            storage,
            `users/${user?.uid}/customVoice(${stringList.length + 1})`
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

  // List All Files
  const listAllFile = async () => {
    const storageRef2 = await ref(storage, `users/${userId}/`);
    if (storageRef2.fullPath == `users/${userId}`) {
      listAll(storageRef2).then(async (res) => {
        //console.log(res.items.length);
        await res.items.forEach((fileRef) => {
          if (stringList.length !== res.items.length) {
            getDownloadURL(fileRef).then((fileUrl) => {
              // console.log(fileUrl);
              let name = fileRef.name;
              let path = fileRef.fullPath;
              const newItem: Item = { name: name, path: path, url: fileUrl };
              if (!verifystringList.includes(fileUrl)) {
                setverifyStringList([...verifystringList, fileUrl]);
                setStringList([...stringList, newItem]);
              }
            });
          }
        });
      });
    } else {
      console.log("no directory for custom voice found");
    }
  };
  const deleteFile = async (audioPath: string) => {
    const storageRef2 = await ref(storage, audioPath);
    deleteObject(storageRef2)
      .then(() => {
        setChange(!changed);
        const copyfuits = [...stringList];
        const updateFuits = copyfuits.filter(
          (fuits) => fuits.path !== audioPath
        );
        setStringList(updateFuits);
      })
      .catch((error) => {
        alert(error);
      });
  };
  useEffect(() => {
    if (userId !== "") {
      listAllFile();
    }
  }, [userId, stringList, changed]);

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
    setLoaded(true);
    activeButtonSubmit(true);
    let secondeToScreen = seconds;
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000); // Mettre à jour chaque seconde

    var text = remplacerPointsParPointVirgules(textvalue);

    if (textvalue !== "") {
      await axiosInstance
        .post("https://server-natural-voice.onrender.com", {
          text: text,
          language: languagevalue,
          clean_voice: false,
          voice_sample: urlExempleVoice,
        })
        .then((res) => {
          addUsedChar();
          fetchPost();
          console.log(res.data);
          const { output } = res.data;
          setText(output);
          setLoaded(false);
          activeButtonSubmit(false);
          setSreenShotSeconds(`${secondeToScreen} sec`);
          setTimeout(() => {
            clearInterval(interval);
          }, 500);

          setTimeout(() => {
            setSeconds(0);
          }, 3000);
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

  useEffect(() => {
    if (progresspercent == 100) {
      setTimeout(listAllFile, 3000);
      setTimeout(() => {
        toast({
          title: "Uploaded!",
        });
        setProgresspercent(0);
        setUploadLoaded(false);
      }, 500);
    }
  }, [progresspercent]);

  return (
    <div>
      <div> {dashBoardDesktop()} </div>
      <div> {dashBoardMobile()}</div>
    </div>
  );

  function dashBoardMobile() {
    return (
      <div className="lg:hidden">
        <div className="flex justify-between mx-4 mt-4">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost">
                <SettingsIcon />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Setting</DrawerTitle>
              </DrawerHeader>
              <DrawerFooter>
                {drawerMobile()}
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          {profileButton()}
        </div>

        <div className="mx-3">
          {/* Contenu de la partie droite */}
          <div className="my-3">
            {havingPlan ? (
              <>
                <p>
                  char: <span>{usedCharCurrent} </span> left
                </p>
              </>
            ) : (
              <div className=" start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex items-center mx-auto">
                  <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span>please select a plan to get started.</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    onClick={() => {
                      router.push("/billing");
                    }}
                  >
                    select a plan
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p>Voice selected:</p>
          <p className=" text-green-500">{nameVoiceSelected}</p>
          <p>Language selected:</p>
          <p className=" text-green-500">{languagevalue}</p>
          <div className=" grid w-full   ">
            <br />
            <div className="flex justify-center">
              <p className="text-3xl text-center mx-7 mb-7 text-emerald-700 hover:text-emerald-800 font-semibold ">
                Paste your text and get your voice
              </p>
            </div>
            <br />
            <div className="grid w-full gap-1.5">
              <Textarea
                placeholder="Type your message here."
                onChange={(e) => {
                  settextValues(e.target.value);
                  handleActiveButton();
                }}
                value={textvalue}
                className="h-[200px]"
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
                      <ReloadIcon className=" h-5 w-5 animate-spin" />
                    ) : (
                      <SendIcon className="h-5 w-5" />
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
                    <TrashIcon className="h-5 w-5" />
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

    function profileButton() {
      return (
        <div>
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
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/billing");
                  }}
                >
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
      );
    }

    function drawerMobile() {
      return (
        <div>
          <ScrollArea className="h-[600px] ">
            <ScrollBar className="bg-white rounded-sm" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="grid w-full mx-2">
              <div className="flex items-center space-x-2 mb-5">
                <Checkbox id="terms" checked />
                <Label htmlFor="terms">auto detect language</Label>
              </div>
              <Popover open={openIndrawer} onOpenChange={setOpenIndrawer}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openIndrawer}
                    className="w-[200px] justify-between"
                  >
                    {languagevalue
                      ? frameworksDrawer.find(
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
                      {frameworksDrawer.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setLanguageValue(
                              currentValue === languagevalue ? "" : currentValue
                            );
                            setOpenIndrawer(false);
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
                      ? voices.find((voices) => voices.value === voicevalue)
                          ?.label
                      : "Select language..."}
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Voice..."
                      className="h-9"
                    />
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
                          <CheckIcon
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

              <Progress value={progresspercent} className="w-[60%]" />

              <div className="mx-5">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <p className="font-semibold">Your voices...</p>
                      <AudioWaveformIcon />
                    </AccordionTrigger>
                    <AccordionContent>
                      <div>
                        {stringList.map((item, index) => (
                          <div
                            className="bg-gray-50 rounded-xl grid w-[250px] my-1"
                            key={index}
                          >
                            <div className="mx-auto">
                              <div className="flex justify-center">
                                <h3 className="text-sm font-semibold my-auto">
                                  <p>{item.name}</p>
                                </h3>
                                <div className="my-1 ml-5">
                                  <Button
                                    onClick={() => {
                                      alert(`delete audio ${item.name} ?`);
                                      deleteFile(item.path);
                                    }}
                                    variant="ghost"
                                    size="icon"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      alert(`add this Voice? ${item.url}`);
                                      seturlExempleVoice(item.url);
                                      setNameVoiceSelected(item.name);
                                    }}
                                    variant="outline"
                                    size="icon"
                                    className="ml-5"
                                  >
                                    <CheckIcon className="h-5 w-5" />
                                  </Button>
                                </div>
                              </div>

                              <div className="mx-auto">
                                <Player src={item.url} height={40} hideVolume />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Separator className="bg-blue-500" />
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <p className="font-semibold">Public voices...</p>
                      <AudioWaveformIcon />
                    </AccordionTrigger>
                    <AccordionContent>
                      <div>
                        {publicVoices.map((item, index) => (
                          <div
                            className="bg-gray-50 rounded-xl grid w-[250px] my-1"
                            key={index}
                          >
                            <div className="mx-auto">
                              <div className="flex justify-center">
                                <h3 className="text-sm font-semibold my-auto">
                                  <p>{item.name}</p>
                                </h3>
                                <div className="my-1 ml-5">
                                  <Button
                                    onClick={() => {
                                      alert(`add this voice? ${item.url}`);
                                      seturlExempleVoice(item.url);
                                      setNameVoiceSelected(item.name);
                                    }}
                                    variant="outline"
                                    size="icon"
                                    className="ml-5 "
                                  >
                                    <CheckIcon className="h-5 w-5" />
                                  </Button>
                                </div>
                              </div>

                              <div className="mx-auto">
                                <Player src={item.url} height={40} hideVolume />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </ScrollArea>
        </div>
      );
    }
  }

  function dashBoardDesktop() {
    return (
      <div className="hidden lg:flex justify-center ">
        {/* Partie gauche */}
        <div className=" max-w-[400px] bg-white ">
          {/* Contenu de la partie gauche */}
          <p className="font-bold text-center mt-5"> Setting</p>
          <br />

          <ScrollArea className="h-[600px]">
            <ScrollBar className="bg-white rounded-sm" />
            <div className="grid w-full mx-2">
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
                      ? voices.find((voices) => voices.value === voicevalue)
                          ?.label
                      : "Select language..."}
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search Voice..."
                      className="h-9"
                    />
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
                          <CheckIcon
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

              <Progress value={progresspercent} className="w-[60%]" />

              <div className="mx-5">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <p className="font-semibold">Your voices...</p>
                      <AudioWaveformIcon />
                    </AccordionTrigger>
                    <AccordionContent>
                      <div>
                        {stringList.map((item, index) => (
                          <div
                            className="bg-gray-50 rounded-xl grid w-[320px] my-1"
                            key={index}
                          >
                            <div className="mx-auto">
                              <div className="flex justify-center">
                                <h3 className="text-sm font-semibold my-auto">
                                  <p>{item.name}</p>
                                </h3>
                                <div className="my-1 ml-5">
                                  <Button
                                    onClick={() => {
                                      alert(`delete audio ${item.name} ?`);
                                      deleteFile(item.path);
                                    }}
                                    variant="destructive"
                                  >
                                    delete
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      alert(`add this Voice? ${item.url}`);
                                      seturlExempleVoice(item.url);
                                      setNameVoiceSelected(item.name);
                                    }}
                                    variant="outline"
                                    size="icon"
                                    className="ml-5"
                                  >
                                    <CheckIcon className="h-5 w-5" />
                                  </Button>
                                </div>
                              </div>

                              <div className="mx-auto">
                                <Player src={item.url} height={40} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Separator className="bg-blue-500" />
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <p className="font-semibold">Public voices...</p>
                      <AudioWaveformIcon />
                    </AccordionTrigger>
                    <AccordionContent>
                      <div>
                        {publicVoices.map((item, index) => (
                          <div
                            className="bg-gray-50 rounded-xl grid w-[320px] my-1"
                            key={index}
                          >
                            <div className="mx-auto">
                              <div className="flex justify-center">
                                <h3 className="text-sm font-semibold my-auto">
                                  <p>{item.name}</p>
                                </h3>
                                <div className="my-1 ml-5">
                                  <Button
                                    onClick={() => {
                                      alert(`add this voice? ${item.url}`);
                                      seturlExempleVoice(item.url);
                                      setNameVoiceSelected(item.name);
                                    }}
                                    variant="outline"
                                    size="icon"
                                    className="ml-5 "
                                  >
                                    <CheckIcon className="h-5 w-5" />
                                  </Button>
                                </div>
                              </div>

                              <div className="mx-auto">
                                <Player src={item.url} height={40} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Partie droite */}
        <div className="w-3/4 bg-white  lg:flex flex-row ">
          {/* Contenu de la partie droite */}
          <Separator orientation="vertical" />
          <div className="w-full mx-3 mt-5">
            {havingPlan ? (
              <>
                <p>
                  char: <span>{usedCharCurrent} </span> left
                </p>
              </>
            ) : (
              <div className=" start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex items-center mx-auto">
                  <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span>please select a plan to get started.</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <Button
                    onClick={() => {
                      router.push("/billing");
                    }}
                  >
                    select a plan
                  </Button>
                </div>
              </div>
            )}
            <div className="flex justify-between mt-5">
              <div>
                <p>Voice selected:</p>
                <p className=" text-green-500">{nameVoiceSelected}</p>
              </div>

              <div className="App"></div>

              <div className="ml-auto mr-10 ">
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
            </div>

            <div className=" grid w-full   ">
              <br />
              <div className="flex justify-center">
                <p className="text-3xl text-center mx-7 mb-7 text-emerald-700 hover:text-emerald-800 font-semibold ">
                  Paste your text and get your voice
                </p>
              </div>
              <br />
              <div className="grid w-full gap-1.5">
                <Textarea
                  placeholder="Type your message here."
                  onChange={(e) => {
                    settextValues(e.target.value);
                    handleActiveButton();
                  }}
                  value={textvalue}
                  className="h-[300px]"
                />

                <p className="text-sm text-muted-foreground">
                  Your message will be copied to the support team.
                </p>
              </div>
              <div className=" flex justify-center">
                <div className=" grid gap-2">
                  <p>{seconds}</p>
                  <p>{screenShotseconds}</p>
                  <div className="flex justify-center space-x-4 mt-4">
                    <Button
                      onClick={handleClick}
                      disabled={isActive}
                      variant="outline"
                      size="icon"
                    >
                      {isLoaded ? (
                        <ReloadIcon className=" h-5 w-5 animate-spin" />
                      ) : (
                        <SendIcon className="h-5 w-5" />
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
                      <TrashIcon className="h-5 w-5" />
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
      </div>
    );
  }
}
