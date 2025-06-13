import React, { useState } from 'react';
import { Search, Filter, Code, FileText, ChevronDown, ChevronRight, Tag } from 'lucide-react';
import { useCode } from '../context/CodeContext';

const Sidebar: React.FC = () => {
  const {
    snippets,
    documentation,
    activeSnippet,
    activeDoc,
    setActiveSnippet,
    setActiveDoc,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useCode();

  const [activeTab, setActiveTab] = useState<'snippets' | 'docs'>('snippets');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['components', 'hooks']));

  const categories = {
    snippets: ['all', 'components', 'hooks', 'utilities', 'animations'],
    docs: ['all', 'react', 'typescript', 'javascript', 'css', 'best-practices'],
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = !searchQuery || 
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredDocs = documentation.filter(doc => {
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const groupedSnippets = filteredSnippets.reduce((acc, snippet) => {
    if (!acc[snippet.category]) {
      acc[snippet.category] = [];
    }
    acc[snippet.category].push(snippet);
    return acc;
  }, {} as Record<string, typeof snippets>);

  const groupedDocs = filteredDocs.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, typeof documentation>);

  return (
    <div className="w-80 h-full bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex space-x-1 mb-4">
          <button
            onClick={() => setActiveTab('snippets')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'snippets'
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Snippets</span>
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'docs'
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Docs</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center space-x-2 mb-2">
          <Filter className="w-4 h-4 text-neutral-400" />
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Categories</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {categories[activeTab].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'snippets' ? (
          <div className="p-2">
            {Object.entries(groupedSnippets).map(([category, categorySnippets]) => (
              <div key={category} className="mb-4">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center space-x-2 px-2 py-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
                >
                  {expandedCategories.has(category) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="capitalize">{category}</span>
                  <span className="text-xs text-neutral-500">({categorySnippets.length})</span>
                </button>
                
                {expandedCategories.has(category) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {categorySnippets.map(snippet => (
                      <button
                        key={snippet.id}
                        onClick={() => {
                          setActiveSnippet(snippet);
                          setActiveDoc(null);
                        }}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${
                          activeSnippet?.id === snippet.id
                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <div className="font-medium text-sm mb-1">{snippet.title}</div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-500 line-clamp-2">
                          {snippet.description}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {snippet.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center space-x-1 px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded"
                            >
                              <Tag className="w-2.5 h-2.5" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-2">
            {Object.entries(groupedDocs).map(([category, categoryDocs]) => (
              <div key={category} className="mb-4">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center space-x-2 px-2 py-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded transition-colors"
                >
                  {expandedCategories.has(category) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="capitalize">{category}</span>
                  <span className="text-xs text-neutral-500">({categoryDocs.length})</span>
                </button>
                
                {expandedCategories.has(category) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {categoryDocs.map(doc => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          setActiveDoc(doc);
                          setActiveSnippet(null);
                        }}
                        className={`w-full text-left p-2 rounded-lg transition-colors ${
                          activeDoc?.id === doc.id
                            ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }`}
                      >
                        <div className="font-medium text-sm mb-1">{doc.title}</div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {doc.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center space-x-1 px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded"
                            >
                              <Tag className="w-2.5 h-2.5" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;