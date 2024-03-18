import Image from "next/image";
import HomeComponent from "./componentCustom/HomeComponent";
import dataaudioinput from "../public/dataaudioinput.png";
import audioconversation from "../public/audioconversation.png";
import daniel from "../public/daniel.png";
import michael from "../public/michael.png";
import emma from "../public/emma.png";
import claire from "../public/claire.png";
import screennaturalvoice from "../public/screennaturalvoice.png";
//import lobservateur from "../public/sound/lobservateur.mp3";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import NavBar from "./componentCustom/NavBar";
import SoundExemple from "./componentCustom/SoundExemple";
import usaflag from "../public/flag/usaflag.png";
import franceflag from "../public/flag/franceflag.png";
import italyflag from "../public/flag/italyflag.png";
import russiaflag from "../public/flag/russiaflag.png";
import chinaflag from "../public/flag/chinaflag.png";
import spainflag from "../public/flag/spainflag.png";
import tchequeflag from "../public/flag/tchequeflag.png";
import turcflag from "../public/flag/turcflag.png";
import portugalflag from "../public/flag/portugalflag.svg";
import polandflag from "../public/flag/polandflag.svg";
import neerlandaisflag from "../public/flag/neerlandaisflag.png";
import arabicflag from "../public/flag/arabicflag.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Player } from "react-simple-player";
import SampleLanguage from "./componentCustom/SampleLanguage";

