import Image from "next/image";
import HomeComponent from "./componentCustom/HomeComponent";
import dataaudioinput from "../public/dataaudioinput.png";
import audioconversation from "../public/audioconversation.png";
import daniel from "../public/daniel.png";
import michael from "../public/michael.png";
import emma from "../public/emma.png";
import lisa from "../public/lisa.png";
import screennaturalvoice from "../public/screennaturalvoice.png";
//import lobservateur from "../public/sound/lobservateur.mp3";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import NavBar from "./componentCustom/NavBar";
import SoundExemple from "./componentCustom/SoundExemple";

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
        <div>
          <p className="text-center font-bold  text-lg md:text-xl lg:text-2xl xl:text-3xl">
            TTSAI® (TEXT TO SPEECH AI) CONVERTS TEXT INTO VOICE by ARTIFICIAL
            INTELLIGENCE
          </p>
          <div className="mx-3">
            <p className="mx-auto max-w-lg text-center  text-md md:text-xl lg:text-xl xl:text-2xl mt-5 font-semibold">
              You can choose from over 80 languages and 1000 voices to convert
              your texts into speech and get your audio file
            </p>
          </div>

          <div className="mx-8 my-10">
            <HomeComponent
              img1={lisa}
              img2={emma}
              img3={daniel}
              img4={michael}
            />
          </div>

          <div className="flex justify-center mt-11">
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

      <div className="flex justify-center mt-11 mx-10">
        <Image src={screennaturalvoice} alt="" />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="container mx-auto py-8">
        <p className="text-3xl text-center my-10">why use ai SpeechLab ?</p>
        <Separator className="my-8" />

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
        <Separator className="my-4" />

        <p className="text-3xl font-bold">Generate voice in 12 Language.</p>
        <div className="mx-8 my-10">
          <SampleLanguage
            english={daniel}
            french={daniel}
            turkish={daniel}
            polish={daniel}
            arabic={daniel}
            czech={daniel}
            chinese={daniel}
            dutch={daniel}
            spanish={daniel}
            portugal={daniel}
            russia={daniel}
            italian={daniel}
          />
        </div>

        <br />
        <br />
        <br />
        <br />
        <br />

        <p className="text-3xl ">Pricing</p>
        <div className=" grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
          <Card className=" max-w-sm mt-9">
            <p className="text-3xl font-semibold mt-10 text-center text-emerald-700">
              Pricing <span className="text-sm">/one plan</span>
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
              Pricing <span className="text-sm">/one plan</span>
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
              Pricing <span className="text-sm">/one plan</span>
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

        <br />
        <br />
        <br />
        <br />
        <br />

        <p className="font-bold text-center text-3xl">FAQ</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. Its animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. Its animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. Its animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. Its animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
