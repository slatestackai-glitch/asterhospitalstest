import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, UserSearch, Video, MapPin, Sparkles } from 'lucide-react';
import { useConversationStore } from '../state/useConversationStore';

const INTENTS = [
  {
    id: 'book',
    title: 'Book appointment',
    description: 'Quick scheduling',
    icon: Calendar,
    color: 'bg-blue-50 text-blue-600',
    sentence: 'I want to book an appointment.'
  },
  {
    id: 'doctor',
    title: 'Find a doctor',
    description: 'Expert specialists',
    icon: UserSearch,
    color: 'bg-teal-50 text-teal-600',
    sentence: 'Help me find the right doctor.'
  },
  {
    id: 'online',
    title: 'Online consultation',
    description: 'Video call visit',
    icon: Video,
    color: 'bg-purple-50 text-purple-600',
    sentence: 'I need an online consultation.'
  },
  {
    id: 'hospital',
    title: 'Nearest hospital',
    description: 'Find emergency care',
    icon: MapPin,
    color: 'bg-orange-50 text-orange-600',
    sentence: 'Show me the nearest hospital.'
  },
  {
    id: 'choose',
    title: 'Help me choose',
    description: 'AI guidance',
    icon: Sparkles,
    color: 'bg-emerald-50 text-emerald-600',
    sentence: 'I need help choosing the right specialist.'
  }
];

const IntentCardRail: React.FC = () => {
  const { sendMessage } = useConversationStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
      {INTENTS.map((intent, index) => (
        <motion.button
          key={intent.id}
          whileHover={{ y: -5, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          onClick={() => sendMessage(intent.sentence)}
          className="flex flex-col items-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-premium transition-all text-center group"
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${intent.color}`}>
            <intent.icon className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-sm text-gray-800 mb-1">{intent.title}</h3>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold group-hover:text-aster-teal transition-colors">
            {intent.description}
          </p>
        </motion.button>
      ))}
    </div>
  );
};

export default IntentCardRail;
