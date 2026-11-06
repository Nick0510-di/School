export type Language = 'uz' | 'ru';
export type BookLanguage = 'uz' | 'ru' | 'en';

export interface User {
  id: string;
  nickname: string; // e.g. "@Nick0510"
  name: string;
  email: string;
  avatar: string;
  bio: string;
  language: Language;
  role: 'student' | 'admin';
  status: 'active' | 'suspended';
  joinedDate: string;
  booksReadCount: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  language: BookLanguage;
  cover: string;
  description: string;
  rating: number;
  readersCount: number;
  publishYear: number;
  pagesCount: number;
  pages: string[];
  featured?: boolean;
  isNew?: boolean;
}

export interface ReadingProgress {
  userId?: string;
  bookId: string;
  currentPage: number;
  totalPages: number;
  progressPercentage: number;
  lastReadAt: string;
  bookmarks: number[];
}

export interface SavedBook {
  bookId: string;
  savedAt: string;
  status: 'reading' | 'saved' | 'finished';
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface ChatConversation {
  id: string;
  type: 'direct' | 'librarian';
  participantIds: string[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'chat' | 'librarian' | 'system' | 'recommendation' | 'book';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  actionView?: string;
  actionId?: string;
}

export type ActiveView = 
  | 'home' 
  | 'library' 
  | 'book-details' 
  | 'reader' 
  | 'my-library' 
  | 'dashboard' 
  | 'students' 
  | 'chat' 
  | 'profile' 
  | 'admin';

export type ReaderTheme = 'light' | 'dark' | 'sepia';
export type ReaderFontSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl';
