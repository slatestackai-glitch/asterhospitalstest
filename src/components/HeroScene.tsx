import React from 'react';
import { motion } from 'framer-motion';
import PromptComposer from './PromptComposer';
import IntentCardRail from './IntentCardRail';

const HeroScene: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Premium Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: 'url("/bg_lobby_new.png")' }}
      >
        <div className="absolute inset-0 bg-white/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/95" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl px-8 flex flex-col items-center text-center"
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-aster-blue mb-6 tracking-tight drop-shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          How can we care for you today?
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-800 font-medium max-w-2xl mb-12 leading-relaxed drop-shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          No long forms. No endless browsing. Tell us what you need and we’ll guide you to the right appointment.
        </motion.p>

        <div className="w-full max-w-3xl mb-12">
          <PromptComposer mode="landing" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full"
        >
          <p className="text-xs font-bold text-gray-600 mb-6 uppercase tracking-[0.25em] drop-shadow-sm">
            Or choose an intent to start
          </p>
          <IntentCardRail />
        </motion.div>

        <motion.p 
          className="mt-12 text-sm text-gray-500 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Start with a doctor, a speciality, a hospital, or simply what you need help with.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default HeroScene;
