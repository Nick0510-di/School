import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Users,
  MessageSquare,
  GraduationCap,
  Sparkles,
  BookOpen,
  Eye,
  CheckCircle2,
  Send
} from 'lucide-react';
import { motion } from 'motion/react';

export const CommunityView: React.FC = () => {
  const {
    t,
    allUsers,
    currentUser,
    setSelectedUserId,
    setActiveView,
    startDirectChat,
    setAuthModalOpen
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('all');

  // List of distinct faculties
  const faculties = useMemo(() => {
    const set = new Set<string>();
    allUsers.forEach(u => {
      if (u.faculty) set.add(u.faculty);
    });
    return Array.from(set);
  }, [allUsers]);

  // Filter users
  const filteredUsers = useMemo(() => {
    return allUsers.filter(u => {
      // Don't hide the user, but maybe label (You)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchNick = u.nickname.toLowerCase().includes(q);
        const matchName = u.name.toLowerCase().includes(q);
        const matchMajor = u.major?.toLowerCase().includes(q) || false;
        const matchInterests = u.interests?.some(i => i.toLowerCase().includes(q)) || false;
        if (!matchNick && !matchName && !matchMajor && !matchInterests) return false;
      }

      if (facultyFilter !== 'all' && u.faculty !== facultyFilter) {
        return false;
      }

      return true;
    });
  }, [allUsers, searchQuery, facultyFilter]);

  const handleStartChat = (e: React.MouseEvent, targetUserId: string) => {
    e.stopPropagation();
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    startDirectChat(targetUserId);
  };

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId);
    setActiveView('profile');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
          <span>eLibrary</span>
          <span>/</span>
          <span>{t.nav.community}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t.community.pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          {t.community.pageSubtitle}
        </p>
      </div>

      {/* Search & Faculty Filter */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          <div className="sm:col-span-8 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.community.searchPlaceholder}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={facultyFilter}
              onChange={e => setFacultyFilter(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">{t.community.allFaculties}</option>
              {faculties.map(fac => (
                <option key={fac} value={fac}>{fac}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => {
          const isMe = currentUser?.id === user.id;

          return (
            <motion.div
              key={user.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleViewProfile(user.id)}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/60 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header Profile Row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.nickname}
                      className="w-13 h-13 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-sm"
                    />
                    {user.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {user.name}
                      </h3>
                      {isMe && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                          {t.community.youBadge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                      {user.nickname}
                    </div>
                  </div>
                </div>

                {/* Faculty and Major */}
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-3 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl">
                  <GraduationCap className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="truncate">
                    {user.faculty} • {user.major} ({user.year}-kurs)
                  </span>
                </div>

                {/* Interests Tags */}
                {user.interests && user.interests.length > 0 && (
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      {t.community.readingInterests}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {user.interests.slice(0, 3).map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
                        >
                          #{interest}
                        </span>
                      ))}
                      {user.interests.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
                          +{user.interests.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: Message & View Profile */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleViewProfile(user.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.community.viewProfile}</span>
                </button>

                {!isMe && (
                  <button
                    type="button"
                    onClick={e => handleStartChat(e, user.id)}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <Send className="w-3 h-3" />
                    <span>{t.community.sendMessage}</span>
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
