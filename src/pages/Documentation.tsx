import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Heart, MessageCircle, Bookmark, Search, Filter, User, Clock, Check } from 'lucide-react';

const Documentation = () => {
  const { documentation } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'react', label: 'React' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'node', label: 'Node.js' },
    { id: 'python', label: 'Python' },
  ];

  const filteredDocs = documentation.filter(doc => {
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      doc.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="w-8 h-8 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Documentation Hub</h1>
        </div>
        
        <p className="text-gray-600 mb-6">
          Discover comprehensive guides, tutorials, and documentation created by the developer community.
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documentation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            {/* Thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-primary-500 to-code-500 relative overflow-hidden">
              <img 
                src={doc.thumbnail} 
                alt={doc.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-white bg-opacity-90 text-primary-600 text-xs font-medium rounded">
                  {doc.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {doc.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {doc.description}
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={doc.author.avatar} 
                  alt={doc.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-900">{doc.author.username}</span>
                    {doc.author.verified && (
                      <Check className="w-3 h-3 text-primary-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{doc.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1 text-sm text-gray-600">
                    <Heart className="w-4 h-4" />
                    <span>{doc.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-sm text-gray-600">
                    <MessageCircle className="w-4 h-4" />
                    <span>{doc.comments}</span>
                  </span>
                </div>
                
                <button className="text-gray-600 hover:text-primary-600 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocs.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documentation found</h3>
          <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
        </div>
      )}
    </div>
  );
};

export default Documentation;