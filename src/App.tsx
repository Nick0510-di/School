/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/views/HomeView';
import { LibraryView } from './components/views/LibraryView';
import { BookDetailsView } from './components/views/BookDetailsView';
import { ReaderView } from './components/views/ReaderView';
import { MyLibraryView } from './components/views/MyLibraryView';
import { CommunityView } from './components/views/CommunityView';
import { ChatView } from './components/views/ChatView';
import { DashboardView } from './components/views/DashboardView';
import { ProfileView } from './components/views/ProfileView';
import { AdminView } from './components/views/AdminView';
import { AuthModal } from './components/modals/AuthModal';
import { LibrarianModal } from './components/modals/LibrarianModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainAppLayout: React.FC = () => {
  const { activeView } = useApp();

  // Distraction-free digital reader view (has its own dedicated header & footer controls)
  if (activeView === 'reader') {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-indigo-500 selection:text-white">
        <ReaderView />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      {/* Sticky Modern Responsive Navigation */}
      <Navbar />

      {/* Main Content View Switcher */}
      <main className="flex-1 flex flex-col">
        {activeView === 'home' && <HomeView />}
        {activeView === 'library' && <LibraryView />}
        {activeView === 'book-details' && <BookDetailsView />}
        {activeView === 'my-library' && <MyLibraryView />}
        {activeView === 'students' && <CommunityView />}
        {activeView === 'chat' && <ChatView />}
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'profile' && <ProfileView />}
        {activeView === 'admin' && <AdminView />}
      </main>

      {/* Modern Educational Footer (hidden on full chat view on desktop for neat app feel if needed, or shown) */}
      <Footer />

      {/* Modals & Notifications */}
      <AuthModal />
      <LibrarianModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppLayout />
    </AppProvider>
  );
}
