import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { BookOpen, Users, HelpCircle, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, setActiveView, setLibrarianModalOpen, setSelectedCategory } = useApp();

  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <Logo size="md" />
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setLibrarianModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-semibold transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                <span>{t.nav.contactLibrarian}</span>
              </button>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.sections.platform}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setActiveView('home')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('library')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.nav.library}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('my-library')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.nav.myLibrary}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('students')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.nav.community}
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.sections.categories}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('fiction');
                    setActiveView('library');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.categories.fiction}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('technology');
                    setActiveView('library');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.categories.technology}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('history');
                    setActiveView('library');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.categories.history}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('science');
                    setActiveView('library');
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.categories.science}
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t.footer.sections.support}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setLibrarianModalOpen(true)}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.footer.helpDesk}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('students')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t.nav.community}
                </button>
              </li>
              <li className="text-slate-400 dark:text-slate-500">
                {t.footer.privacy}
              </li>
              <li className="text-slate-400 dark:text-slate-500">
                {t.footer.rules}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} eLibrary. {t.allRightsReserved}</p>
          <p className="flex items-center gap-1">
            <span>{t.footer.madeForStudents}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
