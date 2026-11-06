import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ReaderTheme, ReaderFontSize } from '../../types';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  ListOrdered,
  Type,
  Maximize,
  Minimize,
  CheckCircle2,
  BookOpen,
  X,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ReaderView: React.FC = () => {
  const {
    selectedBookId,
    books,
    setActiveView,
    readingProgress,
    updateReadingProgress,
    addBookmark,
    removeBookmark,
    t,
    currentUser,
    darkMode
  } = useApp();

  const book = books.find(b => b.id === selectedBookId) || books[0];
  const totalPages = book.pages?.length || 5;

  // Retrieve saved progress or default to page 1
  const progressKey = currentUser ? `${currentUser.id}_${book.id}` : '';
  const savedProg = progressKey && readingProgress[progressKey] ? readingProgress[progressKey] : null;
  const initialPage = savedProg ? Math.min(savedProg.currentPage, totalPages) : 1;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [theme, setTheme] = useState<ReaderTheme>(() => (darkMode ? 'dark' : 'light'));
  const [fontSize, setFontSize] = useState<ReaderFontSize>('base');
  const [tocOpen, setTocOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync progress on page change
  useEffect(() => {
    updateReadingProgress(book.id, currentPage, totalPages);
  }, [currentPage, book.id, totalPages]);

  // Handle keyboard navigation (Left/Right arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentPage < totalPages) {
        setCurrentPage(p => p + 1);
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        setCurrentPage(p => p - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages]);

  const bookmarks = savedProg ? savedProg.bookmarks : [];
  const isCurrentPageBookmarked = bookmarks.includes(currentPage);
  const progressPercent = Math.round((currentPage / totalPages) * 100);

  // Font size classes
  const fontClasses: Record<ReaderFontSize, string> = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-loose',
    xl: 'text-xl sm:text-2xl leading-loose',
    '2xl': 'text-2xl sm:text-3xl leading-loose'
  };

  // Reader theme styles
  const themeClasses: Record<ReaderTheme, { bg: string; text: string; header: string; border: string }> = {
    light: {
      bg: 'bg-white',
      text: 'text-slate-800',
      header: 'bg-white/90 text-slate-800',
      border: 'border-slate-200'
    },
    dark: {
      bg: 'bg-slate-950',
      text: 'text-slate-200',
      header: 'bg-slate-900/90 text-slate-100',
      border: 'border-slate-800'
    },
    sepia: {
      bg: 'bg-[#FAF6EF]',
      text: 'text-[#433422]',
      header: 'bg-[#F4EFE6]/90 text-[#433422]',
      border: 'border-[#E8DFD0]'
    }
  };

  const currentTheme = themeClasses[theme];
  const currentPageContent = book.pages && book.pages[currentPage - 1]
    ? book.pages[currentPage - 1]
    : `Bob / Sahifa ${currentPage}\n\nUshbu sahifa matni yuklanmoqda... Mutolaa orqali yangi bilimlarni egallang.`;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${currentTheme.bg} ${currentTheme.text} transition-colors duration-200 relative`}>
      
      {/* 1. Top Reading Bar */}
      <header className={`sticky top-0 z-30 w-full px-4 sm:px-6 py-3 border-b ${currentTheme.border} ${currentTheme.header} backdrop-blur-md flex items-center justify-between gap-3`}>
        {/* Left: Exit to Details */}
        <button
          onClick={() => setActiveView('book-details')}
          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          title={t.reader.returnToDetails}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{t.back}</span>
        </button>

        {/* Center: Book Title & Chapter indicator */}
        <div className="flex flex-col items-center text-center max-w-xs sm:max-w-md truncate">
          <h2 className="text-xs sm:text-sm font-bold truncate">
            {book.title}
          </h2>
          <span className="text-[11px] opacity-70">
            {t.reader.page} {currentPage} {t.reader.of} {totalPages} ({progressPercent}%)
          </span>
        </div>

        {/* Right: Controls (Theme, Font, TOC, Bookmark, Fullscreen) */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Bookmark Button */}
          <button
            onClick={() => {
              if (isCurrentPageBookmarked) {
                removeBookmark(book.id, currentPage);
              } else {
                addBookmark(book.id, currentPage);
              }
            }}
            className={`p-2 rounded-lg transition-colors ${
              isCurrentPageBookmarked
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60'
                : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-70'
            }`}
            title={isCurrentPageBookmarked ? t.reader.removeBookmark : t.reader.addBookmark}
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* Table of Contents Drawer Toggle */}
          <button
            onClick={() => setTocOpen(true)}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-70 hover:opacity-100"
            title={t.reader.tableOfContents}
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          {/* Font Size Selector */}
          <div className="relative group">
            <button
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-70 hover:opacity-100 flex items-center"
              title={t.reader.fontSize}
            >
              <Type className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-full mt-1 hidden group-hover:flex items-center gap-1 p-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50">
              {(['sm', 'base', 'lg', 'xl'] as ReaderFontSize[]).map(size => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    fontSize === size
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Switcher: Light / Dark / Sepia */}
          <div className="flex items-center gap-1 bg-black/5 dark:bg-white/10 p-1 rounded-xl">
            <button
              onClick={() => setTheme('light')}
              className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center font-bold transition-colors ${
                theme === 'light' ? 'bg-white text-slate-900 shadow-xs' : 'opacity-60'
              }`}
              title={t.reader.themeLight}
            >
              A
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center font-bold bg-[#FAF6EF] text-[#433422] transition-colors ${
                theme === 'sepia' ? 'ring-2 ring-amber-600 shadow-xs' : 'opacity-60'
              }`}
              title={t.reader.themeSepia}
            >
              A
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center font-bold bg-slate-900 text-slate-100 transition-colors ${
                theme === 'dark' ? 'ring-2 ring-indigo-500 shadow-xs' : 'opacity-60'
              }`}
              title={t.reader.themeDark}
            >
              A
            </button>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-70 hover:opacity-100 hidden sm:block"
            title={isFullscreen ? t.reader.exitFullscreen : t.reader.fullscreen}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 2. Top Progress Ribbon */}
      <div className="w-full h-1 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 3. Main Reading Content Pane */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 sm:px-12 py-10 sm:py-16 flex flex-col justify-between">
        <div className="space-y-6">
          
          {/* Progress Toast Banner */}
          <div className="flex items-center justify-between text-xs opacity-60 pb-4 border-b border-black/10 dark:border-white/10">
            <span>{t.reader.progressNote.replace('{percent}', progressPercent.toString())}</span>
            {isCurrentPageBookmarked && (
              <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>{t.bookmarkAdded}</span>
              </span>
            )}
          </div>

          {/* Book Page Text */}
          <article className={`font-reader-serif ${fontClasses[fontSize]} whitespace-pre-line tracking-normal select-text`}>
            {currentPageContent}
          </article>
        </div>

        {/* Finished Congratulation State if at last page */}
        {currentPage === totalPages && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-6 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-indigo-900 dark:text-indigo-100">
              {t.reader.finishedCongrats}
            </h3>
            <p className="text-xs text-indigo-700 dark:text-indigo-300">
              {book.title} ({book.author})
            </p>
            <button
              onClick={() => setActiveView('my-library')}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-xs"
            >
              {t.nav.myLibrary}
            </button>
          </motion.div>
        )}
      </main>

      {/* 4. Bottom Navigation Controls */}
      <footer className={`sticky bottom-0 z-20 w-full px-4 sm:px-8 py-3 border-t ${currentTheme.border} ${currentTheme.header} backdrop-blur-md`}>
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          
          {/* Previous Page Button */}
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentPage === 1
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:bg-black/5 dark:hover:bg-white/10 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.reader.previousPage}</span>
          </button>

          {/* Quick Page Jump Slider & Indicator */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold">
              {currentPage} / {totalPages}
            </span>
            <input
              type="range"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={e => setCurrentPage(Number(e.target.value))}
              className="w-24 sm:w-36 accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Next Page Button */}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              currentPage === totalPages
                ? 'opacity-40 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-xs'
            }`}
          >
            <span>{t.reader.nextPage}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* 5. Table of Contents & Bookmarks Drawer */}
      <AnimatePresence>
        {tocOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25 }}
              className={`w-full max-w-sm h-full p-6 ${currentTheme.bg} ${currentTheme.text} border-l ${currentTheme.border} shadow-2xl flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-4">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <ListOrdered className="w-5 h-5 text-indigo-500" />
                    <span>{t.reader.tableOfContents}</span>
                  </h3>
                  <button
                    onClick={() => setTocOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Chapter list */}
                <div className="space-y-1.5 max-h-[65vh] overflow-y-auto pr-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => {
                    const isCurrent = pageNumber === currentPage;
                    const isBookmarked = bookmarks.includes(pageNumber);

                    return (
                      <button
                        key={pageNumber}
                        onClick={() => {
                          setCurrentPage(pageNumber);
                          setTocOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                          isCurrent
                            ? 'bg-indigo-600 text-white'
                            : 'hover:bg-black/5 dark:hover:bg-white/10'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{t.reader.page} {pageNumber}</span>
                          {isBookmarked && (
                            <Bookmark className={`w-3.5 h-3.5 ${isCurrent ? 'fill-white' : 'text-indigo-500 fill-indigo-500'}`} />
                          )}
                        </span>
                        <span className="text-[10px] opacity-80">
                          {Math.round((pageNumber / totalPages) * 100)}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bookmarks Quick Shortcut at bottom of drawer */}
              {bookmarks.length > 0 && (
                <div className="pt-4 border-t border-black/10 dark:border-white/10">
                  <span className="text-xs font-bold block mb-2">{t.reader.bookmarks} ({bookmarks.length}):</span>
                  <div className="flex flex-wrap gap-1.5">
                    {bookmarks.map(bm => (
                      <button
                        key={bm}
                        onClick={() => {
                          setCurrentPage(bm);
                          setTocOpen(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 transition-colors"
                      >
                        {t.reader.page} {bm}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
