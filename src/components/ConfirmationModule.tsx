import React from 'react';
import { useConversationStore } from '../state/useConversationStore';
import { CheckCircle2, User, MapPin, Calendar, Stethoscope, Clock } from 'lucide-react';

const ConfirmationModule: React.FC = () => {
  const { selectedDoctor, selectedSlot } = useConversationStore();

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden w-full">
      <div className="bg-emerald-500 p-6 flex flex-col items-center justify-center text-white">
        <CheckCircle2 className="w-12 h-12 mb-3" />
        <h3 className="text-xl font-bold">Appointment Confirmed</h3>
        <p className="text-emerald-50 opacity-90 text-sm">Booking ID: AST-2026-9842</p>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex items-start gap-4 pb-6 border-b border-gray-50">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-aster-blue" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Doctor</p>
            <p className="text-lg font-bold text-gray-900">{selectedDoctor?.name || 'Dr. Sarah Varghese'}</p>
            <p className="text-sm font-medium text-aster-teal">{selectedDoctor?.specialty || 'Dermatologist'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Calendar className="w-5 h-5 text-gray-300 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</p>
                <p className="text-sm font-bold text-gray-800">{selectedSlot?.split(',')[0].trim() || '21 Apr 2026'}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-gray-300 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Time</p>
                <p className="text-sm font-bold text-gray-800">{selectedSlot?.split(',')[1].trim() || '11:30 AM'}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Stethoscope className="w-5 h-5 text-gray-300 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mode</p>
                <p className="text-sm font-bold text-gray-800">In-person Visit</p>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-gray-300 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                <p className="text-sm font-bold text-gray-800">Aster CMI, Bangalore</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-aster-light rounded-2xl p-5 mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Patient Summary</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">Concerns: Skin or Hair</p>
            <p className="text-sm font-medium text-gray-700">Priority: General Consultation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModule;
