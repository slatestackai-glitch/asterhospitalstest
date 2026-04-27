import React, { useEffect, useRef } from 'react';
import MessageStream from './MessageStream';
import SuggestionDock from './SuggestionDock';
import PromptComposer from './PromptComposer';
import { useConversationStore } from '../state/useConversationStore';

const ConversationCanvas: React.FC = () => {
  const { messages } = useConversationStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-aster-light/30 overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-[760px] mx-auto px-6 pt-10 pb-10 flex flex-col gap-8">
          <MessageStream />
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      {/* Input & Suggestions Area (Fixed at bottom) */}
      <div className="bg-gradient-to-t from-aster-light via-aster-light to-transparent pt-8 pb-8 px-8">
        <div className="max-w-[760px] mx-auto w-full">
          <SuggestionDock />
          <div className="mt-4">
            <PromptComposer mode="conversation" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationCanvas;
