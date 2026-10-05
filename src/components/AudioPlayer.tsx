import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Gentle romantic music box notes (pentatonic / major scale frequencies)
  const notes = [
    523.25, // C5
    587.33, // D5
    659.25, // E5
    698.46, // F5
    783.99, // G5
    880.00, // A5
    987.77, // B5
    1046.50 // C6
  ];

  const melodyPattern = [
    { note: 2, duration: 0.6 }, // E5
    { note: 4, duration: 0.6 }, // G5
    { note: 7, duration: 0.8 }, // C6
    { note: 5, duration: 0.5 }, // A5
    { note: 4, duration: 0.7 }, // G5
    { note: 2, duration: 0.5 }, // E5
    { note: 1, duration: 0.5 }, // D5
    { note: 0, duration: 0.9 }, // C5
    { note: 1, duration: 0.5 }, // D5
    { note: 2, duration: 0.7 }, // E5
    { note: 4, duration: 0.9 }, // G5
    { note: 0, duration: 1.2 }, // C5
  ];

  const playChime = (freq: number) => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sine wave with subtle harmonics for a music-box timbre
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.7);
    } catch {
      // Audio playback safety
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      let step = 0;
      // Play initial note
      playChime(notes[melodyPattern[0].note]);

      intervalRef.current = window.setInterval(() => {
        step = (step + 1) % melodyPattern.length;
        const currentItem = melodyPattern[step];
        playChime(notes[currentItem.note]);
      }, 700);

      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleMusic}
      title={isPlaying ? "Mute romantic music box" : "Play romantic music box"}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-2.5 bg-white/90 backdrop-blur-md border border-pink-200 text-pink-700 rounded-full shadow-lg hover:shadow-pink-200/50 hover:bg-pink-50 transition-all duration-300 group"
    >
      <div className="relative">
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-pink-600 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-neutral-400 group-hover:text-pink-500" />
        )}
      </div>
      <span className="text-xs font-medium tracking-wide">
        {isPlaying ? 'Music Box Playing' : 'Romantic Melody'}
      </span>
      {isPlaying && (
        <span className="flex items-center gap-0.5 h-3">
          <span className="w-1 bg-pink-500 rounded-full animate-bounce [animation-delay:0ms] h-2"></span>
          <span className="w-1 bg-pink-500 rounded-full animate-bounce [animation-delay:150ms] h-3"></span>
          <span className="w-1 bg-pink-500 rounded-full animate-bounce [animation-delay:300ms] h-1.5"></span>
        </span>
      )}
      {!isPlaying && <Music className="w-3.5 h-3.5 text-pink-400" />}
    </button>
  );
};
