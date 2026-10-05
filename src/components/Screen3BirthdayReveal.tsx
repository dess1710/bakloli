import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Cake,
  Calendar,
  Camera,
  Flame,
  X,
  Plus,
  RefreshCw,
  Gift,
  Smile,
  Compass
} from 'lucide-react';
import { GalleryPhoto } from '../types';

export const Screen3BirthdayReveal: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [activeTab, setActiveTab] = useState<'letter' | 'reasons' | 'timeline' | 'wish'>('letter');

  // Trigger celebration confetti on mount
  useEffect(() => {
    fireConfetti();
    const timer = setTimeout(() => {
      fireHeartConfetti();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#db2777', '#f472b6', '#f43f5e', '#fb7185', '#fda4af', '#fce7f3'],
    });
  };

  const fireHeartConfetti = () => {
    const end = Date.now() + 1000;
    const interval: number = window.setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#db2777', '#e11d48', '#fda4af'],
      });
    }, 200);
  };

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    fireConfetti();
    setTimeout(() => {
      fireHeartConfetti();
    }, 600);
  };

  // Curated romantic photo gallery placeholders
  const [photos, setPhotos] = useState<GalleryPhoto[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=900&auto=format&fit=crop',
      title: 'Where Our Story Began',
      date: 'Special Memory',
      caption: 'The moment you smiled at me and the whole world seemed to quiet down.',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=900&auto=format&fit=crop',
      title: 'Sunset Walks & Long Talks',
      date: 'Golden Hours',
      caption: 'Walking hand-in-hand, dreaming about tomorrow and wishing time would freeze.',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=900&auto=format&fit=crop',
      title: 'Warm Coffee & Cozy Laughter',
      date: 'Sweet Everyday',
      caption: 'Quiet mornings, inside jokes, and the warmth of simply being beside you.',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=900&auto=format&fit=crop',
      title: 'Under the Midnight Stars',
      date: 'Late Night Magic',
      caption: 'Looking up at constellations, but the brightest light was always in your eyes.',
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=900&auto=format&fit=crop',
      title: 'Sparklers & Birthday Cheers',
      date: 'Today • Your Birthday',
      caption: 'Celebrating your presence on this earth and the endless kindness in your soul.',
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=900&auto=format&fit=crop',
      title: 'Every Tomorrow With You',
      date: 'Forever & Always',
      caption: 'No matter where life takes us, my favorite destination is anywhere with you.',
    },
  ]);

  // Support custom photo replacement
  const handlePhotoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotos((prev) =>
            prev.map((p) =>
              p.id === id ? { ...p, url: uploadEvent.target!.result as string } : p
            )
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const reasons = [
    {
      id: 1,
      title: 'Your Radiant Kindness',
      desc: 'The gentle, compassionate way you treat people and make everyone feel valued and safe.',
      icon: '💖',
    },
    {
      id: 2,
      title: 'That Dazzling Smile',
      desc: 'How your eyes crinkle when you truly laugh. It can illuminate even my darkest days.',
      icon: '✨',
    },
    {
      id: 3,
      title: 'Your Brilliant Mind',
      desc: 'Your quiet wisdom, deep reflections, and the thoughtful brilliance you carry effortlessly.',
      icon: '♟️',
    },
    {
      id: 4,
      title: 'How Safe You Make Me Feel',
      desc: 'Just one embrace from you washes away the world’s noise and brings me home.',
      icon: '🏡',
    },
  ];

  const milestones = [
    {
      period: 'Chapter I',
      title: 'The Spark',
      text: 'A simple conversation that turned into hours of shared stories and unforgettable butterflies.',
    },
    {
      period: 'Chapter II',
      title: 'Growing Together',
      text: 'Learning each other’s quirks, celebrating victories, and holding hands through life’s storms.',
    },
    {
      period: 'Chapter III',
      title: 'Today & Beyond',
      text: 'Honoring your birthday today with all my love, and promising to stand by you for all the tomorrows to come.',
    },
  ];

  return (
    <div className="min-h-screen pb-24 relative z-10 text-neutral-800">
      {/* Hero Header */}
      <section className="pt-16 pb-14 px-4 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="space-y-4"
        >
          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-100/90 border border-rose-300/80 rounded-full text-xs font-semibold text-rose-700 shadow-sm animate-pulse-glow">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span className="tracking-wide uppercase font-medium">To My Favorite Human Being</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-romantic font-extrabold text-neutral-900 tracking-tight leading-tight">
            Happy Birthday, <br />
            <span className="font-script text-pink-600 text-5xl sm:text-7xl md:text-8xl drop-shadow-sm font-bold">
              My Love
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-neutral-600 text-base sm:text-lg font-light leading-relaxed">
            Today the universe celebrates the day you were born, and I celebrate the greatest gift life has ever given me: <strong className="font-semibold text-pink-700">you</strong>.
          </p>

          {/* Confetti Trigger Button */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                fireConfetti();
                fireHeartConfetti();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white rounded-full font-medium shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Celebrate More Confetti!</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('letter-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 hover:bg-pink-50 text-pink-700 border border-pink-200 rounded-full font-medium shadow-sm transition-all text-sm"
            >
              <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
              <span>Read Birthday Love Letter</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Photo Gallery Grid Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-pink-200/60 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 uppercase tracking-widest mb-1">
                <Camera className="w-3.5 h-3.5" />
                <span>Precious Memories</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-neutral-850 text-neutral-900">
                Moments Etched in My Heart
              </h2>
            </div>
            <p className="text-xs text-neutral-500 sm:text-right max-w-xs">
              Click any photo to view memory note, or replace with personal photos!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative bg-white p-3.5 rounded-2xl shadow-md hover:shadow-xl shadow-pink-200/40 border border-pink-100 transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Image Container with Polaroid feeling */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-pink-50">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-xs font-medium flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                      View Special Memory
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-semibold text-pink-700 shadow-xs">
                    {photo.date}
                  </div>
                </div>

                {/* Details */}
                <div className="pt-3 px-1 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-romantic font-bold text-neutral-900 text-base group-hover:text-pink-600 transition-colors">
                      {photo.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>

                  {/* Upload Replacement Action (prevent trigger of modal) */}
                  <div className="pt-3 mt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-pink-600">
                    <span className="font-medium">Tap to view</span>
                    <label
                      htmlFor={`upload-${photo.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-pink-600 cursor-pointer transition-colors p-1"
                      title="Upload custom photo"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Custom Photo</span>
                      <input
                        id={`upload-${photo.id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(photo.id, e)}
                      />
                    </label>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Heartfelt Message Section */}
        <section id="letter-section" className="space-y-6 pt-4">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 uppercase tracking-widest">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>Straight From the Soul</span>
            </div>
            <h2 className="text-3xl font-serif-romantic font-bold text-neutral-900">
              A Heartfelt Birthday Tribute
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Choose a section below to explore the love, memories, and birthday wishes.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-pink-100/70 backdrop-blur-md rounded-2xl max-w-md mx-auto border border-pink-200/80">
            <button
              onClick={() => setActiveTab('letter')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'letter'
                  ? 'bg-white text-pink-700 shadow-sm'
                  : 'text-neutral-600 hover:text-pink-700'
              }`}
            >
              💌 Love Letter
            </button>
            <button
              onClick={() => setActiveTab('reasons')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'reasons'
                  ? 'bg-white text-pink-700 shadow-sm'
                  : 'text-neutral-600 hover:text-pink-700'
              }`}
            >
              💖 Why I Love You
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-white text-pink-700 shadow-sm'
                  : 'text-neutral-600 hover:text-pink-700'
              }`}
            >
              ⏳ Our Journey
            </button>
            <button
              onClick={() => setActiveTab('wish')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'wish'
                  ? 'bg-white text-pink-700 shadow-sm'
                  : 'text-neutral-600 hover:text-pink-700'
              }`}
            >
              🎂 Make a Wish
            </button>
          </div>

          {/* Tab 1: Love Letter */}
          {activeTab === 'letter' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto bg-[#fffdfa] rounded-3xl p-8 sm:p-12 shadow-xl shadow-pink-200/40 border border-amber-100 relative overflow-hidden"
            >
              {/* Decorative Wax Seal stamp */}
              <div className="absolute top-6 right-6 w-14 h-14 bg-gradient-to-tr from-rose-700 to-pink-600 rounded-full flex items-center justify-center shadow-lg border-2 border-rose-300 text-white select-none">
                <Heart className="w-6 h-6 fill-white" />
              </div>

              <div className="space-y-6 text-neutral-800 font-serif-romantic leading-relaxed text-base sm:text-lg">
                <div className="font-script text-3xl sm:text-4xl text-pink-700 font-bold">
                  My Dearest Love,
                </div>

                <p>
                  Words often fall short when I try to describe how much your presence illuminates my existence. When you entered my world, you didn’t just become a part of my life—you became my favorite chapter, my safest haven, and the reason I smile without even realizing it.
                </p>

                <p>
                  I love your curiosity, your gentle patience, and the brilliant fire in your spirit. Watching you pursue the things you care about with such quiet brilliance inspires me endlessly. You make even the simplest routines—quiet coffee mornings, late night conversations, and lazy walks—feel like poetry.
                </p>

                <p>
                  On this milestone birthday, my greatest prayer for you is boundless joy, peace of mind, fierce dreams realized, and all the love your magnificent heart can hold. Through every high and low, I promise to stand beside you, cheering the loudest for your happiness.
                </p>

                <p className="pt-4 font-script text-2xl sm:text-3xl text-pink-600">
                  Forever and unconditionally yours,<br />
                  <span className="text-xl sm:text-2xl text-neutral-700 font-sans font-medium">With all my love &bull; Always</span>
                </p>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Why I Love You */}
          {activeTab === 'reasons' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto"
            >
              {reasons.map((r) => (
                <div
                  key={r.id}
                  className="bg-white/95 rounded-2xl p-6 shadow-md border border-pink-100 hover:shadow-lg hover:border-pink-200 transition-all space-y-2.5"
                >
                  <div className="text-3xl">{r.icon}</div>
                  <h3 className="font-serif-romantic font-bold text-lg text-neutral-900">
                    {r.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tab 3: Timeline */}
          {activeTab === 'timeline' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start bg-white/90 p-5 rounded-2xl border border-pink-100 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 font-bold text-xs uppercase">
                    0{i + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
                      {m.period}
                    </span>
                    <h3 className="text-lg font-serif-romantic font-bold text-neutral-900 mt-0.5">
                      {m.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                      {m.text}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Tab 4: Interactive Wish & Birthday Cake */}
          {activeTab === 'wish' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl mx-auto bg-white/95 rounded-3xl p-8 sm:p-10 shadow-xl border border-pink-100 text-center space-y-6"
            >
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-pink-100 rounded-3xl flex items-center justify-center mx-auto shadow-inner text-5xl">
                  🎂
                </div>
                {!candlesBlown && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-amber-500 animate-bounce">
                    <Flame className="w-6 h-6 fill-amber-400 text-amber-500 animate-pulse" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-2xl font-serif-romantic font-bold text-neutral-900">
                  {candlesBlown ? '✨ Your Wish Has Been Captured!' : 'Make a Secret Birthday Wish'}
                </h3>
                <p className="text-neutral-600 text-sm mt-2 max-w-md mx-auto">
                  {candlesBlown
                    ? 'May every single dream you wished for today unfold into magical reality this coming year!'
                    : 'Close your eyes, breathe in, make the deepest wish in your heart, and blow out the candles.'}
                </p>
              </div>

              <div>
                {!candlesBlown ? (
                  <button
                    onClick={handleBlowCandles}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold rounded-2xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
                  >
                    <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
                    <span>Blow Out The Candles 💨</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCandlesBlown(false);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-pink-600 hover:text-pink-700 font-medium p-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Relight Candles to Wish Again</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </section>
      </div>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="max-h-[60vh] bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold text-pink-600 uppercase tracking-wider">
                  {selectedPhoto.date}
                </div>
                <h3 className="text-xl font-serif-romantic font-bold text-neutral-900 mt-1">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
