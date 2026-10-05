import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Lock, Sparkles, AlertCircle, ArrowRight, Lightbulb } from 'lucide-react';

interface Screen1QuestionProps {
  onSuccess: () => void;
}

export const Screen1Question: React.FC<Screen1QuestionProps> = ({ onSuccess }) => {
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) {
      setErrorMessage('Please enter an answer, sweetheart!');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/verify-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: answer.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSuccess();
      } else {
        setErrorMessage(data.message || 'Incorrect answer. Try again, my love!');
      }
    } catch (err) {
      console.error('Network error verifying question:', err);
      setErrorMessage('Unable to reach server. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: -15 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-pink-200/60 border border-pink-100 text-center relative overflow-hidden"
      >
        {/* Decorative Top Accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-rose-200/50 rounded-full blur-2xl pointer-events-none" />

        {/* Step Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 border border-pink-200/70 rounded-full text-xs font-semibold text-pink-600 mb-6 tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Secret Gate &bull; Step 1 of 2</span>
        </div>

        {/* Locket Icon */}
        <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-400/30 mb-5 relative group">
          <Lock className="w-9 h-9 text-white group-hover:scale-105 transition-transform" />
          <div className="absolute -bottom-1.5 -right-1.5 bg-white p-1 rounded-full shadow">
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-serif-romantic font-bold text-neutral-850 text-neutral-800 tracking-tight">
          A Romantic Surprise Awaits
        </h1>
        <p className="text-neutral-500 text-sm mt-2 mb-6">
          To reveal something specially created for you, please answer the intimate riddle below.
        </p>

        {/* The Exact Question Requirement */}
        <div className="bg-pink-50/80 border border-pink-200/60 rounded-2xl p-4 mb-6 shadow-inner">
          <div className="text-xs font-semibold text-pink-500 uppercase tracking-wider mb-1">Security Question</div>
          <div className="text-lg font-bold text-neutral-800 font-serif-romantic">
            Question: what is my hobby?
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label htmlFor="hobby-answer" className="block text-xs font-semibold text-neutral-600 mb-1.5 ml-1">
              Your Answer
            </label>
            <div className="relative">
              <input
                id="hobby-answer"
                type="text"
                autoFocus
                disabled={isLoading}
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="Type the answer here..."
                className="w-full px-4 py-3.5 rounded-xl border border-pink-200 bg-neutral-50/50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500 transition-all font-medium text-base shadow-xs"
              />
            </div>
          </div>

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs text-left"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading || !answer.trim()}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/35 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.99]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Checking &amp; Sending OTP...</span>
              </div>
            ) : (
              <>
                <span>Verify Answer</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Gentle Clue / Hint Drawer */}
        <div className="mt-6 pt-4 border-t border-neutral-100">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-pink-600 hover:text-pink-700 font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{showHint ? 'Hide Hint' : 'Need a little hint?'}</span>
          </button>

          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2.5 p-3 bg-pink-50/70 border border-pink-200/50 rounded-xl text-xs text-neutral-600 italic"
            >
              💡 Think of a timeless 64-square battlefield with knights, rooks, queens, and a king in check!
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
