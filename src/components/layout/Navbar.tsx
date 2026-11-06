import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import {
  Search,
  BookOpen,
  Bookmark,
  Users,
  MessageSquare,
  LayoutDashboard,
  Shield,
  Bell,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  LogOut,
  User as UserIcon,
  HelpCircle,
  Check,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    darkMode,
    toggleDarkMode,
    currentUser,
    logout,
    activeView,
    setActiveView,
    globalSearch,
    setGlobalSearch,
    conversations,
    notifications,
    unreadNotifsCount,
    markNotificationRead,
    markAllNotificationsRead,
    setAuthModalOpen,
    setAuthModalTab,
    setLibrarianModalOpen,
    setSelectedBookId,
    setSelectedChatId,
    setSelectedUserId,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Total unread messages
  const totalUnreadMessages = conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      setActiveView('library');
    }
  };

  const navItemClass = (view: string) => `
    flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all
    ${activeView === view
      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 shadow-xs'
      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
    }
  `;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 md:gap-4">
          
          {/* Logo & Main Navigation */}
          <div className="flex items-center gap-3 lg:gap-6">
            <button
              onClick={() => setActiveView('home')}
              className="text-left focus:outline-none rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <Logo size="md" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                id="nav-link-home"
                onClick={() => setActiveView('home')}
                className={navItemClass('home')}
              >
                {t.nav.home}
              </button>

              <button
                id="nav-link-library"
                onClick={() => {
                  setActiveView('library');
                }}
                className={navItemClass('library')}
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.nav.library}</span>
              </button>

              <button
                id="nav-link-my-library"
                onClick={() => {
                  if (!currentUser) setAuthModalOpen(true);
                  else setActiveView('my-library');
                }}
                className={navItemClass('my-library')}
              >
                <Bookmark className="w-4 h-4" />
                <span>{t.nav.myLibrary}</span>
              </button>

              <button
                id="nav-link-community"
                onClick={() => setActiveView('students')}
                className={navItemClass('students')}
              >
                <Users className="w-4 h-4" />
                <span>{t.nav.community}</span>
              </button>

              <button
                id="nav-link-messages"
                onClick={() => {
                  if (!currentUser) setAuthModalOpen(true);
                  else setActiveView('chat');
                }}
                className={`relative ${navItemClass('chat')}`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.nav.messages}</span>
                {totalUnreadMessages > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>

              {currentUser?.role === 'admin' && (
                <button
                  id="nav-link-admin"
                  onClick={() => setActiveView('admin')}
                  className={`relative ${navItemClass('admin')} text-indigo-700 dark:text-indigo-300 font-bold`}
                >
                  <Shield className="w-4 h-4 text-indigo-500" />
                  <span>{t.nav.adminPanel}</span>
                </button>
              )}
            </nav>
          </div>

          {/* Search & Actions Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:block relative w-44 md:w-56 lg:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 rounded-xl text-xs sm:text-sm border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
              />
            </form>

            {/* Contact Librarian quick icon button */}
            <button
              id="btn-contact-librarian-header"
              onClick={() => setLibrarianModalOpen(true)}
              title={t.nav.contactLibrarian}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors hidden md:flex items-center gap-1.5 text-xs font-semibold"
            >
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              <span className="hidden xl:inline">{t.nav.contactLibrarian}</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                id="btn-lang-selector"
                onClick={() => setLangDropdownOpen(prev => !prev)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={t.nav.language}
              >
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-1 z-50 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        setLanguage('uz');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                        language === 'uz'
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>🇺🇿</span>
                        <span>O'zbekcha</span>
                      </span>
                      {language === 'uz' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>

                    <button
                      onClick={() => {
                        setLanguage('ru');
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                        language === 'ru'
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>🇷🇺</span>
                        <span>Русский</span>
                      </span>
                      {language === 'ru' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="btn-dark-mode-toggle"
              onClick={toggleDarkMode}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              title={darkMode ? t.nav.lightMode : t.nav.darkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Notifications Dropdown */}
            {currentUser && (
              <div className="relative" ref={notifRef}>
                <button
                  id="btn-notifications"
                  onClick={() => setNotifDropdownOpen(prev => !prev)}
                  className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  title={t.nav.notifications}
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifsCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
                  )}
                </button>

                <AnimatePresence>
                  {notifDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-3 z-50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-700/80">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            {t.notifications.title}
                          </span>
                          {unreadNotifsCount > 0 && (
                            <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full">
                              {unreadNotifsCount}
                            </span>
                          )}
                        </div>
                        {unreadNotifsCount > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                          >
                            {t.notifications.markAllAsRead}
                          </button>
                        )}
                      </div>

                      <div className="max-h-80 overflow-y-auto space-y-1.5">
                        {notifications.length === 0 ? (
                          <div className="py-6 text-center text-xs text-slate-400">
                            {t.notifications.noNotificationsTitle}
                          </div>
                        ) : (
                          notifications.slice(0, 8).map(notif => (
                            <div
                              key={notif.id}
                              onClick={() => {
                                markNotificationRead(notif.id);
                                if (notif.actionView === 'chat' && notif.actionId) {
                                  setSelectedChatId(notif.actionId);
                                  setActiveView('chat');
                                } else if (notif.actionView === 'book-details' && notif.actionId) {
                                  setSelectedBookId(notif.actionId);
                                  setActiveView('book-details');
                                }
                                setNotifDropdownOpen(false);
                              }}
                              className={`p-2.5 rounded-xl cursor-pointer transition-colors text-left ${
                                notif.read
                                  ? 'hover:bg-slate-50 dark:hover:bg-slate-700/40 text-slate-600 dark:text-slate-400'
                                  : 'bg-indigo-50/70 dark:bg-indigo-950/40 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/50 text-slate-900 dark:text-slate-100 font-medium'
                              }`}
                            >
                              <div className="flex items-center justify-between text-xs font-semibold mb-0.5">
                                <span className="truncate">{notif.title}</span>
                                <span className="text-[10px] text-slate-400 font-normal shrink-0 ml-2">
                                  {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                                {notif.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Profile Avatar / Login Button */}
            {currentUser ? (
              <div className="relative" ref={profileRef}>
                <button
                  id="btn-user-profile-menu"
                  onClick={() => setProfileDropdownOpen(prev => !prev)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.nickname}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/30"
                  />
                  <div className="hidden sm:flex flex-col text-left leading-none">
                    <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                      {currentUser.nickname}
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 capitalize">
                      {currentUser.role === 'admin' ? t.admin.title.split(' ')[0] : t.community.pageTitle.split(' ')[0]}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-1.5 z-50"
                    >
                      <div className="px-3 py-2 mb-1 border-b border-slate-100 dark:border-slate-700/80">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {currentUser.name}
                        </div>
                        <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                          {currentUser.nickname}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedUserId(currentUser.id);
                          setActiveView('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-indigo-500" />
                        <span>{t.nav.profile}</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveView('dashboard');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                        <span>{t.nav.dashboard}</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveView('my-library');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                      >
                        <Bookmark className="w-4 h-4 text-indigo-500" />
                        <span>{t.nav.myLibrary}</span>
                      </button>

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            setActiveView('admin');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl transition-colors"
                        >
                          <Shield className="w-4 h-4" />
                          <span>{t.nav.adminPanel}</span>
                        </button>
                      )}

                      <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-700/80">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t.nav.logout}</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setAuthModalTab('login');
                    setAuthModalOpen(true);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => {
                    setAuthModalTab('register');
                    setAuthModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-colors"
                >
                  {t.nav.register}
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800 py-3 space-y-2"
            >
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative mb-3">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={globalSearch}
                  onChange={e => setGlobalSearch(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-sm border-none focus:ring-2 focus:ring-indigo-500"
                />
              </form>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => {
                    setActiveView('home');
                    setMobileMenuOpen(false);
                  }}
                  className={navItemClass('home')}
                >
                  {t.nav.home}
                </button>

                <button
                  onClick={() => {
                    setActiveView('library');
                    setMobileMenuOpen(false);
                  }}
                  className={navItemClass('library')}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t.nav.library}</span>
                </button>

                <button
                  onClick={() => {
                    if (!currentUser) setAuthModalOpen(true);
                    else setActiveView('my-library');
                    setMobileMenuOpen(false);
                  }}
                  className={navItemClass('my-library')}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>{t.nav.myLibrary}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveView('students');
                    setMobileMenuOpen(false);
                  }}
                  className={navItemClass('students')}
                >
                  <Users className="w-4 h-4" />
                  <span>{t.nav.community}</span>
                </button>

                <button
                  onClick={() => {
                    if (!currentUser) setAuthModalOpen(true);
                    else setActiveView('chat');
                    setMobileMenuOpen(false);
                  }}
                  className={navItemClass('chat')}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.nav.messages}</span>
                  {totalUnreadMessages > 0 && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 ml-1" />
                  )}
                </button>

                {currentUser && (
                  <button
                    onClick={() => {
                      setActiveView('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className={navItemClass('dashboard')}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{t.nav.dashboard}</span>
                  </button>
                )}

                {currentUser?.role === 'admin' && (
                  <button
                    onClick={() => {
                      setActiveView('admin');
                      setMobileMenuOpen(false);
                    }}
                    className={`${navItemClass('admin')} col-span-2 text-indigo-600 font-bold`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>{t.nav.adminPanel}</span>
                  </button>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setLibrarianModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 py-1"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{t.nav.contactLibrarian}</span>
                </button>

                {currentUser && (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-rose-600 dark:text-rose-400 font-medium py-1"
                  >
                    {t.nav.logout}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
