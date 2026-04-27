import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversationStore } from '../state/useConversationStore';
import { happyPath } from '../data/happyPath';

const SuggestionDock: React.FC = () => {
  const { currentStepId, setComposerValue, sendMessage } = useConversationStore();

  const step = happyPath[currentStepId as keyof typeof happyPath];
  const suggestions = (step?.suggestions || []).slice(0, 3);

  if (suggestions.length === 0) return null;

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center max-w-2xl mx-auto px-4">
      <AnimatePresence mode="popLayout">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleSuggestionClick(suggestion)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-aster-teal hover:text-aster-teal hover:bg-aster-teal/5 transition-all shadow-sm whitespace-nowrap"
          >
            {suggestion}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SuggestionDock;
