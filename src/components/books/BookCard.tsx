import React from 'react';
import { Book } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, BookOpen, Bookmark, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface BookCardProps {
  book: Book;
  onRead?: () => void;
  featured?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onRead, featured = false }) => {
  const {
    t,
    toggleSaveBook,
    isBookSaved,
    setSelectedBookId,
    setActiveView,
    readingProgress,
    currentUser
  } = useApp();

  const saved = isBookSaved(book.id);
  const progressKey = currentUser ? `${currentUser.id}_${book.id}` : '';
  const progress = progressKey && readingProgress[progressKey] ? readingProgress[progressKey].progressPercentage : 0;

  const handleCardClick = () => {
    setSelectedBookId(book.id);
    setActiveView('book-details');
  };

  const handleReadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedBookId(book.id);
    if (onRead) {
      onRead();
    } else {
      setActiveView('reader');
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveBook(book.id);
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'uz':
        return '🇺🇿 UZ';
      case 'ru':
        return '🇷🇺 RU';
      case 'en':
        return '🇬🇧 EN';
      default:
        return lang.toUpperCase();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/60 overflow-hidden cursor-pointer transition-all duration-300"
    >
      {/* Book Cover Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges overlay */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-900/80 backdrop-blur-md text-white border border-white/20 shadow-sm">
            {getLanguageLabel(book.language)}
          </span>

          <button
            type="button"
            onClick={handleSaveClick}
            aria-label={saved ? t.removeFromLibrary : t.addToLibrary}
            className={`pointer-events-auto p-2 rounded-xl backdrop-blur-md shadow-md transition-all ${
              saved
                ? 'bg-indigo-600 text-white shadow-indigo-600/30'
                : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-900 hover:text-indigo-600'
            }`}
          >
            {saved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Reading Progress Ribbon if started */}
        {progress > 0 && (
          <div className="absolute bottom-0 inset-x-0 bg-slate-900/85 backdrop-blur-xs p-2">
            <div className="flex items-center justify-between text-[10px] font-semibold text-white mb-1">
              <span>{t.myLibrary.progressLabel}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Book Metadata and Actions */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">
            {t.categories[book.category as keyof typeof t.categories] || book.category}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{book.rating.toFixed(1)}</span>
          </div>
        </div>

        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {book.title}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-2 truncate">
          {book.author}
        </p>

        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4 flex-1">
          {book.description}
        </p>

        {/* Read Button */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            {book.pagesCount} {t.bookDetails.pages.toLowerCase()}
          </span>

          <button
            type="button"
            onClick={handleReadClick}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-indigo-700 dark:text-indigo-300 hover:text-white dark:hover:text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{progress > 0 ? t.continueReading : t.readNow}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
