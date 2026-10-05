import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { KeyRound, CheckCircle2, AlertCircle, Unlock, ArrowLeft } from 'lucide-react';

interface Screen2OtpProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const Screen2Otp: React.FC<Screen2OtpProps> = ({ onSuccess, onBack }) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input box on render
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    // Only accept numeric inputs
    const numericChar = value.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = numericChar;
    setDigits(newDigits);
    setErrorMessage(null);

    // Auto-advance if character entered
    if (numericChar && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all 6 digits are filled, automatically submit
    const fullOtp = newDigits.join('');
    if (fullOtp.length === 6 && !newDigits.includes('')) {
      submitOtp(fullOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pastedData[i] || '';
    }
    setDigits(newDigits);

    // Focus last filled digit or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();

    if (pastedData.length === 6) {
      submitOtp(pastedData);
    }
  };

  const submitOtp = async (codeToSubmit?: string) => {
    const otpCode = codeToSubmit || digits.join('');
    if (otpCode.length !== 6) {
      setErrorMessage('Please enter all 6 digits of the OTP.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpCode }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSuccess();
      } else {
        setErrorMessage(data.message || 'Invalid OTP code. Please ask him.');
        // Clear digits on error for clean retry
        setDigits(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      console.error('Network error verifying OTP:', err);
      setErrorMessage('Unable to contact server. Please verify your connection.');
    } finally {
      setIsLoading(false);  
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitOtp();
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
          <KeyRound className="w-3.5 h-3.5 text-pink-500" />
          <span>Secret Gate &bull; Step 2 of 2</span>
        </div>

        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-400/25 mb-5 relative group">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>

        {/* Exact Display Text Required by Brief (NO phone number or name shown) */}
        <div className="bg-emerald-50/80 border border-emerald-200/70 rounded-2xl p-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-serif-romantic font-bold text-emerald-900 tracking-tight">
            Correct! Please ask for the OTP to unlock.
          </h2>
          <p className="text-emerald-700 text-xs mt-1.5">
            A single-use 6-digit passcode has been generated to unlock your surprise. for OTP ask him. 
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-neutral-600 mb-3">
              Enter 6-Digit Passcode
            </label>
            <div className="flex justify-between items-center gap-2 max-w-xs mx-auto">
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  disabled={isLoading}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={idx === 0 ? handlePaste : undefined}
                  className={`w-11 h-14 sm:w-12 sm:h-14 text-center text-2xl font-bold rounded-xl border transition-all duration-200 outline-none select-none ${
                    digit
                      ? 'border-pink-500 bg-pink-50/50 text-pink-700 shadow-sm'
                      : 'border-neutral-200 bg-neutral-50/70 text-neutral-800 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20'
                  }`}
                />
              ))}
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

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading || digits.join('').length !== 6}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/35 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.99]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Unlocking Surprise...</span>
                </div>
              ) : (
                <>
                  <Unlock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Unlock Birthday Website</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onBack}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-medium text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Secret Question</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
