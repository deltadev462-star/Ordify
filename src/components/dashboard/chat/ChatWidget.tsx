import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { getAgentById } from "@/data/agents-data";
import type { Agent } from "@/data/agents-data";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

interface ChatWidgetProps {
  defaultAgentId?: string;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ defaultAgentId = "sales" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [agent, setAgent] = useState<Agent | undefined>();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Load agent data
  useEffect(() => {
    const agentData = getAgentById(defaultAgentId);
    setAgent(agentData);
  }, [defaultAgentId]);

  // Add welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        text: "Hi! How can I help you today?",
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! Our team will get back to you shortly.",
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    }, 1500);

    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 left-6 z-50 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-xl border-0 transition-all duration-300 ${
            isMinimized ? "w-80 h-16" : "w-96 h-[32rem]"
          }`}
        >
          {/* Chat Header */}
          <div
            className="p-3 text-white rounded-t-lg flex items-center justify-between cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center gap-3">
              <>
                <span className="text-2xl">{agent?.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm">Support Agent</h3>
                  <p className="text-xs opacity-90">Online</p>
                </div>
              </>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="p-1.5 hover:bg-white/20 rounded transition-colors"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                className="p-1.5 hover:bg-white/20 rounded transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div ref={chatContainerRef} className="h-80 overflow-y-auto p-4 bg-transparent">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <span className="text-4xl mb-2">{agent?.icon}</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Start a conversation with our team.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.sender === "agent" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-2 flex-shrink-0 shadow-sm">
                            <span className="text-sm">{agent?.icon}</span>
                          </div>
                        )}
                        <div
                          className={`max-w-[70%] px-4 py-3 rounded-lg shadow-sm ${
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                              : "bg-white dark:bg-gray-800/80 text-gray-900 dark:text-white"
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <span
                            className={`text-xs mt-1 block ${
                              msg.sender === "user" ? "text-white/80" : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2.5 text-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
