"use client";
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
import { Button } from "@/components/ui/button";
import React from "react";

interface Track {
  tracks: [];
}
const SoundExemple = ({ tracks }: any) => {
  const colors = {
    tagsBackground: "#3e32e4",
    tagsText: "#ffffff",
    tagsBackgroundHoverActive: "#6e65f1",
    tagsTextHoverActive: "#ffffff",
    searchBackground: "#18191f",
    searchText: "#ffffff",
    searchPlaceHolder: "#575a77",
    playerBackground: "#18191f",
    titleColor: "#ffffff",
    timeColor: "#ffffff",
    progressSlider: "#3e32e4",
    progressUsed: "#ffffff",
    progressLeft: "#151616",
    bufferLoaded: "#1f212b",
    volumeSlider: "#3e32e4",
    volumeUsed: "#ffffff",
    volumeLeft: "#151616",
    playlistBackground: "#18191f",
    playlistText: "#575a77",
    playlistBackgroundHoverActive: "#18191f",
    playlistTextHoverActive: "#ffffff",
  };

  return (
    <>
      <div className="mx-10">
        <Player
          trackList={tracks}
          includeTags={false}
          includeSearch={false}
          showPlaylist={false}
          sortTracks={false}
          autoPlayNextTrack={false}
        />
      </div>
    </>
  );
};

export default SoundExemple;
