import React from 'react';
import { Building2, Phone, Calendar, Shield, Scale, Clock, Zap, PieChart, MessageSquare, CreditCard } from 'lucide-react';
import { industries } from '../data/industries';

export default function IndustriesSection() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Industry-Specific Virtual Collectors
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Our A<span className="text-blue-500">i</span> collectors are specifically trained for your industry, combining deep sector knowledge
            with advanced debt recovery techniques to maximize results while maintaining compliance.
          </p>
        </div>

        {/* Direct Payment Processing Section */}
        <div className="mt-16 bg-blue-600/10 rounded-2xl p-8 border border-blue-500/20">
          <div className="flex items-center justify-center mb-6">
            <CreditCard className="h-12 w-12 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            Direct Payment Processing
          </h3>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-6">
            Unlike traditional collection agencies, all payments are processed directly through your own payment processor. 
            No commissions, no middleman - 100% of payments go straight to your business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-blue-500 font-semibold mb-2">Your Processor</div>
              <p className="text-gray-400 text-sm">Use your existing payment processor or choose from our supported integrations</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-blue-500 font-semibold mb-2">Direct Deposits</div>
              <p className="text-gray-400 text-sm">All payments go directly to your merchant account</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4 text-center">
              <div className="text-blue-500 font-semibold mb-2">No Commission</div>
              <p className="text-gray-400 text-sm">Keep 100% of collected payments - only pay for A<span className="text-blue-500">i</span> agent time</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {industries.map((industry) => (
            <div key={industry.category} className="bg-gray-900 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <Building2 className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-semibold text-white">{industry.category}</h3>
              </div>
              <ul className="space-y-2">
                {industry.sectors.map((sector) => (
                  <li key={sector} className="text-gray-400 hover:text-blue-400 transition-colors">
                    • {sector}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-16">
          <div className="text-center p-4">
            <Shield className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h4 className="text-blue-500 font-semibold mb-2">Compliance Guaranteed</h4>
            <p className="text-gray-400">100% FDCPA & TCPA compliant with real-time monitoring and updates</p>
          </div>
          <div className="text-center p-4">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h4 className="text-blue-500 font-semibold mb-2">24/7 Operation</h4>
            <p className="text-gray-400">Continuous collection efforts without breaks or downtime</p>
          </div>
          <div className="text-center p-4">
            <Zap className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h4 className="text-blue-500 font-semibold mb-2">Instant Deployment</h4>
            <p className="text-gray-400">Start collecting within minutes of setup</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
            <Calendar className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-white mb-3">Schedule a Demo</h4>
            <p className="text-gray-400 mb-4">See our Ai collectors in action with a personalized demo</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Book Demo
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
            <Phone className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-white mb-3">Contact Sales</h4>
            <p className="text-gray-400 mb-4">Learn how we can help improve your collection rates</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}