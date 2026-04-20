import React from 'react';
import { motion } from 'framer-motion';
import { specialties, doctors } from '../data/happyPath';
import DoctorCard from './DoctorCard';
import { Sparkles } from 'lucide-react';

interface RecommendationModuleProps {
  data: { id: string };
}

const RecommendationModule: React.FC<RecommendationModuleProps> = ({ data }) => {
  const specialty = specialties.find(s => s.id === data.id);
  const relevantDoctors = doctors.filter(d => d.specialty.toLowerCase().includes(specialty?.name.toLowerCase() || ''));

  return (
    <div className="space-y-6 w-full">
      {specialty && (
        <div className="bg-gradient-to-r from-aster-teal to-aster-blue rounded-3xl p-6 text-white shadow-lg overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Sparkles size={120} />
          </div>
          <div className="relative z-10">
            <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Recommended Specialty</div>
            <h3 className="text-2xl font-bold mb-2">{specialty.name}</h3>
            <p className="text-sm opacity-90 max-w-sm leading-relaxed">{specialty.description}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 px-2">Top Specialists available</h4>
        <div className="flex flex-col gap-4">
          {relevantDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DoctorCard doctor={doctor} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationModule;
