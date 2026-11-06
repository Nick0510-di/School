import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ReadingProgress } from '../../types';
import { BookCard } from '../books/BookCard';
import {
  Bookmark,
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  ArrowRight,
  Sparkles,
  Library
} from 'lucide-react';

export const MyLibraryView: React.FC = () => {
  const {
    t,
    currentUser,
    savedBookIds,
    books,
    readingProgress,
    setActiveView,
    setSelectedBookId,
    setAuthModalOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'completed'>('all');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
          <Bookmark className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {t.myLibrary.pageTitle}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {t.myLibrary.loginRequiredDesc}
        </p>
        <button
          onClick={() => setAuthModalOpen(true)}
          className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-600/20"
        >
          {t.nav.login}
        </button>
      </div>
    );
  }

  // Get user's saved books
  const savedBooks = books.filter(b => savedBookIds.includes(b.id));

  // Partition into reading and completed
  const booksWithProgress = savedBooks.map(book => {
    const key = `${currentUser.id}_${book.id}`;
    const prog = readingProgress[key];
    const percentage = prog ? prog.progressPercentage : 0;
    const isCompleted = percentage >= 100;
    const isReading = percentage > 0 && percentage < 100;

    return {
      book,
      percentage,
      isCompleted,
      isReading,
      lastReadAt: prog?.lastReadAt
    };
  });

  const currentlyReadingList = booksWithProgress.filter(item => item.isReading);
  const completedList = booksWithProgress.filter(item => item.isCompleted);

  const displayedBooks = activeTab === 'all'
    ? savedBooks
    : activeTab === 'reading'
    ? currentlyReadingList.map(i => i.book)
    : completedList.map(i => i.book);

  // Compute stats
  const totalBooksCompleted = completedList.length;
  const streakDays = 7; // student streak
  const totalHours = Math.round(
    (Object.values(readingProgress) as ReadingProgress[])
      .filter(p => p.userId === currentUser.id)
      .reduce((acc: number, curr: ReadingProgress) => acc + (curr.progressPercentage * 0.08), 3.5)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
          <span>{currentUser.nickname}</span>
          <span>/</span>
          <span>{t.nav.myLibrary}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t.myLibrary.pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.myLibrary.pageSubtitle}
        </p>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {totalBooksCompleted}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.myLibrary.booksCompleted}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {streakDays} {t.days}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.myLibrary.readingStreak}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {totalHours} {t.hours}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.myLibrary.hoursSpent}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'all'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>{t.myLibrary.tabAllSaved}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {savedBooks.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('reading')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'reading'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>{t.myLibrary.tabCurrentlyReading}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {currentlyReadingList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'completed'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>{t.myLibrary.tabCompleted}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {completedList.length}
          </span>
        </button>
      </div>

      {/* Books Display */}
      {displayedBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
            <Library className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {t.myLibrary.emptyTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {t.myLibrary.emptyDesc}
          </p>
          <button
            onClick={() => setActiveView('library')}
            className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.home.exploreBooksBtn}</span>
          </button>
        </div>
      )}
    </div>
  );
};
