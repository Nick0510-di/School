import React from 'react';
import { useApp } from '../../context/AppContext';
import { ReadingProgress } from '../../types';
import { BookCard } from '../books/BookCard';
import {
  BookOpen,
  Bookmark,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  ArrowRight,
  Sparkles,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';

export const DashboardView: React.FC = () => {
  const {
    t,
    currentUser,
    books,
    readingProgress,
    savedBookIds,
    setActiveView,
    setSelectedBookId,
    setAuthModalOpen
  } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {t.dashboard.pageTitle}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t.myLibrary.loginRequiredDesc}
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

  // Find book user was reading most recently
  const userProgressEntries = (Object.values(readingProgress) as ReadingProgress[]).filter(p => p.userId === currentUser.id);
  const activeProgress = userProgressEntries.sort((a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime())[0];
  const activeBook = activeProgress ? books.find(b => b.id === activeProgress.bookId) : books[0];
  const activePercent = activeProgress ? activeProgress.progressPercentage : 0;

  // Stats
  const completedCount = userProgressEntries.filter(p => p.progressPercentage >= 100).length;
  const inProgressCount = userProgressEntries.filter(p => p.progressPercentage > 0 && p.progressPercentage < 100).length;
  const streak = 7;
  const readingHours = Math.round(userProgressEntries.reduce((sum: number, p: ReadingProgress) => sum + (p.progressPercentage * 0.1), 4.2));

  // Personalized recommendations (based on interests or top rated)
  const recommendations = books.filter(b => b.rating >= 4.8).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {currentUser.nickname} • {currentUser.faculty}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            {t.dashboard.welcomeBack}, {currentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.dashboard.pageSubtitle}
          </p>
        </div>

        <button
          onClick={() => setActiveView('library')}
          className="self-start sm:self-auto px-4 py-2 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>{t.home.exploreBooksBtn}</span>
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {inProgressCount}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.dashboard.inProgress}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {completedCount}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.dashboard.completed}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {streak} {t.days}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.dashboard.currentStreak}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {readingHours} {t.hours}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.dashboard.hoursRead}
            </div>
          </div>
        </div>
      </div>

      {/* Active Book Resume Banner */}
      {activeBook && (
        <div className="relative bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-indigo-700/50">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <img
                src={activeBook.cover}
                alt={activeBook.title}
                className="w-24 h-34 rounded-xl object-cover shadow-lg ring-2 ring-white/20"
              />
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 uppercase tracking-wider">
                  {t.dashboard.inProgress}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold line-clamp-1">
                  {activeBook.title}
                </h3>
                <p className="text-xs sm:text-sm text-indigo-200">
                  {activeBook.author}
                </p>
                <div className="w-full max-w-xs space-y-1 pt-1">
                  <div className="flex justify-between text-xs font-semibold text-indigo-200">
                    <span>{t.myLibrary.progressLabel}</span>
                    <span>{activePercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${activePercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedBookId(activeBook.id);
                setActiveView('reader');
              }}
              className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl text-sm hover:bg-indigo-50 shadow-lg transition-all shrink-0 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.continueReading}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Recommended for you */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <span>{t.dashboard.recommendedForYou}</span>
          </h2>
          <button
            onClick={() => setActiveView('library')}
            className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {t.viewAll} →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};
