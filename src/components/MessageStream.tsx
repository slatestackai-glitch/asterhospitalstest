import React from 'react';
import { motion } from 'framer-motion';
import { useConversationStore } from '../state/useConversationStore';
import RecommendationModule from './RecommendationModule';
import SlotModule from './SlotModule';
import ConfirmationModule from './ConfirmationModule';
import HandoffPanel from './HandoffPanel';

const MessageStream: React.FC = () => {
  const { messages } = useConversationStore();

  return (
    <div className="flex flex-col gap-8">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex flex-col gap-3 max-w-[85%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div 
              className={`px-6 py-4 rounded-3xl text-base leading-relaxed ${
                message.role === 'user' 
                  ? 'bg-aster-blue text-white shadow-md' 
                  : 'bg-white border border-gray-100 text-gray-800 shadow-sm'
              }`}
            >
              {message.content}
            </div>

            {/* Specialized Modules */}
            {message.type === 'specialty' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full mt-2"
              >
                <RecommendationModule data={message.data} />
              </motion.div>
            )}

            {message.type === 'slots' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full mt-2"
              >
                <SlotModule />
              </motion.div>
            )}

            {message.type === 'confirmation' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full mt-2"
              >
                <ConfirmationModule />
              </motion.div>
            )}

            {message.type === 'whatsapp' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full mt-2"
              >
                <HandoffPanel />
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MessageStream;
