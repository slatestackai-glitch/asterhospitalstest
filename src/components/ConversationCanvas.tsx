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
    <div className="flex flex-col h-full bg-aster-light/30 relative">
      <div className="flex-1 overflow-y-auto pt-10 pb-40">
        <div className="max-w-[760px] mx-auto px-6 flex flex-col gap-8">
          <MessageStream />
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 pt-0 bg-gradient-to-t from-aster-light via-aster-light/95 to-transparent pointer-events-none">
        <div className="max-w-[760px] mx-auto w-full pointer-events-auto">
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
