import React from 'react';
import { Collector } from '../types/collector';
import { Briefcase, TrendingUp } from 'lucide-react';

interface CollectorCardProps {
  collector: Collector;
  onHire: (collector: Collector) => void;
}

const CollectorCard: React.FC<CollectorCardProps> = ({ collector, onHire }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="relative h-48 bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
        <img
          src={collector.avatar}
          alt={collector.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{collector.name}</h3>
        <p className="text-gray-400 mb-4">{collector.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-300">
            <Briefcase className="h-5 w-5 text-blue-500 mr-2" />
            <span>Specialty: {collector.specialty}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
            <span>${collector.hourlyRate}/hour</span>
          </div>
        </div>

        <button
          onClick={() => onHire(collector)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Hire {collector.name}
        </button>
      </div>
    </div>
  );
};

export default CollectorCard;