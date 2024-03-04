import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
console.log(">server started");

const replicate = new Replicate({
  auth: "r8_f8974kvfG5yAUiEilrRScMg7V3Ol75R2MkdVH",
});

export async function POST(req) {
  const { text, language, clean_voice } = await req.json();

  console.log(`text:${text} language:${language}  clean_voice:${clean_voice}`);
  // https://replicate.delivery/pbxt/KV9s78PwB0U53gO3qoPiCnq0tcUcKaFi3rYuwoZmpmLsuN5S/ElevenLabs_2024-03-02T17_58_01_Daniel.mp3
  const output = await replicate.run(
    "lucataco/xtts-v2:684bc3855b37866c0c65add2ff39c78f3dea3f4ff103a436465326e0f438d55e",
    {
      input: {
        text: text,

        speaker:
          "https://firebasestorage.googleapis.com/v0/b/my-saas-1.appspot.com/o/ElevenLabs_2024-03-03T21_40_50_Daniel.mp3?alt=media&token=3f0c18be-b49e-4221-ab20-129756932fc3",
        language: language,
        cleanup_voice: clean_voice,
      },
    }
  );
  console.log(mp3);
  return NextResponse.json({
    output: output,
  });
}
