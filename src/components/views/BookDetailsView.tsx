import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookCard } from '../books/BookCard';
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  Star,
  Users,
  Calendar,
  Layers,
  Globe,
  Share2,
  Check,
  CheckCircle2
} from 'lucide-react';

export const BookDetailsView: React.FC = () => {
  const {
    selectedBookId,
    books,
    setActiveView,
    toggleSaveBook,
    isBookSaved,
    t,
    readingProgress,
    currentUser,
    showToast,
    language
  } = useApp();

  const book = books.find(b => b.id === selectedBookId) || books[0];

  const saved = isBookSaved(book.id);
  const progressKey = currentUser ? `${currentUser.id}_${book.id}` : '';
  const progress = progressKey && readingProgress[progressKey] ? readingProgress[progressKey] : null;

  // Find related books in same category or author
  const relatedBooks = books
    .filter(b => b.id !== book.id && (b.category === book.category || b.language === book.language))
    .slice(0, 4);

  const getLanguageName = (code: string) => {
    switch (code) {
      case 'uz': return '🇺🇿 O\'zbekcha';
      case 'ru': return '🇷🇺 Русский';
      case 'en': return '🇬🇧 English';
      default: return code;
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(language === 'uz' ? 'Kitob havolasi nusxalandi' : 'Ссылка на книгу скопирована', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      
      {/* Top Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveView('library')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back} / {t.nav.library}</span>
        </button>

        <button
          onClick={handleShare}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Details Showcase */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 lg:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Large Cover & Fast Actions */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                {getLanguageName(book.language)}
              </div>
            </div>

            {/* Reading progress banner if started */}
            {progress && progress.progressPercentage > 0 && (
              <div className="w-full max-w-xs mt-4 p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200/80 dark:border-indigo-800/60">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1">
                  <span>{t.reader.progressNote.replace('{percent}', progress.progressPercentage.toString())}</span>
                </div>
                <div className="w-full h-2 bg-indigo-200 dark:bg-indigo-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${progress.progressPercentage}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right: Metadata, Overview, and Primary Controls */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            
            {/* Category & Rating */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                {t.categories[book.category as keyof typeof t.categories] || book.category}
              </span>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{book.rating.toFixed(1)}</span>
                <span className="text-slate-400">/ 5.0</span>
              </div>
            </div>

            {/* Title & Author */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {book.title}
              </h1>
              <p className="text-sm sm:text-lg text-slate-500 dark:text-slate-400 font-medium mt-1">
                {book.author}
              </p>
            </div>

            {/* Quick Spec Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{t.bookDetails.published}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{book.publishYear}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-indigo-500" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{t.bookDetails.pages}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{book.pagesCount}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-indigo-500" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{t.bookDetails.readers}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{book.readersCount.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-indigo-500" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{t.bookDetails.language}</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{getLanguageName(book.language)}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {t.bookDetails.aboutBook}
              </h3>
              <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                id="btn-read-book-details"
                onClick={() => setActiveView('reader')}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition-all hover:gap-3"
              >
                <BookOpen className="w-4 h-4" />
                <span>{progress && progress.progressPercentage > 0 ? t.continueReading : t.bookDetails.startReading}</span>
              </button>

              <button
                id="btn-save-book-details"
                onClick={() => toggleSaveBook(book.id)}
                className={`px-5 py-3 rounded-xl text-sm font-semibold border flex items-center gap-2 transition-all ${
                  saved
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {saved ? <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> : <Bookmark className="w-4 h-4" />}
                <span>{saved ? t.bookDetails.addedToMyList : t.bookDetails.addToMyList}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Books Section */}
      {relatedBooks.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            {t.bookDetails.relatedBooksTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBooks.map(rel => (
              <BookCard key={rel.id} book={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
