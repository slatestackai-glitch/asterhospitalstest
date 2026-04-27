import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversationStore } from '../state/useConversationStore';
import { happyPath } from '../data/happyPath';

const SuggestionDock: React.FC = () => {
  const { currentStepId, sendMessage } = useConversationStore();

  const step = happyPath[currentStepId as keyof typeof happyPath];
  const suggestions = (step?.suggestions || []).slice(0, 3);

  if (suggestions.length === 0) return null;

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-start">
      <AnimatePresence>
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleSuggestionClick(suggestion)}
            className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl text-sm font-semibold text-gray-700 hover:border-aster-teal hover:text-aster-teal hover:bg-white transition-all shadow-premium hover:shadow-hover whitespace-nowrap cursor-pointer"
          >
            {suggestion}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SuggestionDock;
