/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { GateScreen } from './types';
import { Screen1Question } from './components/Screen1Question';
import { Screen2Otp } from './components/Screen2Otp';
import { Screen3BirthdayReveal } from './components/Screen3BirthdayReveal';
import { FloatingHearts } from './components/FloatingHearts';
import { AudioPlayer } from './components/AudioPlayer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<GateScreen>('question');

  return (
    <div className="relative min-h-screen bg-[#fdf2f8] selection:bg-pink-300 selection:text-pink-900 font-sans text-neutral-800 overflow-x-hidden">
      {/* Delicate floating background hearts */}
      <FloatingHearts />

      {/* Floating Audio Melodic Music Box */}
      <AudioPlayer />

      {/* Dynamic Screen View */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentScreen === 'question' && (
            <Screen1Question
              key="screen-question"
              onSuccess={() => setCurrentScreen('otp')}
            />
          )}

          {currentScreen === 'otp' && (
            <Screen2Otp
              key="screen-otp"
              onSuccess={() => setCurrentScreen('reveal')}
              onBack={() => setCurrentScreen('question')}
            />
          )}

          {currentScreen === 'reveal' && (
            <Screen3BirthdayReveal key="screen-reveal" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
