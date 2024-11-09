import React, { useState } from 'react';
import { Download, Phone, Users, Clock, CreditCard, Shield, Zap, FileText, ChevronDown, MessageSquare, ArrowUpRight, Building2, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

const BillingPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const plans = [
    {
      name: 'Starter',
      price: 299,
      features: [
        '5,000 minutes/month',
        'Basic compliance rules',
        'Email support',
        'Standard reporting',
      ],
    },
    {
      name: 'Professional',
      price: 499,
      features: [
        '10,000 minutes/month',
        'Advanced compliance rules',
        'Priority email support',
        'Advanced analytics',
        'Custom payment portal',
        'Dedicated Slack/Discord channel',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 999,
      features: [
        '25,000 minutes/month',
        'Custom compliance rules',
        '24/7 priority support',
        'Custom analytics',
        'White-labeled payment portal',
        'Dedicated Slack/Discord channel',
        'Custom AI training',
      ],
    },
  ];

  const thirdPartyBenefits = [
    {
      title: "Vetted Network",
      description: "Access to our network of pre-screened, compliant collection agencies",
      icon: Building2
    },
    {
      title: "Seamless Transition",
      description: "Automated handoff of accounts with complete history and documentation",
      icon: ArrowUpRight
    },
    {
      title: "Performance Monitoring",
      description: "Continuous oversight and performance tracking of assigned agencies",
      icon: CheckCircle2
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Billing & Subscription</h2>

      {/* Subscription Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-gray-800/50 rounded-xl p-6 border ${
              plan.popular
                ? 'border-blue-500 ring-2 ring-blue-500/20'
                : 'border-gray-700'
            }`}
          >
            {plan.popular && (
              <div className="text-blue-500 text-sm font-medium mb-2">Most Popular</div>
            )}
            <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold text-white">${plan.price}</span>
              <span className="text-gray-400 ml-2">/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-300">
                  <Shield className="h-5 w-5 text-blue-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedPlan(plan.name)}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              {selectedPlan === plan.name ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Additional Minutes */}
      <div className="bg-gray-800/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Additional Minutes</h3>
        <p className="text-gray-400 mb-4">
          Need more minutes? Purchase additional minutes at any time.
          Minutes never expire and roll over month to month.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
            <div className="text-lg font-semibold text-white mb-1">5,000 Minutes</div>
            <div className="text-2xl font-bold text-white mb-2">$399</div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">
              Purchase
            </button>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
            <div className="text-lg font-semibold text-white mb-1">10,000 Minutes</div>
            <div className="text-2xl font-bold text-white mb-2">$749</div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">
              Purchase
            </button>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
            <div className="text-lg font-semibold text-white mb-1">25,000 Minutes</div>
            <div className="text-2xl font-bold text-white mb-2">$1,749</div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">
              Purchase
            </button>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-gray-800/50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Invoice History</h3>
          <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-3 text-gray-400 font-medium">Date</th>
                <th className="pb-3 text-gray-400 font-medium">Description</th>
                <th className="pb-3 text-gray-400 font-medium">Amount</th>
                <th className="pb-3 text-gray-400 font-medium">Status</th>
                <th className="pb-3 text-gray-400 font-medium">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="hover:bg-gray-700/30">
                <td className="py-3">
                  <div className="text-white">Mar 15, 2024</div>
                  <div className="text-sm text-gray-400">3:45 PM</div>
                </td>
                <td className="py-3">
                  <div className="text-white">Professional Plan - Monthly</div>
                  <div className="text-sm text-gray-400">Subscription Renewal</div>
                </td>
                <td className="py-3">
                  <div className="text-white">$499.00</div>
                </td>
                <td className="py-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                    Paid
                  </span>
                </td>
                <td className="py-3">
                  <button className="flex items-center text-blue-400 hover:text-blue-300">
                    <FileText className="h-4 w-4 mr-1" />
                    PDF
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center">
          <button className="flex items-center text-gray-400 hover:text-white">
            <span className="mr-2">Load More</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Third Party Collection Upgrade */}
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg p-8 border border-blue-500/20">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Upgrade to Third Party Collections
            </h3>
            <p className="text-gray-300 max-w-2xl">
              Seamlessly transition challenging accounts to our vetted network of third-party collection agencies. 
              Maintain control while leveraging specialized expertise for maximum recovery.
            </p>
          </div>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
          >
            Upgrade Now
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {thirdPartyBenefits.map((benefit) => (
            <div key={benefit.title} className="bg-gray-800/50 rounded-lg p-6">
              <benefit.icon className="h-8 w-8 text-blue-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-500/10 rounded-lg">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-400">Smart Collection Strategy</h4>
              <p className="text-sm text-gray-400 mt-1">
                Our system automatically identifies accounts that would benefit from third-party collection 
                based on payment history, communication patterns, and recovery likelihood.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Third Party Collection Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full m-4">
            <h3 className="text-2xl font-bold text-white mb-4">
              Upgrade to Third Party Collections
            </h3>
            <p className="text-gray-300 mb-6">
              Get instant access to our network of vetted collection agencies. Our smart system will 
              automatically identify and transfer accounts that would benefit from specialized collection efforts.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center p-4 bg-gray-900/50 rounded-lg">
                <Shield className="h-6 w-6 text-blue-400 mr-4" />
                <div>
                  <h4 className="text-white font-medium">Compliance Guaranteed</h4>
                  <p className="text-gray-400 text-sm">All agencies are pre-screened and continuously monitored</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-900/50 rounded-lg">
                <ArrowUpRight className="h-6 w-6 text-blue-400 mr-4" />
                <div>
                  <h4 className="text-white font-medium">Smart Transfer</h4>
                  <p className="text-gray-400 text-sm">AI-powered account analysis for optimal timing</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-900/50 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-400 mr-4" />
                <div>
                  <h4 className="text-white font-medium">Agency Network</h4>
                  <p className="text-gray-400 text-sm">Access to specialized collectors across industries</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="px-6 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle upgrade
                  setShowUpgradeModal(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPage;