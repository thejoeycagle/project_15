import React, { useState } from 'react';
import { Users, Mail, Link as LinkIcon, Copy, Check, AlertCircle } from 'lucide-react';

const TeamSettings: React.FC = () => {
  const [email, setEmail] = useState('');
  const [inviteLink, setInviteLink] = useState('https://clearcollect.ai/invite/abc123xyz789');
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleEmailInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(`Invitation sent to ${email}`);
      setEmail('');
    } catch (err) {
      setError('Failed to send invitation');
    } finally {
      setSending(false);
    }
  };

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy link');
    }
  };

  const generateNewLink = () => {
    // Simulate generating a new invite link
    setInviteLink(`https://clearcollect.ai/invite/${Math.random().toString(36).slice(2)}`);
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white">Team Management</h3>
          <p className="text-gray-400 mt-1">
            Invite team members to collaborate on your account
          </p>
        </div>
        <div className="rounded-full bg-blue-500/10 p-3 ring-1 ring-blue-500/20">
          <Users className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      <div className="space-y-8">
        {/* Email Invitation */}
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Invite by Email</h4>
          <form onSubmit={handleEmailInvite} className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full bg-gray-900/50 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
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

            <button
              type="submit"
              disabled={sending}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {sending ? 'Sending...' : 'Send Invitation'}
            </button>
          </form>
        </div>

        {/* Invite Link */}
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Invite Link</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="w-full bg-gray-900/50 text-white rounded-lg pl-10 pr-20 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={copyInviteLink}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
              <button
                onClick={generateNewLink}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Generate New Link
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Share this link with team members you want to invite. The link expires in 7 days.
            </p>
          </div>
        </div>

        {/* Current Team Members */}
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Current Team Members</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-3 px-4 bg-gray-900/50 rounded-lg">
              <div>
                <div className="text-white font-medium">John Smith</div>
                <div className="text-sm text-gray-400">john@company.com</div>
              </div>
              <div className="text-sm text-gray-400">Admin</div>
            </div>
            <div className="flex items-center justify-between py-3 px-4 bg-gray-900/50 rounded-lg">
              <div>
                <div className="text-white font-medium">Sarah Johnson</div>
                <div className="text-sm text-gray-400">sarah@company.com</div>
              </div>
              <div className="text-sm text-gray-400">Member</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSettings;