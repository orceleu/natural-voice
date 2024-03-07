"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image, { StaticImageData } from "next/image";
interface Props {
  img1: StaticImageData;
  img2: StaticImageData;
  img3: StaticImageData;
  img4: StaticImageData;
}
const HomeComponent: React.FC<Props> = ({ img1, img2, img3, img4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1 */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden flex  h-16">
        <Image src={img1} alt="Image 1" className="w-1/4 rounded-3xl" />
        <div className="p-4 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2">Lisa</h3>
        </div>
        <br />
        <div className="flex justify-end my-2">
          <Button
            className=" "
            variant="outline"
            onClick={() => {
              alert("fonctionne");
            }}
          >
            Button
          </Button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden flex  h-16">
        <Image src={img2} alt="Image 2" className="w-1/4 rounded-3xl" />

        <div className="p-4 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2">Emma</h3>
        </div>
        <br />
        <div className="flex justify-end my-2">
          <Button
            className=" "
            variant="outline"
            onClick={() => {
              alert("fonctionne");
            }}
          >
            Button
          </Button>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden flex  h-16">
        <Image src={img3} alt="Image 3" className="w-1/4 rounded-3xl" />
        <div className="p-4 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2">Daniel</h3>{" "}
        </div>{" "}
        <br />
        <div className="flex justify-end my-2">
          <Button
            className=" "
            variant="outline"
            onClick={() => {
              alert("fonctionne");
            }}
          >
            Button
          </Button>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden flex h-16">
        <Image src={img4} alt="Image 4" className="w-1/4 rounded-3xl" />
        <div className="p-4 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2">Michael</h3>{" "}
        </div>{" "}
        <br />
        <div className="flex justify-end my-2">
          <Button
            className=" "
            variant="outline"
            onClick={() => {
              alert("fonctionne");
            }}
          >
            Button
          </Button>
        </div>
      </div>
    </div>
  );
};
export default HomeComponent;
