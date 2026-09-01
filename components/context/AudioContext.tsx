"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  playVoiceClip: (frequencies?: number[]) => void;
}

const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  volume: 0.5,
  togglePlay: () => {},
  setVolume: () => {},
  playVoiceClip: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.4);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgmTimerRef = useRef<NodeJS.Timeout | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const initAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      masterGainRef.current = audioCtxRef.current.createGain();
      masterGainRef.current.gain.value = volume;
      masterGainRef.current.connect(audioCtxRef.current.destination);
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  // Play cozy procedural lo-fi ambient notes
  const playCozyArpeggio = () => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Pentatonic cozy chords: Cmaj7, Am9, Fmaj7, G6
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // C, E, G, B
      [220.00, 261.63, 329.63, 392.00], // A, C, E, G
      [174.61, 220.00, 261.63, 329.63], // F, A, C, E
      [196.00, 246.94, 293.66, 392.00], // G, B, D, G
    ];

    const chord = chords[Math.floor(Math.random() * chords.length)];
    
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * (Math.random() > 0.5 ? 2 : 1), ctx.currentTime + idx * 0.4);
      
      noteGain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.4);
      noteGain.gain.linearRampToValueAtTime(0.12 * volume, ctx.currentTime + idx * 0.4 + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.4 + 1.8);

      osc.connect(noteGain);
      noteGain.connect(masterGainRef.current!);

      osc.start(ctx.currentTime + idx * 0.4);
      osc.stop(ctx.currentTime + idx * 0.4 + 2.0);
    });
  };

  const togglePlay = () => {
    initAudioCtx();
    if (isPlaying) {
      if (bgmTimerRef.current) clearInterval(bgmTimerRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playCozyArpeggio();
      bgmTimerRef.current = setInterval(() => {
        playCozyArpeggio();
      }, 3500);
    }
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(v, audioCtxRef.current.currentTime);
    }
  };

  const playVoiceClip = (frequencies = [523.25, 659.25, 783.99]) => {
    initAudioCtx();
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;

    frequencies.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.12);

      gain.gain.setValueAtTime(0.25 * volume, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.35);

      osc.connect(gain);
      gain.connect(masterGainRef.current!);

      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.4);
    });
  };

  useEffect(() => {
    return () => {
      if (bgmTimerRef.current) clearInterval(bgmTimerRef.current);
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying, volume, togglePlay, setVolume, playVoiceClip }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
