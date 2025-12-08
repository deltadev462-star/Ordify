import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { agentsData } from "@/data/agents-data";
import type { Agent } from "@/data/agents-data";
import { Check, Send, Crown, Volume2 } from "lucide-react";

const AgentStorePage: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{text: string; sender: 'user' | 'agent'; agentName?: string}[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Toggle agent selection
  const toggleAgentSelection = (agentId: string) => {
    setSelectedAgents(prev => {
      if (prev.includes(agentId)) {
        return prev.filter(id => id !== agentId);
      } else {
        return [...prev, agentId];
      }
    });
  };

  // Handle double click to open individual agent chat
  const handleAgentDoubleClick = (agentId: string) => {
    navigate(`/dashboard/agent-chat/${agentId}`);
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (message.trim() && selectedAgents.length > 0) {
      // Add user message
      setChatMessages(prev => [...prev, { text: message, sender: 'user' }]);
      
      // Simulate agent responses
      setTimeout(() => {
        selectedAgents.forEach((agentId, index) => {
          const agent = agentsData.find(a => a.id === agentId);
          if (agent) {
            setTimeout(() => {
              setChatMessages(prev => [...prev, {
                text: t('agent.response', { 
                  agentName: t(`agents.${agent.id}.name`, { defaultValue: agent.name }),
                  description: t(`agents.${agent.id}.description`, { defaultValue: agent.description.toLowerCase() })
                }),
                sender: 'agent',
                agentName: t(`agents.${agent.id}.name`, { defaultValue: agent.name })
              }]);
            }, 500 * (index + 1));
          }
        });
      }, 1000);

      setMessage("");
    }
  };

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200" dir={i18n.dir()}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-white">
              <Crown className="w-10 h-10 text-yellow-300" />
              <div>
                <h1 className="text-3xl font-bold">{t('agentStore.title', 'AI Agent Store')}</h1>
                <p className="text-lg opacity-90 mt-1">{t('agentStore.subtitle', 'Select AI agents to supercharge your e-commerce operations')}</p>
              </div>
            </div>
            {selectedAgents.length > 0 && (
              <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 text-white font-semibold">
                {t('agentStore.selectedCount', {
                  count: selectedAgents.length,
                  defaultValue: `${selectedAgents.length} agent${selectedAgents.length > 1 ? 's' : ''} selected`
                })}
              </div>
            )}
          </div>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {agentsData.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              isSelected={selectedAgents.includes(agent.id)}
              onToggleSelect={() => toggleAgentSelection(agent.id)}
              onDoubleClick={() => handleAgentDoubleClick(agent.id)}
            />
          ))}
        </div>

        {/* Chat Interface */}
        {selectedAgents.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                {t('agentStore.chatTitle', 'Chat with Selected Agents')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedAgents.map(agentId => {
                  const agent = agentsData.find(a => a.id === agentId);
                  return agent ? (
                    <span 
                      key={agentId} 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium"
                      style={{ background: agent.gradient }}
                    >
                      <span className="text-lg">{agent.icon}</span>
                      <span>{t(`agents.${agent.id}.name`, { defaultValue: agent.name })}</span>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
            
            <div className="h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6" ref={chatContainerRef}>
              {chatMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-center">
                  <p>{t('agentStore.chatPlaceholder', 'Select agents and start chatting to get AI-powered assistance')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-md px-4 py-3 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md'
                        }`}
                      >
                        {msg.sender === 'agent' && msg.agentName && (
                          <p className="font-semibold text-purple-600 dark:text-purple-400 mb-1">
                            {msg.agentName}
                          </p>
                        )}
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
                  placeholder={t('agentStore.chatInputPlaceholder', 'Ask your selected agents anything...')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" 
                  onClick={handleSendMessage}
                  disabled={!message.trim() || selectedAgents.length === 0}
                >
                  <Send size={20} />
                  <span className="hidden sm:inline">{t('agentStore.send', 'Send')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Agent Card Component
const AgentCard: React.FC<{
  agent: Agent;
  isSelected: boolean;
  onToggleSelect: () => void;
  onDoubleClick: () => void;
}> = ({ agent, isSelected, onToggleSelect, onDoubleClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1 shadow`}
      onClick={onToggleSelect}
      onDoubleClick={onDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Volume Animation - Top Left */}
      {isSelected && (
        <div className="absolute top-3 left-3 z-10">
          <VolumeAnimation />
        </div>
      )}

      {/* Selection Indicator */}
      <div className={`absolute top-3 right-3 w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
        isSelected
          ? 'bg-purple-600 border-purple-600'
          : 'border-gray-300 dark:border-gray-600'
      }`}>
        {isSelected && <Check size={18} className="text-white" />}
      </div>

      {/* Gradient Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
        style={{ background: agent.gradient }}
      />

      {/* Agent Icon */}
      <div className="flex justify-center mb-4">
        <span className="text-5xl filter drop-shadow-lg">{agent.icon}</span>
      </div>

      {/* Agent Info */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {t(`agents.${agent.id}.name`, { defaultValue: agent.name })}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t(`agents.${agent.id}.description`, { defaultValue: agent.description })}
        </p>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 rounded-b-xl transform transition-transform duration-200">
          <p className="text-xs text-center">
            {t('agentStore.cardHint', 'Click to select • Double-click to open chat')}
          </p>
        </div>
      )}
    </div>
  );
};

// Volume Animation Component
const VolumeAnimation: React.FC = () => {
  return (
    <div className="flex items-center gap-1">
      <Volume2 size={16} className="text-purple-600 dark:text-purple-400 animate-pulse" />
      <div className="flex gap-0.5 items-center">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-1 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse"
            style={{
              height: `${8 + i * 3}px`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentStorePage;