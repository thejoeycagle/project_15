import React, { useState } from 'react';
import { Mail, Save, AlertCircle, Check, RefreshCw } from 'lucide-react';

interface TemplateVariable {
  name: string;
  description: string;
  example: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: TemplateVariable[];
}

const defaultTemplates: EmailTemplate[] = [
  {
    id: 'payment-reminder',
    name: 'Payment Reminder',
    subject: 'Payment Reminder for Account {{accountNumber}}',
    body: 'Dear {{debtorName}},\n\nThis is a reminder that your payment of {{amount}} is due on {{dueDate}}.\n\nPlease contact us if you have any questions.\n\nBest regards,\n{{companyName}}',
    variables: [
      { name: 'accountNumber', description: 'Account number', example: 'ACC-12345' },
      { name: 'debtorName', description: 'Debtor name', example: 'John Doe' },
      { name: 'amount', description: 'Amount due', example: '$1,000.00' },
      { name: 'dueDate', description: 'Due date', example: 'March 31, 2024' },
      { name: 'companyName', description: 'Company name', example: 'ABC Collections' }
    ]
  },
  {
    id: 'payment-confirmation',
    name: 'Payment Confirmation',
    subject: 'Payment Confirmation - {{accountNumber}}',
    body: 'Dear {{debtorName}},\n\nThank you for your payment of {{amount}} received on {{paymentDate}}.\n\nYour current balance is {{remainingBalance}}.\n\nBest regards,\n{{companyName}}',
    variables: [
      { name: 'accountNumber', description: 'Account number', example: 'ACC-12345' },
      { name: 'debtorName', description: 'Debtor name', example: 'John Doe' },
      { name: 'amount', description: 'Payment amount', example: '$500.00' },
      { name: 'paymentDate', description: 'Payment date', example: 'March 15, 2024' },
      { name: 'remainingBalance', description: 'Remaining balance', example: '$500.00' },
      { name: 'companyName', description: 'Company name', example: 'ABC Collections' }
    ]
  }
];

const EmailTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>(templates[0]);
  const [previewData, setPreviewData] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setPreviewData({});
    }
  };

  const handleSaveTemplate = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTemplates(prev => 
        prev.map(t => t.id === selectedTemplate.id ? selectedTemplate : t)
      );
      setSuccess('Template saved successfully');
    } catch (err) {
      setError('Failed to save template');
    } finally {
      setSaving(false);
    }
  };

  const getPreviewContent = (content: string): string => {
    return content.replace(/{{(\w+)}}/g, (match, variable) => 
      previewData[variable] || match
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Email Templates</h3>
            <p className="text-gray-400 mt-1">
              Customize email templates for different scenarios
            </p>
          </div>
          <div className="rounded-full bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
            <Mail className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <select
              value={selectedTemplate.id}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {templates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleSaveTemplate}
              disabled={saving}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? (
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Save className="h-5 w-5 mr-2" />
              )}
              Save Template
            </button>
          </div>

          {error && (
            <div className="flex items-center text-red-400 text-sm">
              <AlertCircle className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center text-green-400 text-sm">
              <Check className="h-4 w-4 mr-2" />
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={selectedTemplate.subject}
                onChange={(e) => setSelectedTemplate(prev => ({
                  ...prev,
                  subject: e.target.value
                }))}
                className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-1 text-sm text-gray-400">
                Preview: {getPreviewContent(selectedTemplate.subject)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Body
              </label>
              <textarea
                value={selectedTemplate.body}
                onChange={(e) => setSelectedTemplate(prev => ({
                  ...prev,
                  body: e.target.value
                }))}
                rows={10}
                className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Template Variables
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTemplate.variables.map(variable => (
                  <div
                    key={variable.name}
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-blue-400">{`{{${variable.name}}}`}</code>
                      <span className="text-sm text-gray-400">{variable.description}</span>
                    </div>
                    <input
                      type="text"
                      value={previewData[variable.name] || ''}
                      onChange={(e) => setPreviewData(prev => ({
                        ...prev,
                        [variable.name]: e.target.value
                      }))}
                      placeholder={variable.example}
                      className="w-full bg-gray-800/50 text-white rounded-lg px-3 py-1 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preview
              </label>
              <div className="bg-white text-gray-900 rounded-lg p-4">
                <div className="font-medium mb-2">
                  {getPreviewContent(selectedTemplate.subject)}
                </div>
                <div className="whitespace-pre-wrap">
                  {getPreviewContent(selectedTemplate.body)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplates;