"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setTimeout } from "timers";
export default function Success() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.replace("/dashboard"), 2000);
  }, []);
  return (
    <div className="flex justify-center mt-[100px]">
      <p className="text-green-600 font-bold text-4xl"> Thanks!</p>
    </div>
  );
}
