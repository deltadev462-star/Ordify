import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAgentById } from "@/data/agents-data";
import type { Agent } from "@/data/agents-data";
import { ArrowLeft, Send, Volume2, MoreVertical, Trash2, Download } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: ChatMessage[];
}

const AgentChatPage: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const [agent, setAgent] = useState<Agent | undefined>();
  const [message, setMessage] = useState("");
  const [currentSessionId, setCurrentSessionId] = useState<string>("session-1");
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "session-1",
      title: "New Chat",
      lastMessage: "Click to start chatting",
      timestamp: new Date(),
      messages: []
    }
  ]);

  // Load agent data
  useEffect(() => {
    if (agentId) {
      const agentData = getAgentById(agentId);
      setAgent(agentData);
      
      // Add welcome message for new session
      if (agentData && chatSessions[0].messages.length === 0) {
        const welcomeMessage: ChatMessage = {
          id: Date.now().toString(),
          text: t('agentChat.welcomeMessage', {
            agentName: t(`agents.${agentData.id}.name`, { defaultValue: agentData.name }),
            description: t(`agents.${agentData.id}.description`, { defaultValue: agentData.description.toLowerCase() })
          }),
          sender: 'agent',
          timestamp: new Date()
        };
        
        setChatSessions(prev => {
          const updated = [...prev];
          updated[0].messages.push(welcomeMessage);
          return updated;
        });
      }
    }
  }, [agentId]);

  // Get current session
  const currentSession = chatSessions.find(s => s.id === currentSessionId);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentSession?.messages]);

  // Handle sending message
  const handleSendMessage = () => {
    if (message.trim() && currentSession) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        timestamp: new Date()
      };

      // Update session with new message
      setChatSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return {
            ...session,
            messages: [...session.messages, newMessage],
            lastMessage: message,
            timestamp: new Date()
          };
        }
        return session;
      }));

      // Simulate agent response
      setTimeout(() => {
        if (agent) {
          const agentMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: t('agentChat.response', {
              message: message,
              agentName: t(`agents.${agent.id}.name`, { defaultValue: agent.name })
            }),
            sender: 'agent',
            timestamp: new Date()
          };

          setChatSessions(prev => prev.map(session => {
            if (session.id === currentSessionId) {
              return {
                ...session,
                messages: [...session.messages, agentMessage],
                lastMessage: agentMessage.text,
                timestamp: new Date()
              };
            }
            return session;
          }));
        }
      }, 1500);

      setMessage("");
    }
  };

  // Create new chat session
  const createNewSession = () => {
    const newSession: ChatSession = {
      id: `session-${Date.now()}`,
      title: t('agentChat.chatTitle', { number: chatSessions.length + 1 }),
      lastMessage: t('agentChat.newChatStarted'),
      timestamp: new Date(),
      messages: agent ? [{
        id: Date.now().toString(),
        text: t('agentChat.welcomeMessage', {
          agentName: t(`agents.${agent.id}.name`, { defaultValue: agent.name }),
          description: t(`agents.${agent.id}.description`, { defaultValue: agent.description.toLowerCase() })
        }),
        sender: 'agent',
        timestamp: new Date()
      }] : []
    };

    setChatSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
  };

  // Delete chat session
  const deleteSession = (sessionId: string) => {
    if (chatSessions.length > 1) {
      setChatSessions(prev => prev.filter(s => s.id !== sessionId));
      if (currentSessionId === sessionId) {
        setCurrentSessionId(chatSessions[0].id);
      }
    }
  };

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('agentChat.notFound')}
          </h2>
          <button
            onClick={() => navigate('/dashboard/agent-store')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            {t('agentChat.backToStore')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900" dir={i18n.dir()}>
      {/* Sidebar - Chat History */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('agentChat.chatHistory')}
          </h3>
          <button
            className="mt-3 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200"
            onClick={createNewSession}
          >
            {t('agentChat.newChat')}
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-2">
            {chatSessions.map(session => (
              <div
                key={session.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  session.id === currentSessionId
                    ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-600'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setCurrentSessionId(session.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white truncate">
                      {session.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {session.lastMessage}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {session.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {chatSessions.length > 1 && (
                    <button
                      className="ml-2 p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(session.id);
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 text-white" style={{ background: agent.gradient }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
                onClick={() => navigate('/dashboard/agent-store')}
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="text-4xl">{agent.icon}</span>
                  <VolumeIndicator />
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {t(`agents.${agent.id}.name`, { defaultValue: agent.name })}
                  </h2>
                  <p className="text-sm opacity-90">{t('agentChat.online')}</p>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900" ref={chatContainerRef}>
          {currentSession?.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-6xl mb-4">{agent.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('agentChat.startConversation', {
                  agentName: t(`agents.${agent.id}.name`, { defaultValue: agent.name })
                })}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                {t(`agents.${agent.id}.description`, { defaultValue: agent.description })}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentSession?.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-lg">{agent.icon}</span>
                    </div>
                  )}
                  <div className={`max-w-md px-4 py-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <span className={`text-xs mt-1 block ${
                      msg.sender === 'user' ? 'text-purple-200' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
              placeholder={t('agentChat.inputPlaceholder', {
                agentName: t(`agents.${agent.id}.name`, { defaultValue: agent.name })
              })}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Volume Indicator Component
const VolumeIndicator: React.FC = () => {
  return (
    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 animate-pulse">
      <Volume2 size={10} className="text-white" />
    </div>
  );
};

export default AgentChatPage;