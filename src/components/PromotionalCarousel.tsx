import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ChevronRight, Bookmark, ShieldCheck, Clock } from 'lucide-react';
import { doctors, hospitals, type Doctor, type Hospital } from '../data/happyPath';

interface PromotionalCarouselProps {
  type: 'doctors' | 'hospitals';
}

const PromotionalCarousel: React.FC<PromotionalCarouselProps> = ({ type }) => {
  const items = type === 'doctors' ? doctors : hospitals;

  return (
    <div className="w-full overflow-hidden py-4 -mx-6 px-6">
      <motion.div 
        className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory px-2"
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
            className="flex-shrink-0 w-[300px] bg-white rounded-[32px] border border-gray-100 shadow-premium overflow-hidden snap-start hover:shadow-hover transition-all duration-500 group relative"
          >
            {/* Top Bar Badges */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3 h-3 text-aster-teal" />
                <span className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">Verified</span>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 z-10">
              <button className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-aster-teal transition-colors shadow-sm">
                <Bookmark className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Image Section */}
            <div className="relative h-44 overflow-hidden">
              <img 
                src={type === 'doctors' ? (item as Doctor).photoUrl : (item as Hospital).imageUrl} 
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60" />
              
              {/* Rating/Status Badge bottom-left of image */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="bg-aster-teal px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                  <Star className="w-3 h-3 text-white fill-white" />
                  <span className="text-[11px] font-bold text-white leading-none">
                    {type === 'doctors' ? '4.9' : (item as Hospital).rating}
                  </span>
                </div>
                {type === 'doctors' && (
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 px-2 py-1 rounded-lg">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Top Rated</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-aster-teal transition-colors leading-tight mb-1">
                  {item.name}
                </h3>
                {type === 'doctors' ? (
                  <p className="text-xs text-aster-teal font-bold uppercase tracking-[0.1em]">
                    {(item as Doctor).specialty}
                  </p>
                ) : (
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="text-xs font-medium truncate">{(item as Hospital).location}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4 mb-6">
                {type === 'doctors' ? (
                  <div className="bg-gray-50 rounded-2xl p-3 flex items-center justify-between border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-aster-teal" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">Next Slots</p>
                        <p className="text-xs text-gray-700 font-semibold leading-none">{(item as Doctor).nextAvailable}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {(item as Hospital).specialties.map(s => (
                      <span key={s} className="px-3 py-1 bg-aster-teal/5 text-aster-teal text-[10px] font-bold rounded-lg border border-aster-teal/10 uppercase tracking-tighter">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-2xl text-[11px] font-bold transition-all border border-gray-100 flex items-center justify-center gap-1.5">
                  Know More
                </button>
                <button className="py-3 bg-aster-teal text-white hover:bg-aster-blue rounded-2xl text-[11px] font-bold transition-all shadow-lg shadow-aster-teal/20 flex items-center justify-center gap-1.5">
                  {type === 'doctors' ? 'Book Now' : 'Visit Site'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {/* View More Card */}
        <motion.div 
          className="flex-shrink-0 w-[100px] flex items-center justify-center group cursor-pointer"
        >
          <div className="h-14 w-14 rounded-full bg-white border border-gray-100 shadow-premium flex items-center justify-center text-aster-teal group-hover:bg-aster-teal group-hover:text-white transition-all duration-300">
            <ChevronRight className="w-6 h-6" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PromotionalCarousel;
