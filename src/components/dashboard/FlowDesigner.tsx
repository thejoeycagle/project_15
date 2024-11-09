import React, { useState } from 'react';
import { Phone, MessageSquare, Clock, Settings, Play, Pause, Save, Plus, X, ArrowRight, Volume2 } from 'lucide-react';

interface FlowNode {
  id: string;
  type: 'start' | 'call' | 'message' | 'condition' | 'delay' | 'end';
  title: string;
  settings: Record<string, any>;
  position: { x: number; y: number };
}

interface FlowConnection {
  from: string;
  to: string;
}

const FlowDesigner: React.FC = () => {
  const [nodes, setNodes] = useState<FlowNode[]>([
    {
      id: 'start',
      type: 'start',
      title: 'Start',
      settings: {},
      position: { x: 100, y: 100 }
    },
    {
      id: 'call-1',
      type: 'call',
      title: 'Initial Call',
      settings: {
        voice: 'rachel',
        script: 'Hello, this is a courtesy call regarding your account...',
        maxAttempts: 3,
        retryDelay: 60
      },
      position: { x: 300, y: 100 }
    }
  ]);

  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [connections, setConnections] = useState<FlowConnection[]>([
    { from: 'start', to: 'call-1' }
  ]);

  const [showSettings, setShowSettings] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleNodeClick = (node: FlowNode) => {
    setSelectedNode(node);
    setShowSettings(true);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
    setSelectedNode(null);
  };

  const handleSettingsSave = (settings: Record<string, any>) => {
    if (!selectedNode) return;

    setNodes(prev => prev.map(node => 
      node.id === selectedNode.id 
        ? { ...node, settings: { ...node.settings, ...settings } }
        : node
    ));
    setShowSettings(false);
  };

  const handleNodeTitleChange = (value: string) => {
    if (!selectedNode) return;
    setSelectedNode(prev => prev ? { ...prev, title: value } : null);
  };

  const handleSettingChange = (key: string, value: any) => {
    if (!selectedNode) return;
    setSelectedNode(prev => prev ? {
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value
      }
    } : null);
  };

  return (
    <div className="h-[calc(100vh-12rem)] bg-gray-900 rounded-lg overflow-hidden relative">
      {/* Toolbar */}
      <div className="absolute top-0 left-0 right-0 bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`${
              isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            } text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center`}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Stop Flow
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Flow
              </>
            )}
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Flow
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
            title="Add Call Node"
          >
            <Phone className="h-5 w-5" />
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
            title="Add Message Node"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
            title="Add Delay Node"
          >
            <Clock className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="h-full pt-16 p-4">
        <svg className="w-full h-full">
          {/* Draw connections */}
          {connections.map((conn, i) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            return (
              <line
                key={i}
                x1={fromNode.position.x + 100}
                y1={fromNode.position.y + 30}
                x2={toNode.position.x}
                y2={toNode.position.y + 30}
                stroke="#4B5563"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          })}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#4B5563" />
            </marker>
          </defs>
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0 pt-16 p-4">
          {nodes.map(node => (
            <div
              key={node.id}
              className="absolute bg-gray-800 rounded-lg p-4 border border-gray-700 cursor-move"
              style={{ left: node.position.x, top: node.position.y, width: '200px' }}
              onClick={() => handleNodeClick(node)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{node.title}</span>
                <Settings className="h-4 w-4 text-gray-400" />
              </div>
              {node.type === 'call' && (
                <div className="text-sm text-gray-400">
                  Max attempts: {node.settings.maxAttempts}
                  <br />
                  Retry delay: {node.settings.retryDelay}m
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && selectedNode && (
        <div className="absolute top-0 right-0 bottom-0 w-96 bg-gray-800 border-l border-gray-700 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Node Settings</h3>
            <button
              onClick={handleSettingsClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Node Name
              </label>
              <input
                type="text"
                value={selectedNode.title}
                onChange={(e) => handleNodeTitleChange(e.target.value)}
                className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {selectedNode.type === 'call' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Voice
                  </label>
                  <select
                    value={selectedNode.settings.voice}
                    onChange={(e) => handleSettingChange('voice', e.target.value)}
                    className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="rachel">Rachel (Female)</option>
                    <option value="josh">Josh (Male)</option>
                    <option value="emily">Emily (Female)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Script
                  </label>
                  <textarea
                    value={selectedNode.settings.script}
                    onChange={(e) => handleSettingChange('script', e.target.value)}
                    rows={4}
                    className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Max Attempts
                    </label>
                    <input
                      type="number"
                      value={selectedNode.settings.maxAttempts}
                      onChange={(e) => handleSettingChange('maxAttempts', parseInt(e.target.value))}
                      min={1}
                      max={10}
                      className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Retry Delay (min)
                    </label>
                    <input
                      type="number"
                      value={selectedNode.settings.retryDelay}
                      onChange={(e) => handleSettingChange('retryDelay', parseInt(e.target.value))}
                      min={30}
                      max={1440}
                      step={30}
                      className="w-full bg-gray-900/50 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="pt-4">
              <button
                onClick={() => handleSettingsSave(selectedNode.settings)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowDesigner;