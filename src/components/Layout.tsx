import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 fixed left-0 top-16 h-screen bg-white border-r border-gray-200">
          <Navigation />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pt-16 pb-16 lg:pb-4">
          <div className={`${isHomePage ? 'max-w-lg mx-auto' : 'max-w-4xl mx-auto'} px-4`}>
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <Navigation mobile />
      </div>
    </div>
  );
};

export default Layout;