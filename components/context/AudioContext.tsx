"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  isPausedByVideo: boolean;
  togglePlay: () => void;
  playBGM: () => void;
  pauseBGM: () => void;
  notifyVideoPlay: () => void;
  notifyVideoEnd: () => void;
  setVolume: (v: number) => void;
  playVoiceClip: (frequencies?: number[]) => void;
  playPaperFlipSound: () => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  volume: 0.35,
  isPausedByVideo: false,
  togglePlay: () => {},
  playBGM: () => {},
  pauseBGM: () => {},
  notifyVideoPlay: () => {},
  notifyVideoEnd: () => {},
  setVolume: () => {},
  playVoiceClip: () => {},
  playPaperFlipSound: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.35);
  const [isPausedByVideo, setIsPausedByVideo] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);
  const isVideoPlayingRef = useRef(false);
  const userManuallyPausedRef = useRef(false);
  const initialVolumeRef = useRef(volume);

  // Initialize and configure HTML5 Audio instances for for-u.mp3 and switch.wav
  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/for-u.mp3");
      audio.loop = true;
      audio.volume = initialVolumeRef.current;
      audio.preload = "auto";
      audioRef.current = audio;

      const sfx = new Audio("/switch.wav");
      sfx.preload = "auto";
      sfx.volume = Math.min(1, Math.max(0.25, initialVolumeRef.current * 1.2));
      sfxRef.current = sfx;

      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);

      // Attempt immediate playback without delay on subpages like /schedule, /about, /news
      if (!isVideoPlayingRef.current && !userManuallyPausedRef.current) {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Handled on first user interaction
        });
      }

      // Instant one-time interaction listener to unblock audio on first touch/click/scroll/hover
      const handleFirstInteraction = () => {
        if (
          audioRef.current &&
          !userManuallyPausedRef.current &&
          !isVideoPlayingRef.current &&
          audioRef.current.paused
        ) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});
        }
      };

      window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });
      window.addEventListener("click", handleFirstInteraction, { passive: true });
      window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
      window.addEventListener("keydown", handleFirstInteraction, { passive: true });
      window.addEventListener("scroll", handleFirstInteraction, { passive: true });

      return () => {
        window.removeEventListener("pointerdown", handleFirstInteraction);
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
        window.removeEventListener("keydown", handleFirstInteraction);
        window.removeEventListener("scroll", handleFirstInteraction);
        audio.pause();
        audio.src = "";
        audioRef.current = null;
        sfxRef.current = null;
      };
    }
  }, []);

  // Update volume on audio element
  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
    if (sfxRef.current) {
      sfxRef.current.volume = Math.min(1, Math.max(0.25, v * 1.2));
    }
  }, []);

  // Explicit Play
  const playBGM = useCallback(() => {
    if (audioRef.current) {
      userManuallyPausedRef.current = false;
      setIsPausedByVideo(false);
      isVideoPlayingRef.current = false;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  }, []);

  // Explicit Pause
  const pauseBGM = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // User Manual Toggle Button in Navbar / Sound Control
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      userManuallyPausedRef.current = true;
      setIsPausedByVideo(false);
      pauseBGM();
    } else {
      userManuallyPausedRef.current = false;
      playBGM();
    }
  }, [isPlaying, pauseBGM, playBGM]);

  // Video Starts Playing -> Pause BGM & update state
  const notifyVideoPlay = useCallback(() => {
    isVideoPlayingRef.current = true;
    if (audioRef.current) {
      if (!audioRef.current.paused || isPlaying) {
        setIsPausedByVideo(true);
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  // Video Ends / Closes -> Automatically Resume BGM instantly
  const notifyVideoEnd = useCallback(() => {
    isVideoPlayingRef.current = false;
    setIsPausedByVideo(false);
    if (audioRef.current && !userManuallyPausedRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  }, []);

  // Procedural Chime / Voice effect helper
  const playVoiceClip = useCallback((frequencies = [523.25, 659.25, 783.99]) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.value = volume;
      masterGain.connect(ctx.destination);

      frequencies.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.2 * volume, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.35);
      });
    } catch {}
  }, [volume]);

  // Paper flip / page transition sound effect using switch.wav (soft subtle volume)
  const playPaperFlipSound = useCallback(() => {
    try {
      if (sfxRef.current) {
        const sfxClone = sfxRef.current.cloneNode() as HTMLAudioElement;
        sfxClone.volume = Math.min(0.2, Math.max(0.05, volume * 0.35));
        sfxClone.play().catch(() => {});
      } else {
        const sfx = new Audio("/switch.wav");
        sfx.volume = Math.min(0.2, Math.max(0.05, volume * 0.35));
        sfx.play().catch(() => {});
      }
    } catch {}
  }, [volume]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        volume,
        isPausedByVideo,
        togglePlay,
        playBGM,
        pauseBGM,
        notifyVideoPlay,
        notifyVideoEnd,
        setVolume,
        playVoiceClip,
        playPaperFlipSound,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
