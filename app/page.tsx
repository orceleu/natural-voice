import Image from "next/image";
import Dashboard from "./dashboard/page";

export default function Home() {
  console.log(">server started");

  return (
    <main>
      <div className="flex justify-center mt-10">
        <Dashboard />
      </div>
    </main>
  );
}
