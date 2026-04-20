import React, { useState } from 'react';
import { useConversationStore } from '../state/useConversationStore';
import { ChevronRight } from 'lucide-react';

const DATES = [
  { day: 'Tue', date: '21', month: 'Apr' },
  { day: 'Wed', date: '22', month: 'Apr' },
  { day: 'Thu', date: '23', month: 'Apr' },
  { day: 'Fri', date: '24', month: 'Apr' },
];

const SLOTS = [
  '09:00 AM', '10:30 AM', '11:30 AM', '01:30 PM', '02:30 PM', '04:00 PM'
];

const SlotModule: React.FC = () => {
  const { selectSlot, sendMessage } = useConversationStore();
  const [selectedDate, setSelectedDate] = useState('21');
  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  const handleConfirm = () => {
    if (activeSlot) {
      selectSlot(`${selectedDate} Apr, ${activeSlot}`);
      sendMessage(`I'll take the ${activeSlot} slot tomorrow.`);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm w-full">
      <div className="mb-6">
        <h4 className="text-sm font-bold text-gray-800 mb-4 px-1">Select Date</h4>
        <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {DATES.map((d) => (
            <button
              key={d.date}
              onClick={() => setSelectedDate(d.date)}
              className={`flex flex-col items-center min-w-[70px] py-4 rounded-2xl border transition-all ${
                selectedDate === d.date 
                  ? 'border-aster-teal bg-aster-teal text-white shadow-lg' 
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
              }`}
            >
              <span className="text-[10px] uppercase font-bold opacity-80">{d.day}</span>
              <span className="text-lg font-bold">{d.date}</span>
              <span className="text-[10px] uppercase font-bold opacity-80">{d.month}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-sm font-bold text-gray-800 mb-4 px-1">Available Slots</h4>
        <div className="grid grid-cols-3 gap-2">
          {SLOTS.map((slot) => (
            <button
              key={slot}
              onClick={() => setActiveSlot(slot)}
              className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                activeSlot === slot
                  ? 'border-aster-teal bg-aster-teal/5 text-aster-teal'
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!activeSlot}
        onClick={handleConfirm}
        className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
          activeSlot 
            ? 'bg-aster-blue text-white shadow-lg shadow-aster-blue/20 hover:opacity-95' 
            : 'bg-gray-100 text-gray-300'
        }`}
      >
        Confirm Slot
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SlotModule;
