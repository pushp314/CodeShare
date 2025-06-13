import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MessageCircle, Heart, Code2 } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <Code2 className="w-8 h-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">CodeGram</span>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <form 
          onSubmit={handleSearch}
          className="hidden md:block flex-1 max-w-lg mx-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search snippets, users, docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/messages')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MessageCircle className="w-6 h-6 text-gray-700" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Heart className="w-6 h-6 text-gray-700" />
          </button>

          {/* Mobile Search */}
          <button 
            onClick={() => navigate('/explore')}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Search className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;