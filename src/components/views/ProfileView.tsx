import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookCard } from '../books/BookCard';
import {
  User as UserIcon,
  GraduationCap,
  Sparkles,
  BookOpen,
  Bookmark,
  MessageSquare,
  Flame,
  Award,
  Clock,
  Edit3,
  Check,
  X,
  Share2
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    t,
    selectedUserId,
    allUsers,
    currentUser,
    books,
    startDirectChat,
    updateUserProfile,
    showToast,
    readingProgress,
    savedBookIds
  } = useApp();

  const targetUserId = selectedUserId || currentUser?.id || allUsers[0]?.id;
  const user = allUsers.find(u => u.id === targetUserId) || currentUser || allUsers[0];
  const isMe = currentUser?.id === user.id;

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editMajor, setEditMajor] = useState(user.major || '');
  const [editFaculty, setEditFaculty] = useState(user.faculty || '');
  const [editBio, setEditBio] = useState(user.bio || '');
  const [editInterests, setEditInterests] = useState(user.interests?.join(', ') || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      major: editMajor,
      faculty: editFaculty,
      bio: editBio,
      interests: editInterests.split(',').map(s => s.trim()).filter(Boolean)
    });
    setIsEditing(false);
    showToast(t.profile.profileUpdated, 'success');
  };

  // User's favorite books (mock or from savedBookIds)
  const userFavoriteBooks = isMe
    ? books.filter(b => savedBookIds.includes(b.id))
    : books.filter(b => user.favoriteBooks?.includes(b.id));

  // User's currently reading
  const currentlyReadingBooks = isMe
    ? books.filter(b => {
        const p = readingProgress[`${user.id}_${b.id}`];
        return p && p.progressPercentage > 0 && p.progressPercentage < 100;
      })
    : books.filter(b => user.currentlyReading?.includes(b.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.nickname}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-md"
              />
              {user.status === 'online' && (
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {user.name}
                </h1>
                {isMe && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    {t.community.youBadge}
                  </span>
                )}
              </div>

              <div className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {user.nickname}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <GraduationCap className="w-4 h-4 text-indigo-500" />
                <span>{user.faculty} • {user.major} ({user.year}-kurs)</span>
              </div>
            </div>
          </div>

          {/* Action buttons on profile */}
          <div className="flex items-center gap-2">
            {isMe ? (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>{t.profile.editProfile}</span>
              </button>
            ) : (
              <button
                onClick={() => startDirectChat(user.id)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.community.sendMessage}</span>
              </button>
            )}
          </div>
        </div>

        {/* Bio */}
        {user.bio && !isEditing && (
          <p className="mt-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
            {user.bio}
          </p>
        )}

        {/* Edit Form Drawer / Toggle */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.auth.fullNameLabel}
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.profile.faculty}
                </label>
                <input
                  type="text"
                  value={editFaculty}
                  onChange={e => setEditFaculty(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.profile.major}
                </label>
                <input
                  type="text"
                  value={editMajor}
                  onChange={e => setEditMajor(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.community.readingInterests} (vergul bilan)
                </label>
                <input
                  type="text"
                  value={editInterests}
                  onChange={e => setEditInterests(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.profile.bio}
                </label>
                <textarea
                  rows={2}
                  value={editBio}
                  onChange={e => setEditBio(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
              >
                {t.profile.saveChanges}
              </button>
            </div>
          </form>
        )}

        {/* Interests Pills */}
        {user.interests && user.interests.length > 0 && !isEditing && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {user.interests.map((interest, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-lg"
              >
                #{interest}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Currently Reading Section */}
      {currentlyReadingBooks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            <span>{t.profile.currentlyReadingTitle}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentlyReadingBooks.map(b => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </div>
      )}

      {/* Favorite Books Section */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-indigo-500" />
          <span>{t.profile.favoriteBooksTitle}</span>
        </h2>
        {userFavoriteBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userFavoriteBooks.map(b => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-400 py-6">
            {t.profile.noFavoritesYet}
          </p>
        )}
      </div>
    </div>
  );
};
