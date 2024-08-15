import Image from "next/image";
import HomeComponent from "./componentCustom/HomeComponent";
import daniel from "../public/daniel.png";
import michael from "../public/michael.png";
import emma from "../public/emma.png";
import claire from "../public/claire.png";
import claireremovebgpreview from "../public/claireremovebgpreview.png";
import claireremovebg from "../public/claireremovebg.png";

import danielremovebgpreview from "../public/danielremovebgpreview.png";
import emmaremovebgpreview from "../public/emmaremovebgpreview.png";
import anthonyremovebgpreview from "../public/anthonyremovebgpreview.png";

import screennaturalvoice from "../public/screennaturalvoice.png";
//import lobservateur from "../public/sound/lobservateur.mp3";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import NavBar from "./componentCustom/NavBar";
import SoundExemple from "./componentCustom/SoundExemple";
import img2 from "../public/img2.svg";
import img3 from "../public/img3.svg";
import img4 from "../public/img4.svg";
import img6 from "../public/img6.svg";
import podcast from "../public/podcast.svg";
import audioconv from "../public/audioconv.svg";
import flechedesign from "../public/flecheDesign.png";
import flechedesign2 from "../public/flecheDesign2.png";
import tiktokcreator from "../public/tiktokcreator.jpg";
import usaflag from "../public/flag/usaflag.png";
import contentCreatorIllustration from "../public/contentcreatorillustration.png";
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
import SampleLanguage from "./componentCustom/SampleLanguage";
import { AlertTriangle, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import VoiceTest from "./trytestingvoice/VoiceTest";

export default function Home() {
  const textCard = [
    {
      id: "1",
      title: "emotive based voice,(Like human)",
      desc: "Genarate voice with accent or no, with emotion based on your sample voicve.",
      img: img6,
    },
    {
      id: "2",
      title: "Clone any voice",
      desc: "Upload your voice and replicate it",
      img: podcast,
    },
    {
      id: "3",
      title: "all generated voice is 100% original",
      desc: "no voice gererated is exactly the same.",
      img: audioconv,
    },
    {
      id: "4",
      title: "Simple to use",
      desc: "Upload, enter your text ,and generate.",
      img: img4,
    },
    {
      id: "5",
      title: "Emotion transfer",
      desc: "pitch based on your emotion",
      img: img2,
    },
    {
      id: "6",
      title: "24khz HD voice",
      desc: "Hd Voice.",
      img: img3,
    },
  ];

  return (
    <main className=" bg-gradient-to-b from-green-50 to-white">
      <NavBar />
      <br />
      <br />
      <br />

      <div className=" start-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex items-center mx-auto">
          <AlertTriangle />
          <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
            <span>
              Your are fully responsable of generated voices utilisation.
              <a
                href="https://flowbite.com"
                className="inline font-medium text-blue-600 underline dark:text-blue-500 underline-offset-2 decoration-600 dark:decoration-500 decoration-solid hover:no-underline"
              >
                terms & condition
              </a>
            </span>
          </p>
        </div>
        <div className="flex items-center">
          <button
            data-dismiss-target="#sticky-banner"
            type="button"
            className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close banner</span>
          </button>
        </div>
      </div>

      <div className="mt-11 ">
        <div className=" md:mx-[100px]">
          <p className="text-center font-bold  text-lg md:text-xl lg:text-3xl xl:text-3xl">
            GENERATE REALISTIC VOICE WITH OUR MODEL.
          </p>
          <p className="text-center   ">(trained for narration and spot.)</p>
          <div className="mx-5">
            <p className=" md:font-thin  mx-auto max-w-lg text-center  text-md md:text-xl lg:text-xl xl:text-2xl mt-5 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-600 to-green-500 ">
              You can choose from over 12 languages and 50 voices to convert
              your texts into speech and get your audio file
            </p>
          </div>

          <p className="text-center my-10 text-emerald-500 font-mono text-lg underline">
            sample
          </p>
          <div className="mx-10 my-10">
            <HomeComponent
              img1={claireremovebg}
              img2={emmaremovebgpreview}
              img3={danielremovebgpreview}
              img4={anthonyremovebgpreview}
            />
          </div>
          <VoiceTest />
          <br />
          <Separator />

          <div className="flex justify-center mt-11 md:mt-[100px] ">
            <button className="w-[200px] h-[50px] rounded-sm bg-gradient-to-r from-yellow-400 to-green-400  hover:bg-blue-100 text-white font-bold">
              <Link href="/dashboard"> Get started</Link>
            </button>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="flex justify-center">
        <p className="text-3xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-green-500 to-green-500 my-10">
          Online AI text-to-speech converter
        </p>
      </div>

      <div className="grid mx-2 md:mx-[100px]">
        <div className="flex justify-between w-full h-[300px] md:h-[400px] rounded-md bg-gradient-to-r from-yellow-100 to-green-100 my-10">
          <div className="grid gap-4 ">
            <p className="text-3xl md:text-4xl font-bold underline text-center my-auto m-3 md:m-10">
              Text to speech for :
            </p>
            <p className="text 2xl font-bold  my-auto m-3 md:ml-10">
              * content creator.
            </p>
            <p className="text 2xl font-bold  my-auto m-3 md:ml-10">
              {" "}
              * Marketer.
            </p>
            <p className="text 2xl font-bold  my-auto m-3 md:ml-10">
              {" "}
              * Audio book.
            </p>
          </div>

          <div className="grid gap-3 m-3 ">
            <Image
              src={tiktokcreator}
              alt=""
              className="h-[100px] w-[150px] shadow-md rounded-md"
            />

            <Image
              src={contentCreatorIllustration}
              alt=""
              className="size-[170px] md:size-[400px]  rounded-md"
            />
          </div>
        </div>
      </div>

      <div className=" flex items-center mt-10">
        <Image
          src={flechedesign}
          alt=""
          className="rounded-sm size-[50px] md:size-[150px]"
        />
        <div className="flex justify-center gap-2 mt-11 md:mt-[200px] mx-5 md:mx-[70px] shadow-md rounded-md">
          <Image src={screennaturalvoice} alt="" className="rounded-md " />
        </div>
        <Image
          src={flechedesign2}
          alt=""
          className="rounded-sm size-[50px] md:size-[150px]"
        />
      </div>

      <br />
      <div className="flex justify-center mt-11 md:mt-[100px] ">
        <button className="w-[200px] h-[50px] rounded-sm bg-gradient-to-r from-yellow-400 to-green-400  hover:bg-blue-100 text-white font-bold">
          <Link href="/dashboard"> Get started</Link>
        </button>
      </div>
      <br />

      <div className="container mx-auto  py-8 md:mt-[100px]">
        <p className=" text-3xl md:text-5xl text-center my-[100px] font-bold">
          WHY USE AI <span className="text-yellow-500">Vivid</span>
          <span className="text-green-500">voice </span>?
        </p>
        <p className="text-center my-[10px]">
          Our model is able to catch the context of the text for a comprehensive
          speech
        </p>
        <Separator className="my-10" />

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:mx-[100px] ">
          {textCard.map((txt) => (
            <Card key={txt.id}>
              <CardHeader>
                <div className="flex justify-center">
                  <Image
                    src={txt.img}
                    alt=""
                    className="h-[100px] w-[100px] "
                  />
                </div>

                <CardTitle className="text-center">{txt.title}</CardTitle>
                <CardDescription className="text-center">
                  {txt.desc}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Separator />
              </CardFooter>
            </Card>
          ))}
        </div>
        <Separator className="my-10" />
        <div className="md:mx-[100px] bg-slate-800 p-[50px] md:mt-[200px]">
          <p className="text-3xl md:text-5xl font-bold text-white">
            AI Voice Generator in 12 Languages.
          </p>
          <p className=" md:font-thin my-10  md:text-xl text-white">
            Our AI voice generator supports{" "}
            <span className="font-bold underline">12 languages</span> and all
            diverse accents - just select the appropriate accent and enter text
            in your language of choice.{" "}
            <span className="text-yellow-500 font-bold">Vivid</span>
            <span className="text-green-500 font-bold">voice</span> allows you
            to create voices and use them in any language.
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

        <div className="mx-10 md:mx-[100px]">
          <p className="text-3xl mt-[200px] text-center font-bold">Pricing</p>
          <div className=" grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
            <Card className=" max-w-sm mt-9">
              <p className="text-3xl font-semibold mt-10 text-center text-emerald-700">
                Basic
              </p>
              <p className=" font-thin text-md text-center text-fuchsia-700 mt-1">
                8$/month
              </p>
              <Separator className="my-4" />
              <ul className="text-lg font-thin text-center mb-4">
                <li>New content creators, students</li>
                <li>40,000 char/Month</li>
                <li> 5 custom voice</li>
                <li>commercial use</li>
              </ul>
              <div className="flex justify-center">
                <Button asChild className="bg-green-500">
                  <Link href="/signup">Get access</Link>
                </Button>
              </div>
              <br />
            </Card>

            <Card className=" max-w-sm mt-9">
              <div className="w-full bg-stone-100 h-[55px] rounded-t-md">
                <br />
                <p className="text-center font-semibold"> Most popular*</p>
              </div>
              <p className="text-3xl font-semibold mt-10 text-center text-green-500">
                Pro
              </p>
              <p className=" font-thin text-md text-center text-fuchsia-700 mt-1">
                22$/month
              </p>
              <Separator className="my-4" />
              <ul className="text-lg font-thin text-center mb-4">
                <li>Content creators, freelancers</li>
                <li>100,000 char/Month</li>
                <li> 15 custom voice</li>
                <li>commercial use</li>
              </ul>
              <div className="flex justify-center">
                <Button asChild className="bg-green-500">
                  <Link href="/signup">Get access</Link>
                </Button>
              </div>
              <br />
            </Card>

            <Card className=" max-w-sm mt-9">
              <p className="text-3xl font-semibold mt-10 text-center text-green-500">
                Premium
              </p>
              <p className=" font-thin text-md text-center text-fuchsia-700 mt-1">
                50$/month
              </p>
              <Separator className="my-4" />
              <ul className="text-lg font-thin text-center mb-4">
                <li>Corporations, public entities, agencies, MCNs</li>
                <li>250,000 char/Month</li>
                <li> 30 custom voice</li>
                <li>commercial use</li>
              </ul>
              <div className="flex justify-center">
                <Button asChild className="bg-green-500">
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
                To create your own AI voice at Vividvoice, go to the setting,
                upload your best quality voice and select it. Voice Design
                allows you to customize the speaker s identityfor unique voices
                in your scripts, while Voice Cloning mimics real voices. This
                ensures variety and exclusivity in your generated voices, as
                they are entirely artificial and not linked to real people.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
                How much does using Vividvoice AI voice generator cost?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500">
                The Starter Plan is $8 per month, offering 40,000 characters and
                up to 5 custom voices. the pro plan is 22$/month and offering
                100,000 characters and up to 15 voices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
                Can I use Vividvoice AI voice generator for free?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500">
                No,with this model we are unable to offer free plan
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className=" text-xl mb:text-2xl font-semibold">
                How many languages does Vividvoice support?
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
                Vividvoice AI voice generator transforms text to spoken audio
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
const PricingCard = ({ plan, price, features, buttonText }: any) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{plan}</div>
        <div className="text-gray-700 text-base">${price} / month</div>
        <p className="text-gray-700 text-base mt-4 mb-8">{features}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {buttonText}
        </button>
      </div>
    </div>
  );
};
