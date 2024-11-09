import React from 'react';
import { industries } from '../data/industries';
import { Building2, Phone, Calendar, Shield, Scale, Clock, Zap, PieChart, MessageSquare } from 'lucide-react';

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <div className="mt-12 bg-gray-900 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Why Choose Our Virtual Collectors?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-4">
              <Scale className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h4 className="text-blue-500 font-semibold mb-2">Legal Expertise</h4>
              <p className="text-gray-400">Attorney-reviewed processes and compliance frameworks</p>
            </div>
            <div className="text-center p-4">
              <PieChart className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h4 className="text-blue-500 font-semibold mb-2">Advanced Analytics</h4>
              <p className="text-gray-400">Real-time insights and performance metrics</p>
            </div>
            <div className="text-center p-4">
              <MessageSquare className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h4 className="text-blue-500 font-semibold mb-2">Multi-Channel</h4>
              <p className="text-gray-400">SMS, email, voice, and chat collection capabilities</p>
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

          <div className="mt-12 text-center">
            <h4 className="text-xl font-semibold text-white mb-4">Ready to Transform Your Collections?</h4>
            <p className="text-gray-400 mb-6">
              Join leading companies using Clear Collect A<span className="text-blue-500">i</span> to revolutionize their debt recovery
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-8 rounded-lg transition-all transform hover:scale-105">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}