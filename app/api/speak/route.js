import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
console.log(">server started");
const replicate = new Replicate({
  auth: "r8_f8974kvfG5yAUiEilrRScMg7V3Ol75R2MkdVH",
});

export async function POST(req) {
  const { text, language, clean_voice } = await req.json();

  console.log(`text:${text} language:${language}  clean_voice:${clean_voice}`);

  //const value=chatgpt? chatgptvoice : output

  const output = await replicate.run(
    "lucataco/xtts-v2:684bc3855b37866c0c65add2ff39c78f3dea3f4ff103a436465326e0f438d55e",
    {
      input: {
        text: text,
        speaker:
          "https://replicate.delivery/pbxt/Jt79w0xsT64R1JsiJ0LQRL8UcWspg5J4RFrU6YwEKpOT1ukS/male.wav",
        language: language,
        cleanup_voice: clean_voice,
      },
    }
  );
  console.log(output);
  return NextResponse.json({
    output: output,
  });
}
