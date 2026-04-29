'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { personas, PersonaId, Persona } from '@/lib/prompts';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function ChatPage() {
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>('anshuman');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activePersona = personas[activePersonaId];

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSwitchPersona = (id: PersonaId) => {
    if (isLoading) return;
    setActivePersonaId(id);
    setMessages([]);
    setError(null);
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          personaId: activePersonaId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch response');
      }

      if (!response.body) throw new Error('No readable stream');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let modelMessage = '';

      // Add empty model message first
      setMessages((prev) => [...prev, { role: 'model', content: '' }]);

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          modelMessage += chunk;
          
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].content = modelMessage;
            return updated;
          });
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground antialiased md:flex-row">
      {/* Sidebar / Topbar for Personas */}
      <div className="flex w-full flex-col border-b border-border bg-muted/20 p-4 md:w-80 md:border-b-0 md:border-r">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white">Scaler Mentor</h1>
          <p className="text-sm text-muted-foreground">Select your persona below to start chatting.</p>
        </div>
        
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-x-visible md:pb-0">
          {(Object.values(personas) as Persona[]).map((p) => (
            <button
              key={p.id}
              onClick={() => handleSwitchPersona(p.id as PersonaId)}
              disabled={isLoading}
              className={`relative flex items-center gap-3 rounded-lg p-3 text-left transition-all ${
                activePersonaId === p.id 
                  ? 'bg-primary/10 text-white' 
                  : 'hover:bg-muted/50 text-muted-foreground'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {activePersonaId === p.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-lg border border-primary/30 bg-primary/5"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                <span className="font-bold">{p.avatar}</span>
              </div>
              <div className="relative z-10 hidden md:block">
                <div className="font-medium">{p.name}</div>
                <div className="text-xs opacity-70">{p.role}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col bg-background relative overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
              {activePersona.avatar}
            </div>
            <div>
              <h2 className="font-semibold">{activePersona.name}</h2>
              <p className="text-xs text-muted-foreground">{activePersona.role}</p>
            </div>
          </div>
        </header>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
                {activePersona.avatar}
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-2xl font-semibold">Chat with {activePersona.name}</h3>
                <p className="text-muted-foreground text-sm">
                  Ask a question to start the conversation. Remember, the prompt is tailored to mimic {activePersona.name.split(' ')[0]}'s real-world communication style.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                {activePersona.suggestionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip)}
                    className="rounded-full border border-border bg-muted/30 px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-6">
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'model' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary mt-1">
                        {activePersona.avatar}
                      </div>
                    )}
                    
                    <div
                      className={`relative max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3 text-sm shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : 'bg-muted text-foreground rounded-tl-sm'
                      }`}
                    >
                      {msg.role === 'model' ? (
                        <div className="prose prose-invert max-w-none text-sm">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      )}
                    </div>
                    
                    {msg.role === 'user' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted mt-1">
                        <User size={16} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary mt-1">
                    {activePersona.avatar}
                  </div>
                  <div className="flex items-center justify-center rounded-2xl rounded-tl-sm bg-muted px-5 py-4 w-20">
                    <div className="flex space-x-1">
                      <motion.div
                        className="h-2 w-2 rounded-full bg-muted-foreground/60"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="h-2 w-2 rounded-full bg-muted-foreground/60"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="h-2 w-2 rounded-full bg-muted-foreground/60"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              {error && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg text-sm border border-red-400/20">
                  <AlertCircle size={16} />
                  <p>{error}</p>
                </div>
              )}
              
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-background p-4 md:p-6">
          <div className="mx-auto max-w-3xl relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${activePersona.name.split(' ')[0]} a question...`}
              className="w-full resize-none rounded-xl border border-border bg-muted/50 py-4 pl-4 pr-12 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm"
              rows={1}
              style={{ minHeight: '60px', maxHeight: '120px' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="mx-auto max-w-3xl mt-2 text-center text-xs text-muted-foreground">
            AI can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>
    </div>
  );
}
