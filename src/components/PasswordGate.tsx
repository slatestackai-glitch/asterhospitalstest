import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface PasswordGateProps {
  onUnlock: () => void;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'aster2026') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-aster-light flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-premium p-10 text-center"
      >
        <div className="w-16 h-16 bg-aster-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-aster-teal" />
        </div>
        
        <h1 className="text-2xl font-semibold mb-2">Aster Hospitals</h1>
        <p className="text-gray-500 mb-8">Prototype Preview. Enter password to access.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input 
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-6 py-4 bg-gray-50 rounded-xl border transition-all outline-none focus:ring-2 focus:ring-aster-teal/20 ${
                error ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-aster-teal'
              }`}
            />
            {error && (
              <p className="absolute -bottom-6 left-0 text-xs text-red-500 font-medium">
                Incorrect password. Please try again.
              </p>
            )}
          </div>
          
          <button 
            type="submit"
            className="w-full h-14 bg-aster-teal text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-aster-teal/20"
          >
            Access Prototype
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        
        <p className="mt-8 text-sm text-gray-400">
          Internal Use Only &bull; 2026 Aster Concierge
        </p>
      </motion.div>
    </div>
  );
};

export default PasswordGate;