export default function Home() {
  const textCard = [
    {
      id: "1",
      title: "emotive based voice,(Like human)",
      desc: "Genarate voice with accent or no, with emotion based on your sample voicve.",
    },
    {
      id: "2",
      title: "Clone your own voice",
      desc: "Upload your voice and replicate it",
    },
    {
      id: "3",
      title: "all generated voice is 100% original",
      desc: "no voice gererated is exactly the same.",
    },
    {
      id: "4",
      title: "Simple to use",
      desc: "Upload, enter your text ,and generate.",
    },
    {
      id: "5",
      title: "No engagenment",
      desc: "no years engagement",
    },
    {
      id: "6",
      title: "24khz HD voice",
      desc: "Hd Voice.",
    },
  ];

  return (
    <main>
      <NavBar />
      <br />
      <br />
      <br />
      <div className="mt-11">
        <div className=" md:mx-[100px]">
          <p className="text-center font-bold  text-lg md:text-xl lg:text-3xl xl:text-3xl">
            GENERATE REALISTIC VOICE WITH OUR MODEL.
          </p>
          <div className="mx-5">
            <p className=" font-thin  mx-auto max-w-lg text-center  text-md md:text-xl lg:text-xl xl:text-2xl mt-5 ">
              You can choose from over 12 languages and 50 voices to convert
              your texts into speech and get your audio file
            </p>
          </div>
          <p className="text-center my-10 text-emerald-500 font-mono text-lg underline">
            sample
          </p>
          <div className="mx-10 my-10">
            <HomeComponent
              img1={claire}
              img2={emma}
              img3={daniel}
              img4={michael}
            />
          </div>

          <div className="flex justify-center mt-11 md:mt-[100px]">
            <Button asChild size="lg">
              <Link href="/dashboard"> get started</Link>
            </Button>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="flex justify-center mt-11 md:mt-[200px] mx-10 md:mx-[70px] shadow-md rounded-md">
        <Image src={screennaturalvoice} alt="" className="rounded-md" />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container mx-auto  py-8">
        <p className=" text-3xl md:text-5xl text-center my-[100px]">
          why use ai SpeechLab ?
        </p>
        <Separator className="my-10" />

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:mx-[100px]">
          {textCard.map((txt) => (
            <Card key={txt.id}>
              <CardHeader>
                <Image
                  src={dataaudioinput}
                  alt=""
                  className="h-[100px] w-[100px] "
                />
                <CardTitle>
                  <p className="font-bold text-center">{txt.title}</p>
                </CardTitle>
                <CardDescription>
                  <p className="text-center">{txt.desc}</p>
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Separator />
              </CardFooter>
            </Card>
          ))}
        </div>
        <Separator className="my-10" />
        <div className="md:mx-[100px]">
          <p className="text-3xl md:text-5xl font-bold mt-[200px]">
            AI Voice Generator in 12 Languages.
          </p>
          <p className="my-10 font-thin md:text-xl">
            Our AI voice generator supports 12 languages and all diverse accents
            - just select the appropriate accent and enter text in your language
            of choice. VoiceLab allows you to create voices and use them in any
            language.
          </p>

          <SampleLanguage
            english={usaflag}
            french={franceflag}
            turkish={turcflag}
            polish={polandflag}
            arabic={arabicflag}
            czech={tchequeflag}
            chinese={chinaflag}
            dutch={neerlandaisflag}
            spanish={spainflag}
            portugal={portugalflag}
            russia={russiaflag}
            italian={italyflag}
          />
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="md:mx-[100px]">
          <p className="text-3xl mt-[200px]">Pricing</p>
          <div className=" grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
            <Card className=" max-w-sm mt-9">
              <p className="text-3xl font-semibold mt-10 text-center text-emerald-700">
                Pricing /one plan
              </p>
              <p className=" font-thin text-md text-center text-fuchsia-700 mt-1">
                500$/month
              </p>
              <Separator className="my-4" />
              <ul className="text-lg font-thin text-center mb-4">
                <li>*unlimided access</li>
                <li>*AI tools</li>
                <li> *take note</li>
                <li>*High quality content</li>
              </ul>
              <div className="flex justify-center">
                <Button asChild className="bg-emerald-700">
                  <Link href="/signup">Get access</Link>
                </Button>
              </div>
              <br />
            </Card>

            <Card className=" max-w-sm mt-9">
              <p className="text-3xl font-semibold mt-10 text-center text-emerald-700">
                Pricing /one plan
              </p>
              <p className=" font-thin text-md text-center text-fuchsia-700 mt-1">
                500$/month
              </p>
              <Separator className="my-4" />
              <ul className="text-lg font-thin text-center mb-4">
                <li>*unlimided access</li>
                <li>*AI tools</li>
                <li> *take note</li>
                <li>*High quality content</li>
              </ul>
              <div className="flex justify-center">
                <Button asChild className="bg-emerald-700">
                  <Link href="/signup">Get access</Link>
                </Button>
              </div>
              <br />
            </Card>

            <Card className=" max-w-sm mt-9">
              <p className="text-3xl font-semibold mt-10 text-center text-emerald-700">
                Pricing /one plan
              </p>
              <p className=" font-thin text-md text-center text-fuchsia-700 mt-1">
                500$/month
              </p>
              <Separator className="my-4" />
              <ul className="text-lg font-thin text-center mb-4">
                <li>*unlimided access</li>
                <li>*AI tools</li>
                <li> *take note</li>
                <li>*High quality content</li>
              </ul>
              <div className="flex justify-center">
                <Button asChild className="bg-emerald-700">
                  <Link href="/signup">Get access</Link>
                </Button>
              </div>
              <br />
            </Card>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />

        <p className="font-bold text-center text-3xl md:text-5xl mt-[200px] mb-[100px]">
          Frequently asked questions.
        </p>
        <div className="mx-[50px] md:mx-[100px]">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
                How do I make my own AI voice?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500 ">
                To create your own AI voice at SpeechLab, go to the setting,
                upload your best quality voice and select it. Voice Design
                allows you to customize the speaker s identityfor unique voices
                in your scripts, while Voice Cloning mimics real voices. This
                ensures variety and exclusivity in your generated voices, as
                they are entirely artificial and not linked to real people.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
                How much does using SpeechLab AI voice generator cost?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500">
                The Starter Plan is $8 per month, offering 40,000 characters and
                up to 5 custom voices. the pro plan is 22$/month and offering
                100,000 characters and up to 15 voices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
                Can I use SpeechLab AI voice generator for free?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500">
                No,with this model we are unable to offer free plan
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
                How many languages does SpeechLab support?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500">
                SpeechLab support 12 language for the moment
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
                What is an AI voice generator?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500">
                SpeechLab AI voice generator transforms text to spoken audio
                that sounds like a natural human voice, complete with realistic
                intonation and accents. It offers a wide range of voice options
                across various languages and dialects. Designed for ease of use,
                it caters to both individuals and businesses looking for
                customizable vocal outputs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
                How do I use AI voice generators to turn text into audio?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500">
                Step 1 involves selecting a voice and adjusting settings to your
                liking. In Step 2, you input your text into the provided box,
                ensuring it s in one of the supported languages. For Step 3, you
                simply click send iconButton to convert your text into audio,
                listen to the output. After that, you can download the audio for
                use in your project.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Separator className="my-4" />
      <div className="container mx-auto px-4">
        <footer className="flex flex-col lg:flex-row justify-between items-center">
          <p className="text-sm lg:order-2">
            &copy; 2024 Mon Entreprise. Tous droits réservés.
          </p>
          <div className="flex lg:order-1 lg:justify-center lg:mt-0 mt-4">
            <Link href="/pages/signup" className="text-sm hover:text-gray-400">
              sign up
            </Link>
            <Link
              href="/pages/login"
              className="text-sm hover:text-gray-400 ml-4"
            >
              login
            </Link>
            <Link href="#" className="text-sm hover:text-gray-400 ml-4">
              pricing
            </Link>
            <Link href="#" className="text-sm hover:text-gray-400 ml-4">
              term & condition
            </Link>
          </div>
        </footer>
        <br />
        <br />
      </div>
    </main>
  );
}
