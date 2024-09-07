import Image from "next/image";
import HomeComponent from "./componentCustom/HomeComponent";

import rihanna from "../public/rihanna.jpeg";
import snoopdog from "../public/snoopdog.jpg";
import trump from "../public/donaltrump.jpg";
import gadelmaleh from "../public/gadelmaleh.jpg";
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
import textts from "../public/text-to-speech.png";

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
import {
  AlertTriangle,
  Check,
  CheckCircle,
  Circle,
  CircleIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import VoiceTest from "./trytestingvoice/VoiceTest";
import { AvatarIcon } from "@radix-ui/react-icons";

export default function Home() {
  const textCard = [
    {
      id: "1",
      title: "Emotive based voice,(Like human)",
      desc: "Genarate voice with accent or no, with emotion based on your sample voice.",
      img: img6,
    },
    {
      id: "2",
      title: "Clone any voice",
      desc: "Upload 30sec voice and replicate it",
      img: podcast,
    },
    {
      id: "3",
      title: "All generated voice are 100% original",
      desc: "No voice gererated is exactly the same.",
      img: audioconv,
    },
    {
      id: "4",
      title: "Simple to use",
      desc: "Upload/select, paste your text ,and generate.",
      img: img4,
    },
    {
      id: "5",
      title: "Emotion transfer",
      desc: "Pitch based on your emotion and the context of the text.",
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
    <main>
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

      <div className="  bg-gradient-to-b from-emerald-50 to-white ">
        <div className="bg-gridline w-full">
          <br />
          <br />

          <div className=" md:mx-[100px]  ">
            <p className="text-center font-bold  text-lg md:text-3xl  md:my-5 xl:text-5xl xl:my-10">
              GENERATE REALISTIC VOICE WITH OUR MODEL.
            </p>
            <p className="text-center font-serif text-gray-600 ">
              (trained for narration and spot.)
            </p>
            <div className="mx-5">
              <p className=" font-serif  mx-auto max-w-lg text-center  text-md md:text-xl lg:text-xl xl:text-2xl mt-5  bg-clip-text text-gray-600">
                You can choose from over 12 languages and 50 voices to convert
                your texts into speech and get your audio file
              </p>
            </div>

            <p className="text-center my-10 text-emerald-500 font-mono text-lg underline">
              sample
            </p>
            <div className="mx-10 my-10 ">
              <HomeComponent
                img1={rihanna}
                img2={trump}
                img3={snoopdog}
                img4={gadelmaleh}
              />
            </div>
            <VoiceTest />
            <br />

            <div className="flex justify-center mt-11 md:mt-[100px] ">
              <button className="w-[200px] h-[50px] rounded-sm underline bg-emerald-600 shadow-lg shadow-emerald-100  hover:bg-emerald-500 text-white font-bold">
                <Link href="/dashboard"> Get started</Link>
              </button>
            </div>
            <div className="flex justify-center my-4">
              <div className="flex items-center gap-1">
                <AvatarIcon />
                <AvatarIcon />
                <AvatarIcon />
                <p className="text-gray-600 font-serif">
                  And join 1300+ customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="flex justify-center mx-10 md:mx-[200px] my-10">
        <Image src={textts} alt="" className="" />
      </div>

      <div className="animate-slidein grid mx-2 md:mx-[100px] mt-[100px]">
        <div className="flex justify-between w-full h-[300px] md:h-[400px] rounded-br-[200px] rounded-bl-lg rounded-tl-lg rounded-tr-lg bg-yellow-100 my-10">
          <div className="flex flex-col gap-1 items-center ">
            <p className=" text-gray-600 text-2xl md:text-4xl font-bold underline text-center my-auto m-3 md:m-5">
              Text to speech for :
            </p>
            <div className="flex items-center gap-1   my-auto m-3 md:ml-10">
              <CheckCircle className="text-yellow-500" />
              <p className="text-gray-500 text-center md:2xl font-serif ">
                Content creator.🎬
              </p>
            </div>

            <div className="flex items-center  gap-1 my-auto m-3 md:ml-10">
              <CheckCircle className="text-yellow-500" />
              <p className="text-gray-500 text-center md:2xl font-serif  ">
                {" "}
                Marketer.📊
              </p>
            </div>

            <div className="flex items-center gap-1  my-auto m-3 md:ml-10">
              <CheckCircle className="text-yellow-500" />
              <p className="text-gray-500 text-center md:2xl font-serif ">
                Product developer.🧑‍💻
              </p>
            </div>

            <div className="flex items-center gap-1  my-auto m-3 md:ml-10">
              <CheckCircle className="text-yellow-500" />
              <p className="text-gray-500 font-serif text-center md:2xl  ">
                Educator.🎓
              </p>
            </div>
          </div>

          <div className="grid gap-2 m-3 ">
            <Image
              src={tiktokcreator}
              alt=""
              className="h-[100px] w-[150px] shadow-md rounded-md"
            />

            <Image
              src={contentCreatorIllustration}
              alt=""
              className="w-[250px] h-[200px] md:size-[400px] shadow-lg  rounded-md"
            />
          </div>
        </div>
      </div>

      <div className=" flex items-center mt-10">
        <Image
          src={flechedesign}
          alt=""
          className="rounded-sm size-[30px] md:size-[130px]"
        />
        <div className="w-full bg-gridline md:mt-[250px]">
          <div className="flex justify-center gap-2 mt-12   mx-5 md:mx-[70px] shadow-lg shadow-gray-800 rounded-lg border-[5px] border-emerald-600">
            <Image src={screennaturalvoice} alt="" className="rounded-sm " />
          </div>
        </div>

        <Image
          src={flechedesign2}
          alt=""
          className="rounded-sm size-[30px] md:size-[130px]"
        />
      </div>
      <div className="w-full bg-gridline md:mt-[50px]">
        <div className="flex justify-center my-5 ">
          <iframe
            className="w-full h-[200px] shadow-lg shadow-gray-800 md:h-[460px] m-10 md:m-[200px] rounded-lg border-[5px] border-emerald-600"
            src={`https://www.youtube.com/embed/fPq50rwItiY?si=CbB1e9XaxNivOxF-`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <br />
      <div className="flex justify-center mx-10 ">
        <Separator />
      </div>

      <div className="flex justify-center mt-11 md:mt-[100px] ">
        <button className="w-[200px] h-[50px] shadow-emerald-100  bg-emerald-600 shadow-lg underline rounded-sm hover:bg-emerald-500 text-white font-bold">
          <Link href="/dashboard"> Get started</Link>
        </button>
      </div>
      <br />

      <div className="container mx-auto  py-8 md:mt-[100px]">
        <p className=" text-3xl md:text-5xl text-center my-[100px] font-serif">
          WHY USE AI <span className="text-yellow-500">Vivid</span>
          <span className="text-emerald-600">voice </span>?
        </p>

        <Separator className="my-10" />

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:mx-[100px] ">
          {textCard.map((txt) => (
            <Card key={txt.id} className="bg-gray-100 hover:bg-transparent">
              <CardHeader>
                <div className="flex justify-center">
                  <Image
                    src={txt.img}
                    alt=""
                    className="h-[100px] w-[100px] "
                  />
                </div>

                <CardTitle className="text-center font-serif">
                  {txt.title}
                </CardTitle>
                <CardDescription className="text-center font-serif">
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
        <div className="md:mx-[100px] bg-slate-800 p-[50px] md:mt-[200px] rounded-[20px]">
          <p className="text-3xl md:text-5xl font-serif text-white">
            AI Voice Generator in 12 Languages.
          </p>
          <p className="font-serif my-10  md:text-xl text-white">
            Our AI voice generator supports{" "}
            <span className="font-bold underline">12 languages</span> and all
            diverse accents - just select the appropriate accent and enter text
            in your language of choice.{" "}
            <span className="text-yellow-500 font-bold">Vivid</span>
            <span className="text-emerald-600 font-bold">voice</span> allows you
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
          <p className="text-3xl md:text-4xl mt-[200px] text-center font-serif md:my-[100px]">
            Pricing
          </p>
          <div className=" grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
            <Card className=" max-w-sm mt-9 bg-gray-100">
              <p className="text-3xl font-semibold mt-10 text-center text-emerald-700">
                Basic
              </p>
              <p className=" font-thin text-md text-center text-fuchsia-700 mt-1">
                8$/month
              </p>
              <Separator className="my-4" />
              <ul className="text-lg font-serif  text-center mb-4">
                <li>New content creators, students</li>
                <li>40,000 char/Month</li>
                <li> Text to sound generator</li>
                <li>Voice Cloning</li>

                <li>commercial use</li>
              </ul>
              <div className="flex justify-center">
                <Button asChild className="bg-emerald-600">
                  <Link href="/signup">Get access</Link>
                </Button>
              </div>
              <br />
            </Card>

            <Card className=" max-w-sm mt-9 bg-emerald-100 border-[3px] border-emerald-500">
              <div className="w-full bg-stone-100 h-[55px] rounded-t-md">
                <br />
                <p className="text-center font-semibold"> Most popular*</p>
              </div>
              <p className="text-3xl font-semibold mt-10 text-center text-emerald-600">
                Pro
              </p>
              <p className=" font-serif  text-md text-center text-fuchsia-700 mt-1">
                22$/month
              </p>
              <Separator className="my-4" />
              <ul className="text-lg font-serif  text-center mb-4">
                <li>Content creators, freelancers</li>
                <li>100,000 char/Month</li>
                <li> Text to sound generator</li>
                <li>Voice Cloning</li>

                <li>commercial use</li>
              </ul>
              <div className="flex justify-center">
                <Button asChild className="bg-emerald-600">
                  <Link href="/signup">Get access</Link>
                </Button>
              </div>
              <br />
            </Card>

            <Card className=" max-w-sm mt-9 bg-yellow-100">
              <p className="text-3xl font-semibold mt-10 text-center text-emerald-600">
                Premium
              </p>
              <p className=" font-serif  text-md text-center text-fuchsia-700 mt-1">
                50$/month
              </p>
              <Separator className="my-4" />
              <ul className="text-lg font-serif  text-center mb-4">
                <li>Corporations, public entities, agencies, MCNs</li>
                <li>250,000 char/Month</li>
                <li> Text to sound generator</li>
                <li>Voice Cloning</li>

                <li>commercial use</li>
              </ul>
              <div className="flex justify-center">
                <Button asChild className="bg-emerald-600">
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

        <p className="font-serif text-center text-3xl md:text-5xl mt-[200px] mb-[100px] underline ">
          Frequently asked questions.
        </p>
        <div className="mx-[50px] md:mx-[100px]">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className=" text-xl mb:text-2xl font-serif ">
                How do I make my own AI voice?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500 font-serif ">
                To create your own AI voice at Vividvoice, go to the setting,
                upload your best quality voice and select it. Voice Design
                allows you to customize the speaker s identityfor unique voices
                in your scripts, while Voice Cloning mimics real voices. This
                ensures variety and exclusivity in your generated voices, as
                they are entirely artificial and not linked to real people.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className=" text-xl mb:text-2xl font-serif ">
                How much does using Vividvoice AI voice generator cost?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500 font-serif ">
                The Starter Plan is $8 per month, offering 40,000 characters and
                up to 5 custom voices. the pro plan is 22$/month and offering
                100,000 characters and up to 15 voices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className=" text-xl mb:text-2xl font-serif ">
                Can I use Vividvoice AI voice generator for free?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500 font-serif ">
                This model is running on GPU Nvidia A100 witch cost...
                Unfortunately we are unable to offer free plan.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className=" text-xl mb:text-2xl font-serif ">
                Does youtube monetize AI voice generated?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500 font-serif ">
                Yes,all generated voices are yours thus,you can use it on any
                platform.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className=" text-xl mb:text-2xl font-serif ">
                What is an AI voice generator?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500 font-serif ">
                Vividvoice AI voice generator transforms text to spoken audio
                that sounds like a natural human voice, complete with realistic
                intonation and accents. It offers a wide range of voice options
                across various languages and dialects. Designed for ease of use,
                it caters to both individuals and businesses looking for
                customizable vocal outputs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className=" text-xl mb:text-2xl font-serif ">
                How do I use AI voice generators to turn text into audio?
              </AccordionTrigger>
              <AccordionContent className="md:text-xl text-gray-500 font-serif ">
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
          <p className="text-sm lg:order-2 font-serif ">
            &copy; 2024 Mon Entreprise. Tous droits réservés.
          </p>
          <div className="flex lg:order-1 lg:justify-center lg:mt-0 mt-4">
            <Link
              href="/pages/signup"
              className="text-sm hover:text-gray-400 font-serif "
            >
              sign up
            </Link>
            <Link
              href="/pages/login"
              className="text-sm hover:text-gray-400 ml-4 font-serif "
            >
              login
            </Link>
            <Link
              href="#"
              className="text-sm hover:text-gray-400 ml-4 font-serif "
            >
              pricing
            </Link>
            <Link
              href="#"
              className="text-sm hover:text-gray-400 ml-4 font-serif "
            >
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
