import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookCard } from '../books/BookCard';
import {
  ArrowRight,
  BookOpen,
  Search,
  Laptop,
  Languages,
  Users,
  Bookmark,
  Sparkles,
  Compass,
  Code,
  Atom,
  GraduationCap,
  History,
  Landmark,
  Layers,
  BookMarked
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomeView: React.FC = () => {
  const {
    t,
    books,
    setActiveView,
    setSelectedCategory,
    setAuthModalOpen,
    setAuthModalTab,
    currentUser,
    setSelectedBookId
  } = useApp();

  const featuredBooks = books.filter(b => b.featured).slice(0, 4);

  const categoriesList = [
    { key: 'fiction', icon: BookOpen, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' },
    { key: 'technology', icon: Laptop, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' },
    { key: 'programming', icon: Code, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40' },
    { key: 'science', icon: Atom, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' },
    { key: 'history', icon: History, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
    { key: 'literature', icon: BookMarked, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40' },
    { key: 'education', icon: GraduationCap, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40' },
    { key: 'architecture', icon: Landmark, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/40' },
  ];

  const benefits = [
    {
      title: t.home.why1Title,
      desc: t.home.why1Desc,
      icon: BookOpen,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: t.home.why2Title,
      desc: t.home.why2Desc,
      icon: Search,
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      title: t.home.why3Title,
      desc: t.home.why3Desc,
      icon: Laptop,
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      title: t.home.why4Title,
      desc: t.home.why4Desc,
      icon: Languages,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: t.home.why5Title,
      desc: t.home.why5Desc,
      icon: Users,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: t.home.why6Title,
      desc: t.home.why6Desc,
      icon: Bookmark,
      gradient: 'from-amber-500 to-orange-600'
    },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16 overflow-hidden">
        {/* Subtle background ambient blur spots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-500/10 via-cyan-400/10 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 text-center lg:text-left space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                <span>eLibrary • Digital Education Platform</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                {t.home.heroTitle}
              </h1>

              <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.home.heroSubtitle}
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <button
                  id="hero-explore-btn"
                  onClick={() => setActiveView('library')}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm sm:text-base shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition-all hover:gap-3"
                >
                  <span>{t.home.exploreBooksBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {currentUser ? (
                  <button
                    id="hero-dashboard-btn"
                    onClick={() => setActiveView('dashboard')}
                    className="px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-sm sm:text-base border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
                  >
                    {t.home.welcomeBackBtn}
                  </button>
                ) : (
                  <button
                    id="hero-join-btn"
                    onClick={() => {
                      setAuthModalTab('register');
                      setAuthModalOpen(true);
                    }}
                    className="px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-sm sm:text-base border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
                  >
                    {t.home.joinBtn}
                  </button>
                )}
              </div>

              {/* Live Metric Badges */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    4,500+
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.home.activeStudents}
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    12,000+
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.home.booksAvailable}
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-cyan-600 dark:text-cyan-400">
                    85,000+
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.home.readingHours}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Visual Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Stacked Book Showcase Card */}
                <div className="relative rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-600 shadow-2xl text-white overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                      eLibrary Reader Live
                    </span>
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-white/20" />
                  </div>

                  {/* Sample Featured Book Preview Inside Device Frame */}
                  <div
                    onClick={() => {
                      setSelectedBookId('book_2');
                      setActiveView('book-details');
                    }}
                    className="cursor-pointer bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl p-4 shadow-xl border border-white/10 hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="flex gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80"
                        alt="Featured cover"
                        className="w-24 h-32 rounded-xl object-cover shadow-md"
                      />
                      <div className="flex flex-col justify-between py-1">
                        <div>
                          <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                            🇷🇺 Русский • Художественная
                          </div>
                          <h4 className="font-bold text-base line-clamp-1 mt-0.5">
                            Мастер и Маргарита
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            Михаил Булгаков
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                            <span>Прогресс</span>
                            <span className="text-indigo-600 font-bold">67%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Student peer message badge floating */}
                  <div className="mt-4 p-3 bg-white/15 backdrop-blur-md rounded-xl text-xs flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center font-bold text-white shrink-0">
                      @
                    </div>
                    <div className="truncate">
                      <span className="font-semibold">@Elena_Read:</span> "Отличная глава, советую всем студентам!"
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED BOOKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.home.featuredBooksTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.home.featuredBooksSubtitle}
            </p>
          </div>
          <button
            onClick={() => setActiveView('library')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
          >
            <span>{t.viewAll}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map(book => (
            <BookCard key={book.id} book={book} featured />
          ))}
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.home.categoriesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.home.categoriesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categoriesList.map(cat => {
            const Icon = cat.icon;
            const label = t.categories[cat.key as keyof typeof t.categories] || cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setActiveView('library');
                }}
                className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all text-center"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${cat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. WHY ELIBRARY? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 lg:p-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.home.whyTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              {t.home.whySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-700/60 shadow-xs space-y-3"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.gradient} flex items-center justify-center text-white shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 text-white p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t.home.ctaTitle}
            </h2>
            <p className="text-xs sm:text-base text-indigo-100 leading-relaxed">
              {t.home.ctaSubtitle}
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  if (currentUser) {
                    setActiveView('library');
                  } else {
                    setAuthModalTab('register');
                    setAuthModalOpen(true);
                  }
                }}
                className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-xl text-sm hover:bg-indigo-50 shadow-lg shadow-black/10 transition-colors"
              >
                {t.home.ctaBtn}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
