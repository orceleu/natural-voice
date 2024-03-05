import Image from "next/image";
import HomeComponent from "./componentCustom/HomeComponent";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center mt-10">welcome to AI voice</div>
      <HomeComponent />
    </main>
  );
}
