import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';
import { useConversationStore } from '../state/useConversationStore';

const ROTATING_PROMPTS = [
  "I want to book an appointment",
  "Help me find the right doctor",
  "I need an online consultation",
  "I’m not sure which specialist I need",
  "Show me the nearest hospital"
];

interface PromptComposerProps {
  mode: 'landing' | 'conversation';
}

const PromptComposer: React.FC<PromptComposerProps> = ({ mode }) => {
  const { composerValue, setComposerValue, sendMessage } = useConversationStore();
  const [rotatingIndex, setRotatingIndex] = useState(0);

  // Landing mode: Subtle prompt cycling
  useEffect(() => {
    if (mode === 'conversation') return;

    const interval = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % ROTATING_PROMPTS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [mode]);

  const handleSend = () => {
    const textToSend = mode === 'landing' ? ROTATING_PROMPTS[rotatingIndex] : composerValue;
    if (textToSend.trim()) {
      sendMessage(textToSend);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={`relative w-full max-w-3xl mx-auto transition-all duration-500 ${mode === 'landing' ? 'translate-y-0' : 'translate-y-0'}`}>
      <div className="relative flex items-center bg-white rounded-2xl shadow-premium border border-gray-100 overflow-hidden p-2 group focus-within:ring-2 focus-within:ring-aster-teal/20 focus-within:border-aster-teal transition-all">
        <div className="flex-1 px-4 py-3 min-h-[56px] flex items-center relative overflow-hidden">
          {mode === 'landing' ? (
            <div className="flex items-center text-lg text-gray-800 font-medium w-full h-full">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute left-4"
                >
                  {ROTATING_PROMPTS[rotatingIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          ) : (
            <input 
              autoFocus
              type="text"
              value={composerValue}
              onChange={(e) => setComposerValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-lg text-gray-800 font-medium placeholder:text-gray-300"
              placeholder="Tell us what you need..."
            />
          )}
        </div>

        <button 
          onClick={handleSend}
          disabled={mode === 'conversation' && !composerValue.trim()}
          className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all ${
            (mode === 'landing' || composerValue.trim()) 
              ? 'bg-aster-teal text-white shadow-lg shadow-aster-teal/20 scale-100' 
              : 'bg-gray-100 text-gray-300 scale-95'
          }`}
        >
          {mode === 'landing' ? <ArrowRight className="w-5 h-5" /> : <Send className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Subtle landing helper */}
      {mode === 'landing' && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full text-center">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-gray-200" />
            AI-Powered Personalized Care
            <span className="w-8 h-px bg-gray-200" />
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptComposer;
