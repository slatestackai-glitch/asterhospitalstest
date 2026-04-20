import React from 'react';
import { MessageCircle, Save, Clock } from 'lucide-react';

const HandoffPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden w-full p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Aster x Engati WhatsApp</h3>
          <p className="text-sm text-gray-500">Continue this conversation on WhatsApp</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-3 p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-sm font-semibold text-emerald-800">WhatsApp sync active</p>
        </div>
        
        <div className="flex gap-3 mt-2">
          <div className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
            <Save className="w-5 h-5 text-gray-400 mb-2" />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
            <p className="text-xs font-bold text-gray-800">Progress Saved</p>
          </div>
          <div className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
            <Clock className="w-5 h-5 text-gray-400 mb-2" />
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Wait Time</p>
            <p className="text-xs font-bold text-gray-800">&lt; 2 Minutes</p>
          </div>
        </div>
      </div>

      <button className="w-full mt-6 py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
        <MessageCircle className="w-5 h-5" />
        Connect on WhatsApp
      </button>

      <button className="w-full mt-3 py-4 text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors">
        Maybe Later
      </button>
    </div>
  );
};

export default HandoffPanel;
