import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Book,
  ReadingProgress,
  SavedBook,
  ChatMessage,
  ChatConversation,
  NotificationItem,
  ActiveView,
  Language,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_BOOKS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';
import { translations } from '../i18n/translations';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Localization & Theme
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.uz;
  darkMode: boolean;
  toggleDarkMode: () => void;

  // Current User & Auth
  currentUser: User | null;
  allUsers: User[];
  login: (nicknameOrEmail: string) => boolean;
  logout: () => void;
  registerUser: (data: { nickname: string; name: string; email: string; bio?: string }) => { success: boolean; error?: string };
  updateUserProfile: (updates: Partial<User>) => void;
  switchUser: (userId: string) => void;
  toggleUserStatus: (userId: string) => void;

  // View Navigation
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedBookId: string | null;
  setSelectedBookId: (id: string | null) => void;
  selectedChatId: string | null;
  setSelectedChatId: (id: string | null) => void;
  selectedUserId: string | null;
  setSelectedUserId: (id: string | null) => void;
  globalSearch: string;
  setGlobalSearch: (q: string) => void;

  // Books CRUD
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Reading & Saved
  readingProgress: Record<string, ReadingProgress>;
  updateReadingProgress: (bookId: string, page: number, totalPages: number) => void;
  addBookmark: (bookId: string, page: number) => void;
  removeBookmark: (bookId: string, page: number) => void;
  savedBooks: SavedBook[];
  toggleSaveBook: (bookId: string) => boolean;
  isBookSaved: (bookId: string) => boolean;
  markBookFinished: (bookId: string) => void;

  // Messaging & Community
  conversations: ChatConversation[];
  messages: ChatMessage[];
  sendMessage: (chatId: string, content: string) => void;
  startOrGetChatWithStudent: (targetUserId: string) => string;
  contactLibrarian: (subject: string, message: string) => string;
  markChatRead: (chatId: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Toasts & Modals
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalTab: 'login' | 'register';
  setAuthModalTab: (tab: 'login' | 'register') => void;
  librarianModalOpen: boolean;
  setLibrarianModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('elibrary_theme');
    if (saved) return saved === 'dark';
    return false;
  });

  // Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('elibrary_lang');
    return (saved === 'ru' ? 'ru' : 'uz') as Language;
  });

  // Navigation state
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals & Toasts
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [librarianModalOpen, setLibrarianModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Users state
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('elibrary_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem('elibrary_current_user_id');
    return saved || 'user_1';
  });

  const currentUser = allUsers.find(u => u.id === currentUserId) || allUsers[0] || null;

  // Books state
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('elibrary_books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  // Reading progress state: key is `${userId}_${bookId}`
  const [readingProgress, setReadingProgress] = useState<Record<string, ReadingProgress>>(() => {
    const saved = localStorage.getItem('elibrary_progress');
    if (saved) return JSON.parse(saved);
    // Initial sample progress
    return {
      'user_1_book_1': {
        bookId: 'book_1',
        currentPage: 3,
        totalPages: 5,
        progressPercentage: 60,
        lastReadAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        bookmarks: [2]
      },
      'user_1_book_3': {
        bookId: 'book_3',
        currentPage: 4,
        totalPages: 5,
        progressPercentage: 80,
        lastReadAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        bookmarks: [1, 3]
      }
    };
  });

  // Saved books per user
  const [savedBooksMap, setSavedBooksMap] = useState<Record<string, SavedBook[]>>(() => {
    const saved = localStorage.getItem('elibrary_saved');
    if (saved) return JSON.parse(saved);
    return {
      'user_1': [
        { bookId: 'book_1', savedAt: new Date(Date.now() - 86400000 * 4).toISOString(), status: 'reading' },
        { bookId: 'book_2', savedAt: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'saved' },
        { bookId: 'book_3', savedAt: new Date(Date.now() - 86400000 * 6).toISOString(), status: 'reading' },
        { bookId: 'book_12', savedAt: new Date(Date.now() - 86400000 * 12).toISOString(), status: 'finished' }
      ]
    };
  });

  const savedBooks = currentUser ? savedBooksMap[currentUser.id] || [] : [];

  // Chats & Messages
  const [conversations, setConversations] = useState<ChatConversation[]>(() => {
    const saved = localStorage.getItem('elibrary_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('elibrary_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('elibrary_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Apply dark mode class to HTML root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('elibrary_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('elibrary_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Sync language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('elibrary_lang', lang);
    if (currentUser) {
      updateUserProfile({ language: lang });
    }
  };

  const t = translations[language];

  // Persist storage helpers
  useEffect(() => {
    localStorage.setItem('elibrary_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('elibrary_current_user_id', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('elibrary_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('elibrary_progress', JSON.stringify(readingProgress));
  }, [readingProgress]);

  useEffect(() => {
    localStorage.setItem('elibrary_saved', JSON.stringify(savedBooksMap));
  }, [savedBooksMap]);

  useEffect(() => {
    localStorage.setItem('elibrary_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('elibrary_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('elibrary_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Show Toast
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3600);
  };

  // Auth functions
  const login = (nicknameOrEmail: string): boolean => {
    const query = nicknameOrEmail.trim().toLowerCase();
    const found = allUsers.find(
      u => u.nickname.toLowerCase() === query || u.email.toLowerCase() === query
    );
    if (found) {
      if (found.status === 'suspended') {
        showToast(language === 'uz' ? 'Hisobingiz vaqtincha bloklangan' : 'Ваш аккаунт заблокирован', 'error');
        return false;
      }
      setCurrentUserId(found.id);
      setLanguageState(found.language);
      showToast(language === 'uz' ? `Xush kelibsiz, ${found.nickname}!` : `Добро пожаловать, ${found.nickname}!`);
      setAuthModalOpen(false);
      return true;
    }
    showToast(language === 'uz' ? 'Foydalanuvchi topilmadi' : 'Пользователь не найден', 'error');
    return false;
  };

  const logout = () => {
    setCurrentUserId('');
    showToast(language === 'uz' ? 'Tizimdan muvaffaqiyatli chiqdingiz' : 'Вы вышли из системы', 'info');
    setActiveView('home');
  };

  const registerUser = (data: { nickname: string; name: string; email: string; bio?: string }) => {
    let cleanNick = data.nickname.trim();
    if (!cleanNick.startsWith('@')) {
      cleanNick = `@${cleanNick}`;
    }

    // Check unique nickname
    const exists = allUsers.some(
      u => u.nickname.toLowerCase() === cleanNick.toLowerCase()
    );
    if (exists) {
      return { success: false, error: t.auth.nicknameTaken };
    }

    const newUser: User = {
      id: 'user_' + Date.now(),
      nickname: cleanNick,
      name: data.name.trim(),
      email: data.email.trim(),
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80`,
      bio: data.bio || (language === 'uz' ? 'eLibrary yangi a\'zosi.' : 'Новый участник eLibrary.'),
      language: language,
      role: 'student',
      status: 'active',
      joinedDate: new Date().toISOString().split('T')[0],
      booksReadCount: 0
    };

    setAllUsers(prev => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    setAuthModalOpen(false);
    showToast(t.auth.registerSubtitle, 'success');
    setActiveView('dashboard');
    return { success: true };
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    setAllUsers(prev =>
      prev.map(u => (u.id === currentUser.id ? { ...u, ...updates } : u))
    );
    showToast(t.profileUpdated, 'success');
  };

  const switchUser = (userId: string) => {
    const target = allUsers.find(u => u.id === userId);
    if (target) {
      setCurrentUserId(target.id);
      setLanguageState(target.language);
      showToast(`${language === 'uz' ? 'Foydalanuvchi almashtirildi:' : 'Переключено на:'} ${target.nickname}`, 'info');
    }
  };

  const toggleUserStatus = (userId: string) => {
    setAllUsers(prev =>
      prev.map(u => {
        if (u.id === userId) {
          const nextStatus = u.status === 'active' ? 'suspended' : 'active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    showToast(language === 'uz' ? 'Talaba holati yangilandi' : 'Статус студента обновлен', 'info');
  };

  // Books CRUD
  const addBook = (newBookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...newBookData,
      id: 'book_' + Date.now(),
      rating: 5.0,
      readersCount: 1,
      isNew: true
    };
    setBooks(prev => [newBook, ...prev]);
    showToast(language === 'uz' ? 'Yangi kitob muvaffaqiyatli qo\'shildi ✓' : 'Новая книга успешно добавлена ✓', 'success');

    // Notify all users about new book
    const notif: NotificationItem = {
      id: 'notif_' + Date.now(),
      userId: currentUser?.id || 'user_1',
      type: 'book',
      title: language === 'uz' ? 'Yangi kitob qo\'shildi' : 'Добавлена новая книга',
      message: `"${newBook.title}" (${newBook.author})`,
      createdAt: new Date().toISOString(),
      read: false,
      actionView: 'book-details',
      actionId: newBook.id
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks(prev => prev.map(b => (b.id === id ? { ...b, ...updates } : b)));
    showToast(language === 'uz' ? 'Kitob ma\'lumotlari yangilandi ✓' : 'Данные книги обновлены ✓', 'success');
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
    showToast(language === 'uz' ? 'Kitob o\'chirildi' : 'Книга удалена', 'info');
  };

  // Reading progress
  const updateReadingProgress = (bookId: string, page: number, totalPages: number) => {
    if (!currentUser) return;
    const key = `${currentUser.id}_${bookId}`;
    const percentage = Math.min(100, Math.round((page / totalPages) * 100));

    setReadingProgress(prev => {
      const existing = prev[key];
      return {
        ...prev,
        [key]: {
          userId: currentUser.id,
          bookId,
          currentPage: page,
          totalPages,
          progressPercentage: percentage,
          lastReadAt: new Date().toISOString(),
          bookmarks: existing ? existing.bookmarks : []
        }
      };
    });

    // Also update saved book status
    setSavedBooksMap(prev => {
      const userList = prev[currentUser.id] || [];
      const index = userList.findIndex(sb => sb.bookId === bookId);
      const isFin = percentage >= 100;
      if (index >= 0) {
        const updated = [...userList];
        updated[index] = {
          ...updated[index],
          status: isFin ? 'finished' : 'reading'
        };
        return { ...prev, [currentUser.id]: updated };
      } else {
        return {
          ...prev,
          [currentUser.id]: [
            ...userList,
            { bookId, savedAt: new Date().toISOString(), status: isFin ? 'finished' : 'reading' }
          ]
        };
      }
    });

    if (percentage >= 100) {
      showToast(t.reader.finishedCongrats, 'success');
    }
  };

  const addBookmark = (bookId: string, page: number) => {
    if (!currentUser) return;
    const key = `${currentUser.id}_${bookId}`;
    setReadingProgress(prev => {
      const existing = prev[key] || {
        bookId,
        currentPage: page,
        totalPages: 5,
        progressPercentage: 20,
        lastReadAt: new Date().toISOString(),
        bookmarks: []
      };
      if (existing.bookmarks.includes(page)) return prev;
      return {
        ...prev,
        [key]: {
          ...existing,
          bookmarks: [...existing.bookmarks, page]
        }
      };
    });
    showToast(t.bookmarkAdded, 'success');
  };

  const removeBookmark = (bookId: string, page: number) => {
    if (!currentUser) return;
    const key = `${currentUser.id}_${bookId}`;
    setReadingProgress(prev => {
      const existing = prev[key];
      if (!existing) return prev;
      return {
        ...prev,
        [key]: {
          ...existing,
          bookmarks: existing.bookmarks.filter(p => p !== page)
        }
      };
    });
    showToast(language === 'uz' ? 'Xatcho\'p olib tashlandi' : 'Закладка удалена', 'info');
  };

  const toggleSaveBook = (bookId: string): boolean => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return false;
    }
    const userList = savedBooksMap[currentUser.id] || [];
    const exists = userList.some(sb => sb.bookId === bookId);

    if (exists) {
      setSavedBooksMap(prev => ({
        ...prev,
        [currentUser.id]: (prev[currentUser.id] || []).filter(sb => sb.bookId !== bookId)
      }));
      showToast(t.bookRemovedSuccess, 'info');
      return false;
    } else {
      setSavedBooksMap(prev => ({
        ...prev,
        [currentUser.id]: [
          ...(prev[currentUser.id] || []),
          { bookId, savedAt: new Date().toISOString(), status: 'saved' }
        ]
      }));
      showToast(t.bookAddedSuccess, 'success');
      return true;
    }
  };

  const isBookSaved = (bookId: string): boolean => {
    if (!currentUser) return false;
    const userList = savedBooksMap[currentUser.id] || [];
    return userList.some(sb => sb.bookId === bookId);
  };

  const markBookFinished = (bookId: string) => {
    if (!currentUser) return;
    const targetBook = books.find(b => b.id === bookId);
    const totalPages = targetBook?.pagesCount || 5;
    updateReadingProgress(bookId, totalPages, totalPages);
  };

  // Messaging
  const sendMessage = (chatId: string, content: string) => {
    if (!currentUser || !content.trim()) return;

    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      chatId,
      senderId: currentUser.id,
      content: content.trim(),
      createdAt: new Date().toISOString(),
      read: true
    };

    setMessages(prev => [...prev, newMsg]);

    // Update conversation
    setConversations(prev =>
      prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: newMsg,
            updatedAt: newMsg.createdAt
          };
        }
        return c;
      })
    );

    // Contextual auto-reply simulation for rich interactivity
    const activeConv = conversations.find(c => c.id === chatId);
    if (activeConv) {
      const otherUserId = activeConv.participantIds.find(id => id !== currentUser.id);
      const otherUser = allUsers.find(u => u.id === otherUserId);

      if (otherUser) {
        setTimeout(() => {
          let replyContent = '';
          if (activeConv.type === 'librarian') {
            replyContent = language === 'uz'
              ? `Assalomu alaykum, ${currentUser.name}! Murojaatingiz qabul qilindi. Kutubxona elektron katalogidan so'rovingizga mos qo'shimcha adabiyotlarni tayyorlab beramiz.`
              : `Здравствуйте, ${currentUser.name}! Ваше обращение принято. Мы проверяем наличие запрашиваемых материалов в электронном фонде.`;
          } else {
            const replies = language === 'uz' ? [
              `Ajoyib fikr! Men ham aynan shu mavzudagi kitobni o'qiyotgan edim.`,
              `Rahmat! Ushbu kitob bo'yicha yana qanday tavsiyalaringiz bor?`,
              `Salom! eLibrary orqali fikr almashayotganimizdan xursandman!`
            ] : [
              `Отличная мысль! Я как раз недавно читал похожую главу.`,
              `Спасибо за рекомендацию! Обязательно добавлю эту книгу в свою библиотеку.`,
              `Привет! Здорово, что мы можем обсуждать прочитанное прямо здесь!`
            ];
            replyContent = replies[Math.floor(Math.random() * replies.length)];
          }

          const replyMsg: ChatMessage = {
            id: 'msg_' + Date.now(),
            chatId,
            senderId: otherUser.id,
            content: replyContent,
            createdAt: new Date().toISOString(),
            read: false
          };

          setMessages(m => [...m, replyMsg]);
          setConversations(convs =>
            convs.map(c =>
              c.id === chatId
                ? { ...c, lastMessage: replyMsg, unreadCount: c.unreadCount + 1, updatedAt: replyMsg.createdAt }
                : c
            )
          );

          // Add notification
          setNotifications(n => [
            {
              id: 'notif_' + Date.now(),
              userId: currentUser.id,
              type: activeConv.type === 'librarian' ? 'librarian' : 'chat',
              title: `${otherUser.nickname} ${language === 'uz' ? 'xabar yozdi' : 'написал(а) вам'}`,
              message: replyContent.slice(0, 55) + '...',
              createdAt: new Date().toISOString(),
              read: false,
              actionView: 'chat',
              actionId: chatId
            },
            ...n
          ]);
        }, 1200);
      }
    }
  };

  const startOrGetChatWithStudent = (targetUserId: string): string => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return '';
    }

    const existing = conversations.find(
      c => c.participantIds.includes(currentUser.id) && c.participantIds.includes(targetUserId)
    );

    if (existing) {
      setSelectedChatId(existing.id);
      setActiveView('chat');
      return existing.id;
    }

    const newChatId = 'chat_' + Date.now();
    const newConv: ChatConversation = {
      id: newChatId,
      type: 'direct',
      participantIds: [currentUser.id, targetUserId],
      unreadCount: 0,
      updatedAt: new Date().toISOString()
    };

    setConversations(prev => [newConv, ...prev]);
    setSelectedChatId(newChatId);
    setActiveView('chat');
    return newChatId;
  };

  const contactLibrarian = (subject: string, userMessage: string): string => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return '';
    }

    const librarian = allUsers.find(u => u.role === 'admin') || allUsers[allUsers.length - 1];
    const existing = conversations.find(
      c => c.type === 'librarian' && c.participantIds.includes(currentUser.id)
    );

    let chatId = existing?.id;
    if (!chatId) {
      chatId = 'chat_lib_' + Date.now();
      const newConv: ChatConversation = {
        id: chatId,
        type: 'librarian',
        participantIds: [currentUser.id, librarian.id],
        unreadCount: 0,
        updatedAt: new Date().toISOString()
      };
      setConversations(prev => [newConv, ...prev]);
    }

    const formattedContent = `[${subject}]: ${userMessage}`;
    sendMessage(chatId, formattedContent);
    showToast(t.librarianModal.successMsg, 'success');
    setSelectedChatId(chatId);
    setLibrarianModalOpen(false);
    return chatId;
  };

  const markChatRead = (chatId: string) => {
    setConversations(prev =>
      prev.map(c => (c.id === chatId ? { ...c, unreadCount: 0 } : c))
    );
    setMessages(prev =>
      prev.map(m => (m.chatId === chatId ? { ...m, read: true } : m))
    );
  };

  // Notifications helpers
  const unreadNotifsCount = notifications.filter(n => !n.read && n.userId === currentUser?.id).length;

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    if (!currentUser) return;
    setNotifications(prev =>
      prev.map(n => (n.userId === currentUser.id ? { ...n, read: true } : n))
    );
    showToast(language === 'uz' ? 'Barcha bildirishnomalar o\'qildi' : 'Все уведомления прочитаны', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        darkMode,
        toggleDarkMode,
        currentUser,
        allUsers,
        login,
        logout,
        registerUser,
        updateUserProfile,
        switchUser,
        toggleUserStatus,
        activeView,
        setActiveView,
        selectedBookId,
        setSelectedBookId,
        selectedChatId,
        setSelectedChatId,
        selectedUserId,
        setSelectedUserId,
        globalSearch,
        setGlobalSearch,
        books,
        addBook,
        updateBook,
        deleteBook,
        selectedCategory,
        setSelectedCategory,
        readingProgress,
        updateReadingProgress,
        addBookmark,
        removeBookmark,
        savedBooks,
        toggleSaveBook,
        isBookSaved,
        markBookFinished,
        conversations,
        messages,
        sendMessage,
        startOrGetChatWithStudent,
        contactLibrarian,
        markChatRead,
        notifications,
        unreadNotifsCount,
        markNotificationRead,
        markAllNotificationsRead,
        toasts,
        showToast,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        librarianModalOpen,
        setLibrarianModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
