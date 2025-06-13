import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, BookOpen, User, Settings, MessageCircle, Code2 } from 'lucide-react';

interface NavigationProps {
  mobile?: boolean;
}

const Navigation = ({ mobile = false }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Compass, label: 'Explore' },
    { path: '/documentation', icon: BookOpen, label: 'Docs' },
    { path: '/playground', icon: Code2, label: 'Playground' },
    { path: '/messages', icon: MessageCircle, label: 'Messages', mobileOnly: true },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings', desktopOnly: true },
  ];

  const filteredItems = navItems.filter(item => {
    if (mobile && item.desktopOnly) return false;
    if (!mobile && item.mobileOnly) return false;
    return true;
  });

  if (mobile) {
    return (
      <div className="flex justify-around py-2">
        {filteredItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <nav className="p-6 space-y-2">
      {filteredItems.map(({ path, icon: Icon, label }) => {
        const isActive = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              isActive 
                ? 'bg-primary-50 text-primary-600 border border-primary-200' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
            <span className="font-medium">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;