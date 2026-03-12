'use client';

import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { io } from 'socket.io-client';
import {
  ArrowLeft,
  Send,
  MessageSquare,
  AlertCircle,
  X,
  Paperclip,
  Wifi,
  WifiOff,
  RefreshCw,
} from 'lucide-react';
import { API_BASE_URL } from '../../lib/constants';
import useAuthStore from '../../lib/authstore';

// ── Chat Page ─────────────────────────────────────────────────────────────────

function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const journeyId = searchParams.get('id');
  const { token, user } = useAuthStore();
  const currentUserId = user?.id ? Number(user.id) : null;

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [journeyCode, setJourneyCode] = useState('');

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('auth') : '');

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  // Load message history via REST
  const loadMessages = useCallback(async () => {
    if (!journeyId || !authToken) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/chat/${journeyId}/messages?limit=100`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error(`Failed to load messages (${res.status})`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [journeyId, authToken]);

  // Load journey code for header display
  useEffect(() => {
    if (!journeyId || !authToken) return;
    fetch(`${API_BASE_URL}/user-journey/${journeyId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((r) => r.json())
      .then((d) => setJourneyCode(d?.journeyCode || ''))
      .catch(() => {});
  }, [journeyId, authToken]);

  // WebSocket connection + event handlers
  useEffect(() => {
    if (!journeyId || !authToken) return;

    const socket = io(`${API_BASE_URL}/chat`, {
      auth: { token: authToken },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socketRef.current = socket;

    socket.on('connected', () => {
      setIsConnected(true);
      socket.emit('joinJourney', { userJourneyId: Number(journeyId) });
    });

    socket.on('joinedJourney', () => {
      loadMessages();
    });

    socket.on('newMessage', (message) => {
      setMessages((prev) => {
        if (prev.find((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    socket.on('error', (err) => {
      setError(err?.message || 'Connection error');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect_error', (err) => {
      setError(`Connection failed: ${err.message}`);
      setIsLoading(false);
    });

    socket.on('reconnect', () => {
      setIsConnected(true);
      socket.emit('joinJourney', { userJourneyId: Number(journeyId) });
    });

    return () => {
      socket.emit('leaveJourney', { userJourneyId: Number(journeyId) });
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [journeyId, authToken, loadMessages]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text || !socketRef.current || isSending || !isConnected) return;
    setIsSending(true);
    socketRef.current.emit('sendMessage', {
      userJourneyId: Number(journeyId),
      content: text,
      messageType: 'TEXT',
    });
    setInputText('');
    setIsSending(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return 'Today';
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, msg) => {
    const dateKey = new Date(msg.createdAt).toDateString();
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(msg);
    return groups;
  }, {});

  if (!journeyId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No journey selected.</p>
          <button
            onClick={() => router.push('/journey')}
            className="mt-4 text-[#27A395] underline text-sm"
          >
            Go to My Journeys
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-gradient-to-br from-slate-100 via-gray-100 to-teal-50 flex items-center justify-center px-4 py-4"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
        {/* ── Chat Card ── */}
        <div className="w-full max-w-2xl flex flex-col rounded-2xl shadow-2xl overflow-hidden bg-white h-full">
          {/* ── Card Header ── */}
          <div
            className="flex items-center gap-4 px-4 py-4 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #354B62 0%, #27A395 100%)' }}
          >
            <button
              onClick={() => router.push(`/journey?id=${journeyId}`)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-white/80" />
                <h1 className="text-white font-bold text-base truncate">
                  Journey Chat{journeyCode ? ` — ${journeyCode}` : ` #${journeyId}`}
                </h1>
              </div>
              <p className="text-white/60 text-xs mt-0.5">Real-time claim communication</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                isConnected ? 'bg-green-400/20 text-green-100' : 'bg-white/10 text-white/50'
              }`}>
                {isConnected
                  ? <><Wifi className="w-3 h-3" /> Connected</>
                  : <><WifiOff className="w-3 h-3" /> Offline</>}
              </span>
              <button
                onClick={loadMessages}
                disabled={isLoading}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
                title="Refresh messages"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* ── Error banner ── */}
          {error && (
            <div className="mx-4 mt-3 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700 flex items-center gap-2 flex-shrink-0">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
              <button className="ml-auto text-amber-600 hover:text-amber-800" onClick={() => setError(null)}>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* ── Messages ── */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-gray-50/50">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-7 h-7 border-2 border-[#27A395] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400 gap-2">
            <MessageSquare className="w-10 h-10 opacity-25" />
            <p className="text-sm font-medium">No messages yet</p>
            <p className="text-xs">Start the conversation below</p>
          </div>
        ) : (
          Object.entries(groupedMessages).map(([dateKey, dayMsgs]) => (
            <div key={dateKey}>
              {/* Date divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 px-2 font-medium">{formatDate(dayMsgs[0].createdAt)}</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {dayMsgs.map((msg) => {
                const isMe = msg.sentBy === currentUserId || msg.sentBy === Number(currentUserId);
                const senderName = msg.sender?.name || msg.sender?.email || `User ${msg.sentBy}`;
                const isSystem = msg.messageType === 'SYSTEM';

                if (isSystem) {
                  return (
                    <div key={msg.id} className="flex justify-center my-3">
                      <span className="text-xs text-gray-400 bg-white border border-gray-200 px-4 py-1.5 rounded-full shadow-sm">
                        {msg.content}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className={`flex mb-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      {!isMe && (
                        <span className="text-xs text-gray-500 mb-1 ml-1 font-semibold">{senderName}</span>
                      )}
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        isMe
                          ? 'bg-gradient-to-br from-[#27A395] to-[#33A8D3] text-white rounded-br-sm'
                          : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                      }`}>
                        {msg.metadata?.deleted ? (
                          <span className="italic opacity-60">Message deleted</span>
                        ) : msg.metadata?.fileName ? (
                          <span className="flex items-center gap-2">
                            <Paperclip className="w-3.5 h-3.5 flex-shrink-0" />
                            {msg.metadata.fileName}
                          </span>
                        ) : (
                          <span className="whitespace-pre-wrap">{msg.content}</span>
                        )}
                      </div>
                      <span className={`text-xs mt-1 text-gray-400 ${isMe ? 'mr-1' : 'ml-1'}`}>
                        {formatTime(msg.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

          {/* ── Input ── */}
          <div className="px-4 py-3 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={isConnected ? 'Type a message… (Enter to send, Shift+Enter for new line)' : 'Connecting…'}
                disabled={!isConnected || isSending}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#27A395] resize-none transition-colors disabled:bg-gray-50 disabled:text-gray-400"
                style={{ minHeight: '44px', maxHeight: '140px', overflowY: 'auto' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px';
                }}
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || !isConnected || isSending}
                className="w-11 h-11 flex items-center justify-center rounded-xl text-white flex-shrink-0 disabled:opacity-40 transition-all hover:-translate-y-0.5 disabled:transform-none shadow-sm"
                style={{ background: 'linear-gradient(135deg, #27A395 0%, #33A8D3 100%)' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>{/* end card */}
    </div>
  );
}

export default function ChatPageWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-7 h-7 border-2 border-[#27A395] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ChatPage />
    </Suspense>
  );
}
