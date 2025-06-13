import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, TrendingUp, Clock, Heart, Plus } from 'lucide-react';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';

const Explore = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'snippet' | 'documentation'>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'trending'>('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Mock data
  const mockPosts = [
    {
      id: '1',
      type: 'snippet',
      title: 'Beautiful React Button Component',
      content: `import React from 'react';\n\nconst Button = ({ children, variant = 'primary' }) => {\n  return (\n    <button className={\`btn btn-\${variant}\`}>\n      {children}\n    </button>\n  );\n};\n\nexport default Button;`,
      caption: 'A highly customizable React button component with multiple variants and states.',
      componentType: 'react-tailwind',
      category: 'Components',
      tags: ['react', 'typescript', 'button', 'ui'],
      author: {
        id: '2',
        username: 'sarah_codes',
        name: 'Sarah Wilson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true,
      },
      timestamp: '2 hours ago',
      likes: 156,
      comments: 23,
      shares: 12,
      bookmarks: 45,
      liked: false,
      bookmarked: false,
    },
    {
      id: '2',
      type: 'documentation',
      title: 'React Hooks Best Practices',
      content: `# React Hooks Best Practices\n\nReact Hooks have revolutionized how we write React components. Here are some best practices to follow:\n\n## 1. Rules of Hooks\n\n- Only call hooks at the top level\n- Only call hooks from React functions\n\n## 2. Custom Hooks\n\nCreate custom hooks to share stateful logic between components.\n\n\`\`\`javascript\nfunction useCounter(initialValue = 0) {\n  const [count, setCount] = useState(initialValue);\n  \n  const increment = () => setCount(count + 1);\n  const decrement = () => setCount(count - 1);\n  \n  return { count, increment, decrement };\n}\n\`\`\``,
      category: 'React',
      tags: ['react', 'hooks', 'best-practices', 'javascript'],
      author: {
        id: '3',
        username: 'mike_react',
        name: 'Mike Johnson',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: false,
      },
      timestamp: '4 hours ago',
      likes: 234,
      comments: 45,
      shares: 18,
      bookmarks: 67,
      liked: true,
      bookmarked: false,
    },
    {
      id: '3',
      type: 'snippet',
      title: 'CSS Grid Layout Helper',
      content: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1rem;\n  padding: 1rem;\n}\n\n.grid-item {\n  background: white;\n  border-radius: 8px;\n  padding: 1rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  transition: transform 0.2s ease;\n}\n\n.grid-item:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}`,
      caption: 'Responsive CSS Grid layout with hover effects. Perfect for card layouts and galleries.',
      componentType: 'html-css',
      category: 'CSS',
      tags: ['css', 'grid', 'responsive', 'layout'],
      author: {
        id: '4',
        username: 'css_wizard',
        name: 'Emma Davis',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true,
      },
      timestamp: '6 hours ago',
      likes: 89,
      comments: 12,
      shares: 8,
      bookmarks: 34,
      liked: false,
      bookmarked: true,
    },
  ];

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'all' || post.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'trending':
        return (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares);
      case 'latest':
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            bookmarked: !post.bookmarked,
            bookmarks: post.bookmarked ? post.bookmarks - 1 : post.bookmarks + 1
          }
        : post
    ));
  };

  const handleCreatePost = (newPost: any) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const loadMore = () => {
    setLoading(true);
    // Simulate loading more posts
    setTimeout(() => {
      setLoading(false);
      // In real app, load more posts from API
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                Explore
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Discover amazing code snippets and documentation from the community
              </p>
            </div>

            <button
              onClick={() => setShowCreatePost(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Create Post</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search posts, tags, or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-neutral-900 dark:text-neutral-100"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                {/* Type Filter */}
                <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      selectedType === 'all'
                        ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedType('snippet')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      selectedType === 'snippet'
                        ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    Snippets
                  </button>
                  <button
                    onClick={() => setSelectedType('documentation')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      selectedType === 'documentation'
                        ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    Docs
                  </button>
                </div>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-neutral-900 dark:text-neutral-100"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-neutral-600 dark:text-neutral-400">
            {sortedPosts.length} {sortedPosts.length === 1 ? 'post' : 'posts'} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Posts Grid/List */}
        {sortedPosts.length > 0 ? (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-6'
          }`}>
            {sortedPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onBookmark={handleBookmark}
                compact={viewMode === 'grid'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              No posts found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
              }}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More */}
        {hasMore && sortedPosts.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-8 py-3 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                'Load More Posts'
              )}
            </button>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      <CreatePost
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};

export default Explore;