'use client';

import { useState } from 'react';

export default function MoonSunToggle() {
  const [isDay, setIsDay] = useState(false);

  const toggleMode = () => {
    setIsDay(!isDay);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggleMode}
        className={`
          relative overflow-hidden rounded-full p-1 transition-all duration-500 ease-in-out
          ${isDay 
            ? 'bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 shadow-lg shadow-orange-300/50' 
            : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 shadow-lg shadow-indigo-400/50'
          }
          hover:scale-105 active:scale-95 w-20 h-10
        `}
        aria-label={isDay ? 'Switch to night mode' : 'Switch to day mode'}
      >
        {/* Background sliding panel */}
        <div
          className={`
            absolute inset-1 rounded-full transition-all duration-500 ease-in-out
            ${isDay 
              ? 'bg-white shadow-inner translate-x-9' 
              : 'bg-gray-800 shadow-inner translate-x-0'
            }
          `}
        />
        
        {/* Moon Icon */}
        <div
          className={`
            absolute left-2 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out
            ${isDay ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'}
          `}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="#f1c40f"
              className="drop-shadow-sm"
            />
          </svg>
        </div>

        {/* Sun Icon */}
        <div
          className={`
            absolute right-2 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out
            ${isDay ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'}
          `}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="4" fill="#f39c12" />
            <path
              d="m12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
              stroke="#f39c12"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 h-1 rounded-full transition-all duration-1000 ease-in-out
                ${isDay 
                  ? 'bg-yellow-200 animate-bounce' 
                  : 'bg-blue-200 animate-pulse'
                }
              `}
              style={{
                left: `${20 + i * 25}%`,
                top: `${30 + i * 15}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${1 + i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </button>

      {/* Status text */}
      <span
        className={`
          ml-3 text-sm font-medium transition-all duration-300
          ${isDay ? 'text-orange-600' : 'text-indigo-600'}
        `}
      >
        {isDay ? '☀️ Day Mode' : '🌙 Night Mode'}
      </span>
    </div>
  );
}