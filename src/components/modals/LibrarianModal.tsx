import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, HelpCircle, BookOpen, Wrench, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export const LibrarianModal: React.FC = () => {
  const { librarianModalOpen, setLibrarianModalOpen, contactLibrarian, t, language } = useApp();

  const [topic, setTopic] = useState<'book' | 'source' | 'tech' | 'other'>('book');
  const [message, setMessage] = useState('');

  if (!librarianModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    let topicText = t.librarianModal.typeBookRequest;
    if (topic === 'source') topicText = t.librarianModal.typeSourceHelp;
    if (topic === 'tech') topicText = t.librarianModal.typeTechnical;
    if (topic === 'other') topicText = t.librarianModal.typeOther;

    contactLibrarian(topicText, message);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8"
      >
        <button
          onClick={() => setLibrarianModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.librarianModal.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.librarianModal.desc}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {t.librarianModal.questionType}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTopic('book')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-medium transition-all ${
                  topic === 'book'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0 text-indigo-500" />
                <span className="truncate">{t.librarianModal.typeBookRequest}</span>
              </button>

              <button
                type="button"
                onClick={() => setTopic('source')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-medium transition-all ${
                  topic === 'source'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <HelpCircle className="w-4 h-4 shrink-0 text-indigo-500" />
                <span className="truncate">{t.librarianModal.typeSourceHelp}</span>
              </button>

              <button
                type="button"
                onClick={() => setTopic('tech')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-medium transition-all ${
                  topic === 'tech'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Wrench className="w-4 h-4 shrink-0 text-indigo-500" />
                <span className="truncate">{t.librarianModal.typeTechnical}</span>
              </button>

              <button
                type="button"
                onClick={() => setTopic('other')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 text-xs font-medium transition-all ${
                  topic === 'other'
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <MessageSquare className="w-4 h-4 shrink-0 text-indigo-500" />
                <span className="truncate">{t.librarianModal.typeOther}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t.librarianModal.messagePlaceholder}
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={language === 'uz' ? 'Savolingizni yozing...' : 'Опишите ваш вопрос...'}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setLibrarianModalOpen(false)}
              className="px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>{t.librarianModal.submitBtn}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
