import React, { useMemo } from 'react';

export const FloatingHearts: React.FC = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 16) + 12, // 12px to 28px
      left: Math.floor(Math.random() * 96) + 2,   // 2% to 98%
      duration: Math.floor(Math.random() * 8) + 9, // 9s to 17s
      delay: (Math.random() * 6).toFixed(1),
      opacity: (Math.random() * 0.35 + 0.15).toFixed(2),
      char: ['💖', '🌸', '✨', '💕', '🌷', '🤍'][i % 6],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute select-none will-change-transform"
          style={{
            left: `${h.left}%`,
            bottom: '-40px',
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `floatUp ${h.duration}s linear infinite`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.char}
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
