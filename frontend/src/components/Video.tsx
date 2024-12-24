"use client";

import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

function Video() {
  const onPlayerReady: YouTubeProps["onReady"] = (event: {
    target: {
      playVideo: () => void;
      pauseVideo: () => void;
      setPlaybackQuality: (quality: string) => void;
    };
  }) => {
    event.target.playVideo();
    event.target.setPlaybackQuality("small");
  };

  const opts: YouTubeProps["opts"] = {
    height: "400",
    width: "720",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="w-full max-w-2xl pl-10">
      <YouTube videoId="" opts={opts} onReady={onPlayerReady} />
    </div>
  );
}

export default Video;
