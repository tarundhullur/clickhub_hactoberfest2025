'use client';

import { useState } from 'react';
import { ButtonContribution } from '@/utils/buttonLoader';
import ButtonShowcase from './ButtonShowcase';

interface ExampleDrawerProps {
  examples: ButtonContribution[];
}

export default function ExampleDrawer({ examples }: ExampleDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Drawer Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-lg
            hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 font-medium text-sm
            ${isOpen ? 'transform rotate-45' : 'animate-pulse hover:animate-none'}
          `}
        >
          <div className="flex items-center gap-2">
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
              {isOpen ? '✕' : '📚'}
            </span>
            <span>{isOpen ? 'Close' : 'Examples'}</span>
          </div>
          
          {/* Pulse ring animation when closed */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 animate-ping opacity-20"></div>
          )}
        </button>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Content */}
      <div className={`
        fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-40 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-yellow-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  📚 Example Templates
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Get started with these example button designs
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {examples.map((example, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <ButtonShowcase contribution={example} />
                </div>
              ))}
            </div>
            
            {/* Getting Started Tips */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">🚀 Getting Started</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Copy code from these examples</li>
                <li>• Modify colors, animations, and styles</li>
                <li>• Create your own unique button design</li>
                <li>• Submit via GitHub for Hacktoberfest!</li>
              </ul>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <a
              href="https://github.com/MRIEnan/clickhub_hactoberfest2025"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              � Start Contributing
            </a>
          </div>
        </div>
      </div>
    </>
  );
}