"use client";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import {
  ArrowBigRight,
  AudioWaveformIcon,
  SendIcon,
  SettingsIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioPlayer from "../componentCustom/AudioPlayer";
import { Player } from "react-simple-player";
import { MinusIcon, PlusIcon, QuestionMarkIcon } from "@radix-ui/react-icons";

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
import Stripe from "stripe";
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
import { Badge } from "@/components/ui/badge";

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
  "https://firebasestorage.googleapis.com/v0/b/natural-voice-28245.appspot.com/o/publicVoice%2Fcustomvoice_5.mp3?alt=media&token=1e11dc37-fde3-4dd6-a23e-a577558b3460";
const axiosInstance = axios.create();
axiosInstance.defaults.timeout = 240000;

const stripe = new Stripe(
  "sk_test_51OpACQHMq3uIqhfsV1UgHf7wnUXqJVB2OqsI4CIPPnwfNGQJDiXyASrIr9FBKSKi9zFM384gtwbchxvPGCMmnBrM00Bfs91kOz",
  {
    apiVersion: "2024-04-10",
    typescript: true,
  }
);

export default function Dashboard() {
  const [changed, setChange] = useState(false);
  const [stringList, setStringList] = useState<Item[]>([]);
  const [urlExempleVoice, seturlExempleVoice] = useState(defauldVoice);
  const [nameVoiceSelected, setNameVoiceSelected] = useState("");
  const [verifystringList, setverifyStringList] = useState<string[]>([]);

  const [progresspercent, setProgresspercent] = useState(0);
  const clean_voice = useRef(true);
  const { toast } = useToast();
  const router = useRouter();
  const [openIndrawer, setOpenIndrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [openVoice, setOpenVoice] = useState(false);
  const [languagevalue, setLanguageValue] = useState("en");
  const [voicevalue, setvoiceValue] = useState("en");

  const [text, setText] = useState("");
  const [textvalue, settextValues] = useState("");
  const [isActive, activeButtonSubmit] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [uploadIsLoaded, setUploadLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>("");
  const [takingTime, setTakingTime] = useState(false);
  const [userId, setUserid] = useState("");
  const subscriptionId = useRef("");
  const [havingPlan, setHavingPlan] = useState(true);
  //users utilisation
  const [usedCharCurrent, setUsedCharCurrent] = useState(0);
  const [planType, setplanType] = useState("");
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerId.current) {
      clearTimer(); // S'assurer qu'aucun autre timer ne tourne
    }

    //setIsRunning(true);
    timerId.current = setTimeout(() => {
      console.log("Le timer a été déclenché après 60 secondes.");
      setTakingTime(true);
      //clearTimer(); // Réinitialiser après l'exécution
    }, 60000); // 60000ms = 60s
  };

  const stopTimer = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      setTakingTime(false);
      clearTimer(); // Réinitialiser après l'arrêt
    }
  };

  const clearTimer = () => {
    timerId.current = null;
  };
  const addUsedChar = async () => {
    try {
      await updateDoc(doc(db, "usersPlan", userId), {
        used_char: usedCharCurrent - textvalue.length,
      });

      console.log("great! .");
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const fetchPost = async () => {
    const docRef = doc(db, "usersPlan", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setHavingPlan(true);
      // cus_Id.current = docSnap.data().having_plan
      getCustomerAlldata(userId);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("no plan found!");
      setHavingPlan(false);
    }
  };
  const getCustomerAlldata = async (userId: string) => {
    const docRef = doc(db, "usersPlan", userId); // replace with customerID
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data().having_plan == true) {
        setHavingPlan(true);
        setUsedCharCurrent(docSnap.data().used_char);
        setplanType(` ${docSnap.data().plan}`);
        subscriptionId.current = docSnap.data().subscription_id;
        const subscription = await stripe.subscriptions.retrieve(
          `${docSnap.data().subscription_id}`
        );
        console.log(`subscription data:${subscription.status}`);
      } else {
        setHavingPlan(false);
      }
    } else {
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
        //console.log(`${file.size / 1024} KB`);
        if (file.size > 2000000) {
          toast({
            variant: "destructive",
            title: "audio size too large (> 1MB).",
          });
        } else {
          setUploadLoaded(true);
          const storageRef = ref(
            storage,
            `users/${user?.uid}/customvoice_${stringList.length + 1}`
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
        const userEmail = currentUser?.email;
        const uiid = currentUser?.uid;
        setUserEmail(userEmail);
        setUserid(uiid);
        console.log(currentUser?.displayName);
        if (name !== undefined && name !== null) {
          setUserName(name);
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
    startTimer();

    var text = remplacerPointsParPointVirgules(textvalue);

    if (textvalue !== "") {
      await axiosInstance
        .post("https://server-natural-voice.onrender.com", {
          text: text,
          language: languagevalue,
          clean_voice: clean_voice.current,
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
          stopTimer();
        })
        .catch((error) => {
          console.log(error);
          setLoaded(false);
          activeButtonSubmit(false);
          stopTimer();
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: `${error}`,
          });
        });
      //alert("click from client");
    }
  };
  const cancelSubscription = async () => {
    await axios
      .post("/api/cancelsub", {
        subscriptionId: subscriptionId.current,
      })
      .then((res) => {
        const { data } = res.data;
        console.log(data);
        toast({
          variant: "default",
          title: "update",
          description: `${data}`,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error}`,
        });
      });
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
            <Badge variant="secondary">{planType}</Badge>
            {havingPlan ? (
              <>
                <p>
                  Remaining: <span>{usedCharCurrent} </span>
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
          <div className="items-top flex space-x-2">
            <Checkbox
              id="terms1"
              onCheckedChange={(e: boolean) => {
                clean_voice.current = e;
                console.log(clean_voice.current);
              }}
              defaultChecked={true}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Clean voice
              </label>
              <p className="text-sm text-muted-foreground">(for microphone )</p>
            </div>
          </div>
          <div className=" grid w-full   ">
            <br />

            <br />
            <div className="grid w-full gap-1.5">
              <Button
                onClick={() => router.push("/sound-effect")}
                variant="outline"
              >
                Go to sound effect generator:
                <ArrowBigRight />
              </Button>

              <Button
                onClick={() => router.push("/speech-to-text")}
                variant="outline"
              >
                Go to speech to text converter:
                <ArrowBigRight />
              </Button>
              <Textarea
                placeholder="Type your message here."
                onChange={(e) => {
                  settextValues(e.target.value);
                  handleActiveButton();
                }}
                value={textvalue}
                className="h-[400px]"
                disabled={!havingPlan}
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

                {takingTime ? (
                  <div className="w-[300px] p-5 rounded-md bg-slate-300">
                    <p>
                      Process take a bit more time than expected,patience all
                      request will be completed...
                      <span className="font-semibold underline">
                        Learn more
                      </span>
                    </p>
                  </div>
                ) : null}

                <br />
                <AudioPlayer audioUrl={text} />
                <br />
              </div>
            </div>
          </div>

          <Button className="fixed bottom-5 end-5 bg-green-600 hover:bg-green-300 ">
            <QuestionMarkIcon className="size-4" />
          </Button>
        </div>
      </div>
    );

    function profileButton() {
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {userName ? <p>{userName}</p> : <p>My...</p>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
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
                <DropdownMenuItem
                  onClick={() => {
                    cancelSubscription();
                  }}
                >
                  Cancel subscription
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
                    <div className="flex items-center gap-3">
                      <p>Upload your voice(mp3,wav)</p>
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

              <div>
                {uploadIsLoaded ? (
                  <Progress value={progresspercent} className="w-[60%]" />
                ) : (
                  <p>-</p>
                )}
              </div>

              <p className="text-sm text-emerald-800 my-3 ">
                (To achieve perfect cloned voices,ensure clear articulation
                while reading the provided text and record your voice in a
                noice-free environment.)
              </p>

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
          <div className="bg-white p-2 shadow-sm">
            <p className="font-bold text-center mt-5"> Setting</p>
          </div>
          <br />

          <ScrollArea className="h-[500px]">
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
                    <div className="flex items-center gap-3">
                      <p>Upload your voice(mp3,wav)</p>
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
              <div>
                {uploadIsLoaded ? (
                  <Progress value={progresspercent} className="w-[60%]" />
                ) : (
                  <p>-</p>
                )}
              </div>
              <p className="text-sm text-emerald-800 my-3 ">
                (To achieve perfect cloned voices,ensure clear articulation
                while reading the provided text and record your voice in a
                noice-free environment.)
              </p>
              <p
                className="my-2 text-sm font-mono underline text-emerald-600"
                onClick={() => {
                  alert("text to read");
                }}
              >
                Generate text
              </p>

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
                            className="bg-gray-50 rounded-xl grid w-[300px] my-1"
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
            <Badge variant="secondary">{planType}</Badge>
            {havingPlan ? (
              <>
                <p>
                  Remaining: <span>{usedCharCurrent} </span>
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
                <div className="items-top flex space-x-2">
                  <Checkbox
                    id="terms2"
                    onCheckedChange={(e: boolean) => {
                      clean_voice.current = e;
                      console.log(clean_voice.current);
                    }}
                    defaultChecked={true}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms2"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Clean voice
                    </label>
                    <p className="text-sm text-muted-foreground">
                      (for microphone )
                    </p>
                  </div>
                </div>
              </div>

              <div className="ml-auto mr-10 ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {" "}
                      {userName ? <p>{userName}</p> : <p>My...</p>}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
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
                      <DropdownMenuItem
                        onClick={() => {
                          cancelSubscription();
                        }}
                      >
                        Cancel subscription
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
              </div>
            </div>

            <div className=" grid w-full   ">
              <br />

              <br />
              <div className="grid w-full gap-1.5">
                <Button
                  onClick={() => router.push("/sound-effect")}
                  variant="outline"
                >
                  Go to sound effect generator:
                  <ArrowBigRight />
                </Button>

                <Button
                  onClick={() => router.push("/speech-to-text")}
                  variant="outline"
                >
                  Go to speech to text converter:
                  <ArrowBigRight />
                </Button>
                <Textarea
                  placeholder="Type your message here."
                  onChange={(e) => {
                    settextValues(e.target.value);
                    handleActiveButton();
                  }}
                  disabled={!havingPlan}
                  value={textvalue}
                  className="h-[300px]"
                />

                <p className="text-sm text-muted-foreground">
                  For more accurate ,Avoid making mistake on spelling and
                  punctuation.
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
                  {takingTime ? (
                    <div className="w-[300px] p-5 rounded-md bg-slate-300">
                      <p>
                        Process take a bit more time than expected,patience all
                        request will be completed...
                        <span className="font-semibold underline">
                          Learn more
                        </span>
                      </p>
                    </div>
                  ) : null}

                  <br />
                  <AudioPlayer audioUrl={text} />
                  <br />
                </div>
              </div>
            </div>

            <Button
              className="fixed bottom-10 end-10 bg-green-600 hover:bg-green-300 "
              onClick={() => {
                router.push("/help");
              }}
            >
              <QuestionMarkIcon className="h-7 w-7" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
