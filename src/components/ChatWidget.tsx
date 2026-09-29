'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, X, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
}

const QUICK_CHIPS = [
  'How much does it cost?',
  'How long does setup take?',
  'Can I start small?',
  'Book a call',
];

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-0',
      sender: 'assistant',
      text: "Hey! I'm the Callora assistant. Ask me about pricing, services, or timeline — or tap a quick question below.",
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize unique session ID from localStorage or generate fresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let savedSession = localStorage.getItem('callora_chat_session_id');
      if (!savedSession) {
        savedSession = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
        localStorage.setItem('callora_chat_session_id', savedSession);
      }
      setSessionId(savedSession);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const userMessageId = 'usr_' + Date.now();
    const newMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Direct n8n webhook target
      const directWebhookUrl = "https://n8n.srv1106977.hstgr.cloud/webhook/8565bbc9-60f2-4670-8d73-c57d646f55e6";
      const endpoint = directWebhookUrl;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, sessionId }),
      });

      let replyText = '';
      if (res.ok) {
        const textData = await res.text();
        console.log('[ChatWidget] Raw response received:', textData);
        let data: any;
        try {
          data = JSON.parse(textData);
        } catch {
          data = textData;
        }

        if (Array.isArray(data) && data.length > 0) {
          const item = data[0];
          replyText = item?.reply || item?.output || item?.text || item?.message || (typeof item === 'string' ? item : JSON.stringify(item));
        } else if (typeof data === 'object' && data !== null) {
          replyText = data.reply || data.output || data.text || data.message || (typeof data.response === 'string' ? data.response : '');
        } else if (typeof data === 'string' && data.trim()) {
          replyText = data;
        }

        if (!replyText) {
          replyText = "I've received your note and will make sure our team follows up!";
        }
      } else {
        const errBody = await res.text();
        console.error('[ChatWidget] HTTP Error:', res.status, errBody);
        throw new Error(`Endpoint returned status ${res.status}`);
      }

      const botReply: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch {
      // Fallback local response directly matching the backend fallback matrix
      let fallback = "Thanks for reaching out! We install 24/7 missed-call recovery and review systems for contractors. Would you like to schedule a free 30-minute strategy audit?";
      const lower = trimmed.toLowerCase();
      if (lower.includes('cost') || lower.includes('price')) {
        fallback = "Our standalone tools (Review Engine / Social Poster) start at a flat $50/month with zero long-term contracts. Complete missed-call pipelines are scoped during your free audit.";
      } else if (lower.includes('setup') || lower.includes('long')) {
        fallback = "Standard setups are typically tested and running live within 48 to 72 hours without disrupting your existing phone line.";
      } else if (lower.includes('start small')) {
        fallback = "Yes, absolutely! Most contractors start with our $50/mo 5-Star Review Engine before adding full missed-call triage.";
      } else if (lower.includes('book')) {
        fallback = "You can lock in a 30-minute audit using the 'Book My Free Revenue Audit' button on our page, or drop your phone number here and we'll reach out directly.";
      }

      const botReply: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'assistant',
        text: fallback,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botReply]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating launcher at bottom-right */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen ? (
          <div className="relative group">
            {/* Attention-grabbing floating typing bubble indicator */}
            <div className="absolute -top-11 right-1 pointer-events-none transition-all duration-300 group-hover:-translate-y-1">
              <div className="relative bg-zinc-900/95 border border-zinc-700/80 rounded-full px-3 py-1.5 shadow-xl backdrop-blur-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:0.4s]"></span>

                {/* Downward triangle/tail pointing to the circular button */}
                <div className="absolute -bottom-1.5 right-4 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-zinc-700/80"></div>
                <div className="absolute -bottom-[5px] right-4 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-zinc-900"></div>
              </div>
            </div>

            {/* Circular glowing launcher button */}
            <button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              aria-label="Open Callora Assistant Chat"
            >
              <MessageSquare className="w-6 h-6 text-white drop-shadow" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(false)}
            className="w-12 h-12 rounded-full bg-[#0b0c10] border border-zinc-700/80 text-white flex items-center justify-center shadow-2xl hover:bg-zinc-900 transition-all cursor-pointer"
            aria-label="Close Chat"
          >
            <X className="w-5 h-5 text-zinc-300" />
          </button>
        )}
      </div>

      {/* Modal chat window */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[390px] h-[540px] max-h-[85vh] bg-[#0b0c10]/95 backdrop-blur-xl border border-zinc-800/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Glowing Bot Avatar with green status dot */}
              <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-br from-orange-500/25 to-amber-500/10 border border-orange-500/40 flex items-center justify-center text-orange-400 shadow-inner">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0b0c10]"></span>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight leading-none">
                  Callora Assistant
                </h3>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 leading-none">
                  AI
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-zinc-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-zinc-950 font-medium text-xs sm:text-sm rounded-2xl rounded-tr-sm p-3.5 shadow-md'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs sm:text-sm rounded-2xl rounded-tl-sm p-3.5 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-zinc-500 font-mono mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl rounded-tl-sm bg-zinc-900 border border-zinc-800 w-fit">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Chips */}
          <div className="px-4 py-2 bg-[#0b0c10] border-t border-zinc-900 flex flex-wrap gap-1.5">
            {QUICK_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-orange-400 hover:border-orange-500/40 transition-all cursor-pointer active:scale-95"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Bottom Input Bar */}
          <div className="p-3 bg-zinc-900/90 border-t border-zinc-800/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 rounded-full px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                  inputValue.trim()
                    ? 'bg-[#c2410c] hover:bg-[#ea580c] text-white shadow-md active:scale-95'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};

export default ChatWidget;
