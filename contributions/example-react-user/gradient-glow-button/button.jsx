'use client';

import { useState } from 'react';

export default function GradientGlowButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative px-8 py-4 font-semibold text-white rounded-lg
        bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
        hover:from-purple-600 hover:via-pink-600 hover:to-red-600
        focus:outline-none focus:ring-4 focus:ring-purple-300
        transform transition-all duration-200 ease-in-out
        hover:scale-105 hover:shadow-2xl
        ${isClicked ? 'scale-95' : ''}
        before:absolute before:inset-0 before:rounded-lg
        before:bg-gradient-to-r before:from-purple-500 before:via-pink-500 before:to-red-500
        before:blur-lg before:opacity-0 before:transition-opacity
        hover:before:opacity-75 before:-z-10
      `}
    >
      Click Me!
    </button>
  );
}