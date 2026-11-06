import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Book, BookLanguage } from '../../types';
import {
  Shield,
  BookPlus,
  BookOpen,
  Users,
  MessageSquare,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Send,
  Sparkles
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    t,
    currentUser,
    books,
    allUsers,
    conversations,
    messages,
    addBook,
    deleteBook,
    switchUser,
    sendMessage,
    showToast,
    language
  } = useApp();

  const [activeTab, setActiveTab] = useState<'books' | 'add' | 'students' | 'support'>('books');
  const [bookSearch, setBookSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');

  // Add Book Form state
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('technology');
  const [newLanguage, setNewLanguage] = useState<BookLanguage>('uz');
  const [newPagesCount, setNewPagesCount] = useState(180);
  const [newCover, setNewCover] = useState('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80');
  const [newDescription, setNewDescription] = useState('');
  const [newPagesContent, setNewPagesContent] = useState(
    '1-BOB. KIRISH\n\nZamonaviy fan va axborot texnologiyalari ta\'lim jarayonini tubdan o\'zgartirmoqda. Ushbu kitob orqali siz yangi bilimlarni egallaysiz.\n\n2-BOB. AMALIYOT\n\nHar bir mutaxassis o\'z sohasida mustahkam bilim va amaliy ko\'nikmalarga ega bo\'lishi shart.'
  );

  // Librarian response input
  const [replyInput, setReplyInput] = useState<{ [convId: string]: string }>({});

  const isLibrarian = currentUser?.role === 'admin';

  const handleAddBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) {
      showToast('Iltimos, sarlavha va muallifni kiriting', 'error');
      return;
    }

    const pages = newPagesContent.split('\n\n\n').filter(Boolean);

    addBook({
      title: newTitle,
      author: newAuthor,
      category: newCategory,
      language: newLanguage,
      pagesCount: newPagesCount,
      cover: newCover || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: newDescription,
      pages: pages.length > 0 ? pages : [newPagesContent],
      featured: true,
      publishYear: new Date().getFullYear(),
      rating: 5.0,
      readersCount: 1
    });

    // Reset
    setNewTitle('');
    setNewAuthor('');
    setNewDescription('');
    setActiveTab('books');
  };

  // Support conversations (conversations involving librarian)
  const librarianUser = allUsers.find(u => u.role === 'admin');
  const supportConversations = librarianUser
    ? conversations.filter(c => c.participantIds.includes(librarianUser.id))
    : [];

  const handleSendAdminReply = (convId: string) => {
    const text = replyInput[convId];
    if (!text || !text.trim()) return;

    sendMessage(convId, text);
    setReplyInput(prev => ({ ...prev, [convId]: '' }));
    showToast(language === 'uz' ? 'Javob yuborildi' : 'Ответ отправлен', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      
      {/* Header with Admin Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
            <Shield className="w-4 h-4" />
            <span>eLibrary Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {t.admin.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.admin.subtitle}
          </p>
        </div>

        {/* Quick Switcher if user is not currently librarian */}
        {!isLibrarian && (
          <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-2xl p-3 flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-amber-900 dark:text-amber-200">
              Admin sifatida test qilish:
            </span>
            <button
              onClick={() => switchUser('admin_1')}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              @Librarian hisobiga o'tish
            </button>
          </div>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {books.length}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.admin.manageBooks}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {allUsers.length}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.admin.manageStudents}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {supportConversations.length}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t.admin.supportRequests}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              99.9%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Tizim holati (Online)
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-slate-200 dark:border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('books')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'books'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{t.admin.manageBooks} ({books.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('add')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'add'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>{t.admin.addBook}</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'students'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t.admin.manageStudents} ({allUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('support')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'support'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t.admin.supportRequests} ({supportConversations.length})</span>
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'books' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={bookSearch}
                onChange={e => setBookSearch(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm"
              />
            </div>

            <button
              onClick={() => setActiveTab('add')}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{t.admin.addBook}</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">{t.admin.tableBookTitle}</th>
                    <th className="p-4">{t.admin.tableAuthor}</th>
                    <th className="p-4">{t.admin.tableCategory}</th>
                    <th className="p-4">{t.admin.tableLanguage}</th>
                    <th className="p-4">{t.bookDetails.readers}</th>
                    <th className="p-4 text-right">{t.admin.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {books
                    .filter(b => b.title.toLowerCase().includes(bookSearch.toLowerCase()) || b.author.toLowerCase().includes(bookSearch.toLowerCase()))
                    .map(book => (
                      <tr key={book.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <img src={book.cover} alt={book.title} className="w-8 h-11 rounded object-cover" />
                          <span className="font-bold text-slate-900 dark:text-white line-clamp-1">{book.title}</span>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{book.author}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                            {book.category}
                          </span>
                        </td>
                        <td className="p-4 uppercase font-bold text-xs">{book.language}</td>
                        <td className="p-4 text-slate-500">{book.readersCount}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => deleteBook(book.id)}
                            className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                            title={t.admin.delete}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ADD BOOK TAB */}
      {activeTab === 'add' && (
        <form onSubmit={handleAddBookSubmit} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookPlus className="w-5 h-5 text-indigo-500" />
            <span>{t.admin.addBook}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.admin.formTitle} *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Masalan: Sun'iy Intellekt Asoslari"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.admin.formAuthor} *
              </label>
              <input
                type="text"
                required
                value={newAuthor}
                onChange={e => setNewAuthor(e.target.value)}
                placeholder="Masalan: Dr. Alisher Karimov"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.admin.formCategory}
              </label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              >
                <option value="technology">{t.categories.technology}</option>
                <option value="programming">{t.categories.programming}</option>
                <option value="fiction">{t.categories.fiction}</option>
                <option value="science">{t.categories.science}</option>
                <option value="history">{t.categories.history}</option>
                <option value="education">{t.categories.education}</option>
                <option value="literature">{t.categories.literature}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.admin.formLanguage}
              </label>
              <select
                value={newLanguage}
                onChange={e => setNewLanguage(e.target.value as BookLanguage)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              >
                <option value="uz">🇺🇿 O'zbekcha</option>
                <option value="ru">🇷🇺 Русский</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.admin.formCoverUrl}
              </label>
              <input
                type="url"
                value={newCover}
                onChange={e => setNewCover(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.bookDetails.pages}
              </label>
              <input
                type="number"
                value={newPagesCount}
                onChange={e => setNewPagesCount(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.admin.formDescription}
              </label>
              <textarea
                rows={3}
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                placeholder="Kitob haqida qisqacha ma'lumot..."
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t.admin.formContentPages} (Har bir sahifani ajratish uchun uchta yangi qator qoldiring)
              </label>
              <textarea
                rows={5}
                value={newPagesContent}
                onChange={e => setNewPagesContent(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('books')}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20"
            >
              {t.admin.addBook}
            </button>
          </div>
        </form>
      )}

      {/* STUDENTS TAB */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={studentSearch}
              onChange={e => setStudentSearch(e.target.value)}
              placeholder={t.community.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm"
            />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">{t.community.pageTitle}</th>
                    <th className="p-4">{t.auth.nicknameLabel}</th>
                    <th className="p-4">{t.profile.faculty} / {t.profile.major}</th>
                    <th className="p-4">{t.auth.emailLabel}</th>
                    <th className="p-4">{t.admin.tableRole}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {allUsers
                    .filter(u => u.name.toLowerCase().includes(studentSearch.toLowerCase()) || u.nickname.toLowerCase().includes(studentSearch.toLowerCase()))
                    .map(user => (
                      <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <img src={user.avatar} alt={user.nickname} className="w-9 h-9 rounded-xl object-cover" />
                          <span className="font-bold text-slate-900 dark:text-white">{user.name}</span>
                        </td>
                        <td className="p-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{user.nickname}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{user.faculty} • {user.major}</td>
                        <td className="p-4 text-slate-500">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            user.role === 'admin'
                              ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                            {user.role.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUPPORT REQUESTS TAB */}
      {activeTab === 'support' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Talabalardan kelgan murojaat va savollar ({supportConversations.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportConversations.map(conv => {
              const studentId = conv.participantIds.find(id => id !== librarianUser?.id);
              const student = allUsers.find(u => u.id === studentId);
              const convMessages = messages.filter(m => m.conversationId === conv.id);
              const currentReply = replyInput[conv.id] || '';

              return (
                <div
                  key={conv.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <img src={student?.avatar} alt="Avatar" className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{student?.name}</h4>
                          <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">{student?.nickname}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(conv.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Messages history snippet */}
                    <div className="my-3 space-y-2 max-h-48 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      {convMessages.map(m => {
                        const fromStudent = m.senderId === student?.id;
                        return (
                          <div key={m.id} className={`text-xs p-2 rounded-lg ${
                            fromStudent ? 'bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700' : 'bg-indigo-600 text-white ml-6'
                          }`}>
                            <span className="block font-bold text-[10px] opacity-70 mb-0.5">
                              {fromStudent ? student?.nickname : '@Librarian'}:
                            </span>
                            <p>{m.content}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reply Input */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <input
                      type="text"
                      value={currentReply}
                      onChange={e => setReplyInput(prev => ({ ...prev, [conv.id]: e.target.value }))}
                      placeholder={language === 'uz' ? 'Talabaga javob yozing...' : 'Ответить студенту...'}
                      className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                    />
                    <button
                      onClick={() => handleSendAdminReply(conv.id)}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === 'uz' ? 'Yuborish' : 'Отправить'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
