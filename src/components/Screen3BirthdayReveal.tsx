import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Camera, Eye, RotateCcw } from 'lucide-react';
import defaultMemoryPhoto from '../assets/vdk.jpg';

export const Screen3BirthdayReveal: React.FC = () => {
  // Whether she has clicked to manually place / reveal the memory photo
  const [isPhotoPlaced, setIsPhotoPlaced] = useState<boolean>(() => {
    return localStorage.getItem('piaa_photo_placed') === 'true';
  });

  // Photo source: uses the website's built-in memory photo by default
  const [photoUrl, setPhotoUrl] = useState<string>(() => {
    return localStorage.getItem('piaa_custom_photo') || defaultMemoryPhoto || '/vdk.jpg';
  });

  // Trigger romantic celebration confetti on mount
  useEffect(() => {
    fireCelebrationConfetti();
  }, []);

  const fireCelebrationConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#db2777', '#f472b6', '#f43f5e', '#fb7185', '#fda4af', '#fce7f3'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#db2777', '#e11d48', '#fda4af'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#db2777', '#e11d48', '#fda4af'],
      });
    }, 400);
  };

  const handlePlacePhoto = () => {
    setIsPhotoPlaced(true);
    localStorage.setItem('piaa_photo_placed', 'true');
    fireCelebrationConfetti();
  };

  const handleResetPhoto = () => {
    setIsPhotoPlaced(false);
    localStorage.removeItem('piaa_photo_placed');
  };

  return (
    <div className="min-h-screen pb-24 relative z-10 text-neutral-800">
      {/* Hero Header */}
      <section className="pt-14 pb-8 px-4 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-3"
        >
          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100/90 border border-rose-300/80 rounded-full text-xs font-semibold text-rose-700 shadow-sm animate-pulse-glow">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span className="tracking-wide uppercase font-medium">Happy Birthday</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-romantic font-extrabold text-neutral-900 tracking-tight leading-tight">
            Happy Birthday Dear Piaa ❤️🫶🏻
          </h1>
        </motion.div>
      </section>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Heartfelt Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="bg-[#fffdfa] rounded-3xl p-7 sm:p-10 shadow-xl shadow-pink-200/50 border border-pink-100 relative overflow-hidden"
        >
          {/* Decorative Wax Seal stamp */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
            className="absolute top-5 right-5 w-12 h-12 bg-gradient-to-tr from-rose-600 to-pink-500 rounded-full flex items-center justify-center shadow-md border-2 border-rose-200 text-white select-none"
          >
            <Heart className="w-5 h-5 fill-white" />
          </motion.div>

          {/* Letter Body with Staggered Gentle Fade-In */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.4,
                  delayChildren: 0.2,
                },
              },
            }}
            className="space-y-5 text-neutral-800 leading-relaxed font-serif-romantic text-base sm:text-lg"
          >
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: 'easeOut' },
                },
              }}
              className="text-2xl sm:text-3xl font-bold text-pink-700 font-script"
            >
              Happy Birthday Dear Piaa ❤️🫶🏻
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: 'easeOut' },
                },
              }}
              className="text-neutral-700"
            >
              2 years with you, and honestly, I was so lucky to have you in my life. ❤️ Thank you for all the love, care, understanding and all the little efforts you make for me.
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: 'easeOut' },
                },
              }}
              className="text-neutral-700"
            >
              I still love those small moments with you the most — especially our auto rides in the rain. 😂❤️ And I know how you always find some excuse to come with me just so we can spend a little more time together. Those little things mean more to me than you know.
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: 'easeOut' },
                },
              }}
              className="text-neutral-700"
            >
              We've had our fights and misunderstandings, but through everything, we’ve still stayed together and made so many beautiful memories ❤️.
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: 'easeOut' },
                },
              }}
              className="pt-2 font-medium text-pink-700 text-lg sm:text-xl"
            >
              Happy Birthday once again, Ved. Hope we'll ..... 🫶🏻
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Dedicated Memory Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-pink-200/40 border border-pink-100 text-center"
        >
          <div className="relative max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {isPhotoPlaced ? (
                /* The Revealed Polaroid Memory Photo */
                <motion.div
                  key="revealed-photo"
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -15 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  {/* Polaroid Frame */}
                  <div className="p-3 sm:p-4 bg-[#faf7f5] rounded-2xl border border-pink-100 shadow-lg">
                    <div className="overflow-hidden rounded-xl bg-black/5 aspect-[3/4] max-h-[520px] flex items-center justify-center">
                      <img
                        src={photoUrl}
                        alt="Our Memory"
                        className="w-full h-full object-cover sm:object-contain rounded-lg shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Caption Required by User */}
                  <div className="pt-2">
                    <p className="font-serif-romantic text-base sm:text-lg text-neutral-800 font-medium tracking-wide">
                      this is only memory of ours .
                    </p>
                  </div>

                  {/* Subtle Hide / Put Away Option */}
                  <div className="pt-2">
                    <button
                      onClick={handleResetPhoto}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-pink-600 transition-colors rounded-full hover:bg-pink-50"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Hide photo</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Unrevealed Frame - Waiting for Her to Add/Reveal It Manually */
                <motion.div
                  key="unplaced-frame"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="border-2 border-dashed border-pink-300 hover:border-pink-400 bg-pink-50/40 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[300px] space-y-5 transition-all"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-pink-500 animate-float">
                    <Camera className="w-8 h-8" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-serif-romantic font-bold text-neutral-900 text-lg sm:text-xl">
                      A Special Memory Awaits
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                      There is one precious memory kept safe here for you. Tap below to place it into this frame.
                    </p>
                  </div>

                  <button
                    onClick={handlePlacePhoto}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Tap to add our memory photo</span>
                  </button>

                  <p className="font-serif-romantic text-xs text-neutral-400 italic pt-1">
                    "this is only memory of ours ."
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
