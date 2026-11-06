import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { BookCard } from '../books/BookCard';
import { BookLanguage } from '../../types';
import { Search, Filter, SlidersHorizontal, BookOpen, RotateCcw } from 'lucide-react';

export const LibraryView: React.FC = () => {
  const {
    t,
    books,
    selectedCategory,
    setSelectedCategory,
    globalSearch,
    setGlobalSearch
  } = useApp();

  const [languageFilter, setLanguageFilter] = useState<'all' | BookLanguage>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'newest' | 'rating'>('popularity');

  const categories = [
    { key: 'all', label: t.categories.all },
    { key: 'fiction', label: t.categories.fiction },
    { key: 'technology', label: t.categories.technology },
    { key: 'programming', label: t.categories.programming },
    { key: 'literature', label: t.categories.literature },
    { key: 'history', label: t.categories.history },
    { key: 'science', label: t.categories.science },
    { key: 'education', label: t.categories.education },
    { key: 'architecture', label: t.categories.architecture },
  ];

  // Filtered & Sorted books
  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        // Search query
        if (globalSearch.trim()) {
          const query = globalSearch.toLowerCase().trim();
          const matchTitle = book.title.toLowerCase().includes(query);
          const matchAuthor = book.author.toLowerCase().includes(query);
          const matchDesc = book.description.toLowerCase().includes(query);
          const matchCat = book.category.toLowerCase().includes(query);
          if (!matchTitle && !matchAuthor && !matchDesc && !matchCat) return false;
        }

        // Category filter
        if (selectedCategory !== 'all' && book.category !== selectedCategory) {
          return false;
        }

        // Language filter
        if (languageFilter !== 'all' && book.language !== languageFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popularity') {
          return b.readersCount - a.readersCount;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'newest') {
          return b.publishYear - a.publishYear;
        }
        return 0;
      });
  }, [books, globalSearch, selectedCategory, languageFilter, sortBy]);

  const handleResetFilters = () => {
    setGlobalSearch('');
    setSelectedCategory('all');
    setLanguageFilter('all');
    setSortBy('popularity');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      
      {/* Page Title & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
          <span>eLibrary</span>
          <span>/</span>
          <span>{t.nav.library}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t.library.pageTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          {t.library.pageSubtitle}
        </p>
      </div>

      {/* Search & Filter Bar Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Search Input Row */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={globalSearch}
            onChange={e => setGlobalSearch(e.target.value)}
            placeholder={t.library.noBooksFoundDesc || t.searchPlaceholder}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {t.cancel}
            </button>
          )}
        </div>

        {/* Secondary Filter Controls: Language & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          
          {/* Language Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>{t.library.filterByLanguage}:</span>
            </span>

            <button
              onClick={() => setLanguageFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                languageFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t.library.allLanguages}
            </button>

            <button
              onClick={() => setLanguageFilter('uz')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                languageFilter === 'uz'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>🇺🇿</span>
              <span>{t.library.langUz}</span>
            </button>

            <button
              onClick={() => setLanguageFilter('ru')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                languageFilter === 'ru'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>🇷🇺</span>
              <span>{t.library.langRu}</span>
            </button>

            <button
              onClick={() => setLanguageFilter('en')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                languageFilter === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>🇬🇧</span>
              <span>{t.library.langEn}</span>
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t.library.sortBy}:</span>
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="popularity">{t.library.sortPopular}</option>
              <option value="newest">{t.library.sortNewest}</option>
              <option value="rating">{t.library.sortRating}</option>
            </select>
          </div>
        </div>

        {/* Categories Horizontal Scroll / Wrap */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
                selectedCategory === cat.key
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
          <strong className="text-slate-900 dark:text-white font-bold">{filteredBooks.length}</strong> {t.library.resultsCount}
        </span>

        {(globalSearch || selectedCategory !== 'all' || languageFilter !== 'all') && (
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.library.resetFilters}</span>
          </button>
        )}
      </div>

      {/* Books Grid or Empty State */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {t.library.noBooksFoundTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {t.library.noBooksFoundDesc}
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.library.resetFilters}</span>
          </button>
        </div>
      )}
    </div>
  );
};
