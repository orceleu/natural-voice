import Image from "next/image";
import HomeComponent from "./componentCustom/HomeComponent";
import screentts from "../public/screentts.png";
import daniel from "../public/daniel.png";
import michael from "../public/michael.png";
import emma from "../public/emma.png";
import lisa from "../public/lisa.png";
import screensaasvoice from "../public/screensaasvoice.png";
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

export default function Home() {
  const textContent = ["text1", "text2", "text3", "text4", "text5", "text6"];
  const textCard = [
    {
      id: "1",
      desc: "what s SQL",
    },
    {
      id: "2",
      desc: "what s SQL",
    },
    {
      id: "3",
      desc: "what s SQL",
    },
    {
      id: "4",
      desc: "what s SQL",
    },
    {
      id: "5",
      desc: "what s SQL",
    },
    {
      id: "6",
      desc: "what s SQL",
    },
  ];

  return (
    <main>
      <NavBar />
      <div className="flex justify-center mt-10">welcome to AI voice</div>

      <div className="mt-11">
        <div>
          <p className="text-center font-bold  text-lg md:text-xl lg:text-2xl xl:text-3xl">
            TTSAI® (TEXT TO SPEECH AI) CONVERTS TEXT INTO VOICE by ARTIFICIAL
            INTELLIGENCE
          </p>

          <p className="mx-auto max-w-lg text-center  text-md md:text-xl lg:text-xl xl:text-2xl mt-5 font-semibold">
            You can choose from over 80 languages and 1000 voices to convert
            your texts into speech and get your audio file
          </p>

          <div className="mx-10 my-10">
            <HomeComponent
              img1={lisa}
              img2={emma}
              img3={daniel}
              img4={michael}
            />
          </div>

          <div className="flex justify-center mt-11">
            <Button asChild className=" " size="lg">
              <Link href="/dashboard"> get started</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-11 mx-10">
        <Image src={screensaasvoice} alt="" />
      </div>

      <div className="container mx-auto py-8">
        <p className="text-3xl text-center">why use ai tts ?</p>

        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {textCard.map((txt) => (
            <Card key={txt.id}>
              <CardHeader>
                <Image src={screentts} alt="" />
                <CardDescription>{txt.desc}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="">Learn more</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Separator className="my-4" />

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
