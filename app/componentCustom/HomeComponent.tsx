"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function HomeComponent() {
  return (
    <div className="flex justify-center">
      <br />
      <div>go to </div>

      <Button asChild className="bg-emerald-700 hover:bg-emerald-800">
        <Link href="/dashboard"> dashBoard</Link>
      </Button>
    </div>
  );
}
