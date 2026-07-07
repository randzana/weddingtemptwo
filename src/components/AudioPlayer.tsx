"use client";

import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  playTrigger: boolean;
}

export default function AudioPlayer({ playTrigger }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (playTrigger && audioRef.current) {
      // Small timeout to allow transition animation to begin before music plays
      const timer = setTimeout(() => {
        audioRef.current
          ?.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Autoplay prevented or deferred: ", err);
          });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [playTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Failed to play: ", err));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/love.m4a"
        loop
        preload="auto"
      />

      <button
        onClick={togglePlay}
        className="audio-player-btn"
        aria-label={isPlaying ? "وەستاندنی مۆسیقا" : "لێدانی مۆسیقا"}
        title={isPlaying ? "وەستاندنی مۆسیقای باکگراوند" : "لێدانی مۆسیقای باکگراوند"}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" style={{ transform: "translateX(1px)" }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </>
  );
}
