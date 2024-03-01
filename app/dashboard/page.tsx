"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { PlayCircleIcon, DeleteIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ComboboxPopover } from "../componentCustom/ComboboxPopover";
export default function Dashboard() {
  const [text, setText] = useState("");

  const [value, setValues] = useState("");
  const [isActive, activeButtonSubmit] = useState(false);
  const handleClick = async () => {
    if (value !== "") {
      await axios
        .post("/api/speak", {
          text: value,
          language: "fr",
          clean_voice: false,
        })
        .then((res) => {
          console.log(res.data);
          const { output } = res.data;
          setText(output);
        })
        .catch((error) => {
          console.log(error);
        });
      //alert("click from client");
    }
  };

  const handleActiveButton = () => {
    if (value.length < 5) {
      activeButtonSubmit(true);
    } else {
      activeButtonSubmit(false);
    }
  };
  useEffect(() => {
    handleActiveButton();
  }, [value]);

  return (
    <div className="grid w-full mx-9">
      <div className="flex justify-center">
        <p className="text-md text-center">{`>${text}`}</p>
      </div>
      <br />
      <div className=" grid w-full   ">
        <ComboboxPopover />

        <br />
        <br />
        <Textarea
          placeholder="Type your message here."
          onChange={(e) => {
            setValues(e.target.value);
            handleActiveButton();
          }}
          value={value}
        />
        <div className=" flex justify-center">
          <div className="fixed bottom-4 grid gap-2">
            <Button
              onClick={handleClick}
              disabled={isActive}
              variant="outline"
              size="icon"
            >
              <PlayCircleIcon className="h-4 w-4" />
            </Button>

            <Button
              onClick={() => {
                setValues("");
              }}
              disabled={isActive}
              variant="outline"
              size="icon"
            >
              <DeleteIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
