import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Send,
  BookOpen,
  Share2,
  Search,
  Check,
  CheckCheck,
  Users,
  Shield,
  MessageSquare,
  ArrowLeft,
  X,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ChatView: React.FC = () => {
  const {
    t,
    currentUser,
    conversations,
    messages,
    selectedChatId,
    setSelectedChatId,
    sendMessage,
    allUsers,
    books,
    setSelectedBookId,
    setActiveView,
    setAuthModalOpen
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [shareBookModalOpen, setShareBookModalOpen] = useState(false);
  const [chatSearch, setChatSearch] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChatId]);

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
          <MessageSquare className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {t.chat.pageTitle}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t.chat.loginRequiredDesc}
        </p>
        <button
          onClick={() => setAuthModalOpen(true)}
          className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          {t.nav.login}
        </button>
      </div>
    );
  }

  // Filter conversations for the current user
  const userConversations = conversations.filter(c => c.participantIds.includes(currentUser.id));

  // Current active conversation
  const activeConversation = userConversations.find(c => c.id === selectedChatId) || userConversations[0];

  // If active conversation exists, determine the other participant
  const otherParticipantId = activeConversation?.participantIds.find(id => id !== currentUser.id);
  const otherUser = allUsers.find(u => u.id === otherParticipantId);

  // Messages of the active conversation
  const activeMessages = activeConversation
    ? messages.filter(m => m.conversationId === activeConversation.id)
    : [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConversation) return;

    sendMessage(activeConversation.id, messageInput);
    setMessageInput('');
  };

  const handleShareBook = (bookId: string) => {
    if (!activeConversation) return;
    sendMessage(activeConversation.id, '', bookId);
    setShareBookModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 h-[calc(100vh-5rem)] flex flex-col">
      
      {/* Container Box */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT PANE: Conversation List */}
        <aside className={`w-full md:w-80 lg:w-96 border-r border-slate-200/80 dark:border-slate-800 flex flex-col ${
          selectedChatId && 'hidden md:flex'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {t.chat.pageTitle}
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={chatSearch}
                onChange={e => setChatSearch(e.target.value)}
                placeholder={t.chat.searchChatPlaceholder}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* List of Conversations */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {userConversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                {t.chat.noChatsFound}
              </div>
            ) : (
              userConversations.map(conv => {
                const partnerId = conv.participantIds.find(id => id !== currentUser.id);
                const partner = allUsers.find(u => u.id === partnerId);
                const isSelected = activeConversation?.id === conv.id;

                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedChatId(conv.id)}
                    className={`w-full p-3.5 flex items-center gap-3 text-left transition-colors ${
                      isSelected
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-l-4 border-indigo-600'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={partner?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt="Avatar"
                        className="w-11 h-11 rounded-xl object-cover"
                      />
                      {partner?.status === 'online' && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {partner?.name || conv.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {new Date(conv.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {conv.lastMessage || t.chat.startConversation}
                        </p>
                        {conv.unreadCount > 0 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-600 text-white shrink-0">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* RIGHT PANE: Chat Messages & Input */}
        <main className={`flex-1 flex flex-col h-full ${!selectedChatId && 'hidden md:flex'}`}>
          {activeConversation && otherUser ? (
            <>
              {/* Chat Top Bar */}
              <div className="px-4 py-3 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedChatId('')}
                    className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <img
                    src={otherUser.avatar}
                    alt={otherUser.name}
                    className="w-9 h-9 rounded-xl object-cover"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {otherUser.name}
                      </h3>
                      {otherUser.role === 'admin' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          <span>Librarian</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                      {otherUser.nickname}
                    </span>
                  </div>
                </div>

                {/* Share Book Trigger */}
                <button
                  onClick={() => setShareBookModalOpen(true)}
                  className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.chat.shareBookBtn}</span>
                </button>
              </div>

              {/* Message History Feed */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {activeMessages.map(msg => {
                  const isMine = msg.senderId === currentUser.id;
                  const sharedBook = msg.sharedBookId ? books.find(b => b.id === msg.sharedBookId) : null;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-sm shadow-xs ${
                          isMine
                            ? 'bg-indigo-600 text-white rounded-br-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-xs'
                        }`}
                      >
                        {/* Text Content */}
                        {msg.content && <p className="leading-relaxed">{msg.content}</p>}

                        {/* Rich Shared Book Card inside message */}
                        {sharedBook && (
                          <div
                            onClick={() => {
                              setSelectedBookId(sharedBook.id);
                              setActiveView('book-details');
                            }}
                            className="mt-2 p-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:scale-[1.02] transition-transform"
                          >
                            <div className="flex gap-3">
                              <img
                                src={sharedBook.cover}
                                alt={sharedBook.title}
                                className="w-14 h-20 rounded-lg object-cover"
                              />
                              <div className="flex flex-col justify-between py-0.5">
                                <div>
                                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                                    {sharedBook.category}
                                  </span>
                                  <h4 className="font-bold text-xs line-clamp-1">
                                    {sharedBook.title}
                                  </h4>
                                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                    {sharedBook.author}
                                  </span>
                                </div>
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                                  <BookOpen className="w-3 h-3" />
                                  <span>{t.chat.openBook} →</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Timestamp */}
                        <div
                          className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                            isMine ? 'text-indigo-200' : 'text-slate-400'
                          }`}
                        >
                          <span>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {isMine && <CheckCheck className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Field */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  placeholder={t.chat.typeMessagePlaceholder}
                  className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
                />

                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className={`p-2.5 rounded-xl transition-all ${
                    messageInput.trim()
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-700" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {t.chat.selectChatPrompt}
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Share Book Modal */}
      <AnimatePresence>
        {shareBookModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-indigo-500" />
                  <span>{t.chat.shareBookBtn}</span>
                </h3>
                <button
                  onClick={() => setShareBookModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {books.map(b => (
                  <div
                    key={b.id}
                    onClick={() => handleShareBook(b.id)}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={b.cover} alt={b.title} className="w-10 h-14 rounded object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{b.title}</h4>
                        <p className="text-[11px] text-slate-500">{b.author}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-semibold">
                      {t.chat.shareBookBtn}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
