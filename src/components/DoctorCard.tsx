import React from 'react';
import { type Doctor } from '../data/happyPath';
import { useConversationStore } from '../state/useConversationStore';
import { Calendar, MapPin, Star, ArrowRight } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const { selectDoctor, sendMessage } = useConversationStore();

  const handleSelect = () => {
    selectDoctor(doctor);
    sendMessage(`I'd like to book with ${doctor.name}.`);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 flex gap-5 hover:shadow-premium transition-all group">
      <div className="relative shrink-0">
        <img 
          src={doctor.photoUrl} 
          alt={doctor.name} 
          className="w-24 h-24 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
        />
        <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 fill-white" />
          4.9
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h4 className="font-bold text-gray-900 text-lg group-hover:text-aster-teal transition-colors">{doctor.name}</h4>
            <p className="text-aster-teal text-sm font-medium">{doctor.specialty}</p>
          </div>
        </div>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <MapPin className="w-3.5 h-3.5" />
            {doctor.hospital}
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Calendar className="w-3.5 h-3.5" />
            Next available: <span className="text-gray-900 font-semibold">{doctor.nextAvailable}</span>
          </div>
        </div>

        <button 
          onClick={handleSelect}
          className="mt-auto bg-gray-50 text-aster-blue py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-aster-blue hover:text-white transition-all group/btn"
        >
          Select Doctor
          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
