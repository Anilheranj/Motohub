/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  RefreshCw, 
  ChevronRight,
  ShieldAlert,
  Shirt,
  Volume2,
  VolumeX,
  User,
  Cpu
} from 'lucide-react';
import { useApp } from '../AppContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface AIChatBotProps {
  isEmbedded?: boolean;
}

export const AIChatBot: React.FC<AIChatBotProps> = ({ isEmbedded = false }) => {
  const { theme, products, navigate } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Welcome to **MotoGear Hub's AI Assistant**. I am tuned with deep expertise on riding gear, safety standards, and performance gear. \n\nHow can I help you find the ultimate protection or connect with premium gear today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    { label: "🪖 Helmets under ₹10,000", text: "What are the best helmets under 10,000 INR in your catalog?" },
    { label: "🧥 Adventure jackets", text: "Recommend some premium, armored touring or adventure riding jackets." },
    { label: "⚔️ Compare MT vs LS2", text: "Compare the MT Thunder 4 SV and LS2 Storm II helmets in detail." },
    { label: "📶 Best intercom", text: "Is the Cardo Packtalk Edge worth it? Explain its core features." }
  ];

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-10).map(m => ({
            sender: m.sender,
            text: m.text
          }))
        })
      });

      const data = await response.json();
      
      const botMsg: Message = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        text: data.reply || 'I ran into a speedbump on the track. Let\'s try that again.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Message = {
        id: 'err_' + Date.now(),
        sender: 'bot',
        text: 'I apologize, but my satellite link is slightly interrupted. Check out our **Products Page** in the meantime!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatMarkdown = (text: string) => {
    // Simple bolding formatter for **text**
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-extrabold text-blue-600 dark:text-blue-400">{part.slice(2, -2)}</strong>;
      }
      // Simple bullet points formatting if line starts with '-'
      if (part.includes('\n- ')) {
        const sublines = part.split('\n');
        return (
          <ul key={index} className="list-disc pl-5 my-2 space-y-1">
            {sublines.map((l, i) => {
              if (l.trim().startsWith('-')) {
                const boldSubParts = l.trim().slice(1).trim().split(/(\*\*.*?\*\*)/);
                return (
                  <li key={i} className="leading-relaxed">
                    {boldSubParts.map((sp, idx) => {
                      if (sp.startsWith('**') && sp.endsWith('**')) {
                        return <strong key={idx} className="font-extrabold text-blue-600 dark:text-blue-400">{sp.slice(2, -2)}</strong>;
                      }
                      return sp;
                    })}
                  </li>
                );
              }
              return <p key={i} className="mb-1 leading-relaxed">{l}</p>;
            })}
          </ul>
        );
      }
      return <span key={index} className="whitespace-pre-line leading-relaxed">{part}</span>;
    });
  };

  // Chat window template
  const renderChatWindow = () => (
    <div className={`flex flex-col ${isEmbedded ? 'h-[550px]' : 'h-[500px] sm:h-[580px]'} bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/40 dark:border-white/5 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300`}>
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-sm tracking-wide uppercase">MotoGear AI</h3>
            <span className="text-[10px] text-blue-100 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block animate-ping"></span>
              Core AI Online
            </span>
          </div>
        </div>
        {!isEmbedded && (
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'bot' && (
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/15 shrink-0 self-end">
                <Sparkles className="w-4 h-4" />
              </div>
            )}
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[12px] leading-relaxed shadow-sm ${
              m.sender === 'user'
                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-none'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/20'
            }`}>
              {formatMarkdown(m.text)}
              <span className="block text-[8px] text-right mt-1.5 opacity-60 font-mono">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            {m.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 self-end">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/15 shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none border border-slate-200/20 flex items-center gap-1 shadow-sm">
              <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Grid */}
      {messages.length < 3 && (
        <div className="px-6 py-2 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-white/5">
          <p className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider mb-2">Suggested Inquiries</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestedPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p.text)}
                className="text-left px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200/30 dark:border-white/5 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 text-[10px] text-slate-700 dark:text-slate-300 font-semibold cursor-pointer hover:shadow-md hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 ease-in-out"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }} 
        className="p-4 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-white/5 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about helmets, accessories, specs..."
          className="flex-grow px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-white/5 rounded-2xl text-[12px] text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-600 transition-colors"
        />
        <button
          type="submit"
          className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 shadow-md hover:shadow-blue-500/20 flex items-center justify-center cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );

  if (isEmbedded) {
    return renderChatWindow();
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="mb-4 w-[340px] sm:w-[420px] max-w-[calc(100vw-32px)]"
          >
            {renderChatWindow()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 w-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 border border-white/10 cursor-pointer relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-full animate-bounce">
                AI
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-16 bg-slate-900/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/5 shadow-md">
            🏍️ Ask MotoGear AI Specialist
          </div>
        )}
      </motion.button>
    </div>
  );
};
