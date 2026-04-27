import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ChevronRight, User } from 'lucide-react';
import { doctors, hospitals, type Doctor, type Hospital } from '../data/happyPath';

interface PromotionalCarouselProps {
  type: 'doctors' | 'hospitals';
}

const PromotionalCarousel: React.FC<PromotionalCarouselProps> = ({ type }) => {
  const items = type === 'doctors' ? doctors : hospitals;

  return (
    <div className="w-full overflow-hidden py-4 -mx-6 px-6">
      <motion.div 
        className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-[280px] bg-white rounded-3xl border border-gray-100 shadow-premium overflow-hidden snap-start hover:shadow-hover transition-all duration-300 group"
          >
            <div className="relative h-40 overflow-hidden">
              <img 
                src={type === 'doctors' ? (item as Doctor).photoUrl : (item as Hospital).imageUrl} 
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              {type === 'hospitals' && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold">{(item as Hospital).rating}</span>
                </div>
              )}
            </div>
            
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 group-hover:text-aster-teal transition-colors">
                {item.name}
              </h3>
              
              <div className="mt-2 space-y-1">
                {type === 'doctors' ? (
                  <>
                    <p className="text-xs text-aster-teal font-medium uppercase tracking-wider">
                      {(item as Doctor).specialty}
                    </p>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{(item as Doctor).hospital}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{(item as Hospital).location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(item as Hospital).specialties.slice(0, 2).map(s => (
                        <span key={s} className="px-2 py-0.5 bg-aster-teal/5 text-aster-teal text-[10px] font-semibold rounded-full uppercase">
                          {s}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <button className="mt-4 w-full py-2.5 bg-gray-50 hover:bg-aster-teal hover:text-white text-gray-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-gray-100 hover:border-aster-teal">
                {type === 'doctors' ? 'Book Appointment' : 'View Details'}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PromotionalCarousel;
