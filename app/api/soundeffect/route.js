import * as fal from "@fal-ai/serverless-client";
import { NextResponse } from "next/server";
fal.config({
  credentials:
    "3acaf80b-c509-4c6d-a9a3-53201a9b9822:2779e88cfa33dbafceb17400f21c6b6d",
});
export async function POST(req) {
  const { text } = await req.json();

  const result = await fal.subscribe("fal-ai/stable-audio", {
    input: {
      prompt: text,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
  });

  console.log(result);

  return NextResponse.json({ url: result });
}
