import React, { useState } from 'react';
import PasswordGate from './PasswordGate';
import PreviewBar from './PreviewBar';
import HeroScene from './HeroScene';
import ConversationCanvas from './ConversationCanvas';
import { useConversationStore } from '../state/useConversationStore';
import { AnimatePresence, motion } from 'framer-motion';

const AppShell: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem('aster_unlocked') === 'true';
  });
  const [mode, setMode] = useState<'normal' | 'ai'>('ai');
  const { isFirstMessageSent } = useConversationStore();

  const handleUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem('aster_unlocked', 'true');
  };

  if (!isUnlocked) {
    return <PasswordGate onUnlock={handleUnlock} />;
  }

  return (
    <div className="flex flex-col h-screen bg-white text-aster-dark overflow-hidden">
      <PreviewBar 
        mode={mode} 
        onModeChange={setMode} 
      />
      
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {mode === 'normal' ? (
            <motion.div 
              key="normal-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <iframe 
                src="/index_normal.html" 
                className="w-full h-full border-none"
                title="Aster Hospitals Normal Experience"
              />
            </motion.div>
          ) : (
            <motion.div 
              key="ai-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative"
            >
              {/* AI Native Content */}
              <AnimatePresence>
                {!isFirstMessageSent ? (
                  <HeroScene key="hero" />
                ) : (
                  <ConversationCanvas key="canvas" />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AppShell;
