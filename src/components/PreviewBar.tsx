import React from 'react';
import { RotateCcw, Monitor, Sparkles } from 'lucide-react';
import { useConversationStore } from '../state/useConversationStore';

interface PreviewBarProps {
  mode: 'normal' | 'ai';
  onModeChange: (mode: 'normal' | 'ai') => void;
}

const PreviewBar: React.FC<PreviewBarProps> = ({ mode, onModeChange }) => {
  const { reset } = useConversationStore();

  return (
    <div className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 relative z-50 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-aster-blue tracking-tight">Aster</span>
          <span className="text-aster-teal font-medium">Hospitals</span>
        </div>
        <div className="h-4 w-px bg-gray-200 mx-1" />
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
          Prototype Preview
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="bg-gray-100 p-1 rounded-xl flex items-center">
          <button
            onClick={() => onModeChange('normal')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'normal' 
                ? 'bg-white text-aster-blue shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Normal Experience
          </button>
          <button
            onClick={() => onModeChange('ai')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'ai' 
                ? 'bg-white text-aster-teal shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Native Vision
          </button>
        </div>

        {mode === 'ai' && (
          <button
            onClick={reset}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-aster-teal transition-colors px-3 py-1.5 hover:bg-aster-teal/5 rounded-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restart Journey
          </button>
        )}
      </div>
    </div>
  );
};

export default PreviewBar;
