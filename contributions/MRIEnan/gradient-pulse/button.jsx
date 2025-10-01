'use client';

import { useState } from 'react';

export default function GradientPulseButton() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <button
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={`
          relative px-8 py-4 rounded-full font-bold text-white text-lg
          bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
          hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600
          transform transition-all duration-300 ease-out
          ${isPressed ? 'scale-95' : 'hover:scale-105'}
          shadow-2xl hover:shadow-purple-500/50
          border-2 border-white/20
          overflow-hidden
        `}
      >
        {/* Pulsing background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-pulse opacity-75 rounded-full" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-full">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded-full" />
        </div>
        
        {/* Button text */}
        <span className="relative z-10 drop-shadow-lg">
          Click Me!
        </span>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-bounce"
              style={{
                left: `${15 + i * 12}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${1.5 + i * 0.2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Ripple effect on press */}
        {isPressed && (
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
        )}
      </button>
    </div>
  );
}