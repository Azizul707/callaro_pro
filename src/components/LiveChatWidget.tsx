'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  PhoneCall, 
  Calendar, 
  ArrowRight,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  chips?: Array<{ label: string; action: string }>;
}

export const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Hey! 👋 I'm Callora's automated assistant. We install 24/7 missed-call recovery and Google review systems for contractors. How can I help you today?",
      timestamp: 'Just now',
      chips: [
        { label: "🔧 I'm a contractor (Show demo)", action: "contractor_demo" },
        { label: "💰 What is the pricing?", action: "pricing" },
        { label: "📅 Speak with MA Hakim", action: "founder" }
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const sendWebhookNotification = async (userMsg: string, aiReply: string) => {
    try {
      const webhookUrl = (import.meta as any).env?.VITE_N8N_CHAT_WEBHOOK || '';
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'live_chat_interaction',
            timestamp: new Date().toISOString(),
            userMessage: userMsg,
            aiResponse: aiReply,
            pageUrl: window.location.href
          })
        });
      }
    } catch (err) {
      console.log('Webhook dispatched locally');
    }
  };

  const handleSendMessage = (userText: string) => {
    if (!userText.trim()) return;

    const newMsgId = Date.now().toString();
    const userMsg: ChatMessage = {
      id: `user-${newMsgId}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let nextChips: Array<{ label: string; action: string }> | undefined = undefined;

      const lower = userText.toLowerCase();

      if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || lower.includes('$')) {
        replyText = "Our systems start at a transparent $50/mo flat maintenance fee + one-time installation. There are zero long-term lock-in contracts, and we offer a 100% money-back guarantee if we don't recover calls in your first 30 days! Would you like to book a free 30-min strategy audit?";
        nextChips = [
          { label: "📅 Book a Free Audit", action: "audit" },
          { label: "🔧 See Simulator Demo", action: "simulator" }
        ];
      } else if (lower.includes('demo') || lower.includes('contractor') || lower.includes('simulator') || lower.includes('hvac') || lower.includes('plumb')) {
        replyText = "Awesome! When a customer calls while you're working, our system detects the missed call in <3 seconds, sends a polite SMS triage, and books the emergency job into your calendar before they call a competitor. You can test this flow live in our interactive simulator!";
        nextChips = [
          { label: "🚀 Open Simulator", action: "simulator" },
          { label: "💰 View Pricing Matrix", action: "pricing" }
        ];
      } else if (lower.includes('hakim') || lower.includes('speak') || lower.includes('call') || lower.includes('muhammad') || lower.includes('phone') || lower.includes('@')) {
        replyText = "Got it! MA Hakim has been notified directly. Leave your phone number or email below, and he'll reach out with a tailored automation map for your business within 15 minutes.";
      } else {
        replyText = "Thanks for asking! Callora specializes in done-for-you 24/7 missed-call recovery, Google review acceleration, and automated client dispatch for home service businesses. Would you like to test our live demo or discuss pricing?";
        nextChips = [
          { label: "🔧 Contractor Demo", action: "contractor_demo" },
          { label: "💰 Pricing Options", action: "pricing" },
          { label: "📅 Book Free Audit", action: "audit" }
        ];
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: 'Just now',
        chips: nextChips
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      sendWebhookNotification(userText, replyText);
    }, 800);
  };

  const handleChipClick = (chip: { label: string; action: string }) => {
    if (chip.action === 'simulator') {
      window.location.href = '/simulator';
      return;
    }
    if (chip.action === 'audit') {
      window.location.hash = '#contact';
      setIsOpen(false);
      return;
    }
    handleSendMessage(chip.label);
  };

  return (
    <>
      {/* 1. FLOATING LAUNCHER BUTTON (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 p-[1.5px] rounded-full shadow-2xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Open AI Concierge Chat"
          >
            <div className="flex items-center gap-2.5 bg-zinc-950 px-4 py-2.5 rounded-full">
              {/* Founder Avatar with Online Radar Ping */}
              <div className="relative">
                <img
                  src="https://i.ibb.co.com/fdLzRRFn/ma-hakim-image.png"
                  alt="Callora AI Concierge"
                  className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                />
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-zinc-950"></span>
                </span>
              </div>

              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 leading-none">
                  Chat with AI Concierge
                  <Sparkles className="w-3 h-3 text-orange-400 group-hover:rotate-12 transition-transform" />
                </span>
                <span className="text-[10px] font-mono text-emerald-400 leading-tight mt-0.5">
                  Online · &lt;3s response
                </span>
              </div>
            </div>
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(false)}
            className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700/80 text-white flex items-center justify-center shadow-2xl hover:bg-zinc-800 transition-all cursor-pointer"
            aria-label="Close Chat"
          >
            <X className="w-5 h-5 text-zinc-300" />
          </button>
        )}
      </div>

      {/* 2. CHAT WINDOW CONTAINER */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://i.ibb.co.com/fdLzRRFn/ma-hakim-image.png"
                  alt="Callora AI Concierge"
                  className="w-9 h-9 rounded-full object-cover border border-zinc-700"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-zinc-900"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white">Callora AI Concierge</h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    BOT
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Autonomous Speed-to-Lead Assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Operational Status Ribbon */}
          <div className="bg-zinc-900/40 border-b border-zinc-800/50 px-4 py-1.5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Operational 24/7
            </span>
            <span>Speed: &lt;3s</span>
          </div>

          {/* Message Feed (Scrollable Area) */}
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

                {/* Optional Quick Action Chips for AI Messages */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[95%]">
                    {msg.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChipClick(chip)}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-orange-300 hover:text-orange-200 hover:border-orange-500/40 transition-all cursor-pointer active:scale-95"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-zinc-600 font-mono mt-1 px-1">
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

          {/* Input Bar (Bottom) */}
          <div className="p-3 bg-zinc-900/90 border-t border-zinc-800/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMessage);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about missed calls, pricing, or setup..."
                className="flex-1 bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  inputMessage.trim()
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-zinc-950 shadow-md hover:scale-105 active:scale-95'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="text-[9px] font-mono text-zinc-600 text-center pt-2">
              ⚡ Powered by Callora Autonomous Pipeline
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default LiveChatWidget;
