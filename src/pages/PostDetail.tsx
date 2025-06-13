import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share, Bookmark, Code, Eye, Copy, Check, ExternalLink, User, Calendar, Tag } from 'lucide-react';
import CodeEditor from '../components/CodeEditor';
import PreviewPanel from '../components/PreviewPanel';
import MarkdownPreview from '../components/MarkdownPreview';
import PostCard from '../components/PostCard';

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'split'>('preview');
  const [copied, setCopied] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockPost = {
      id,
      type: 'snippet',
      title: 'Beautiful React Button Component',
      content: `import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } \${className}\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;`,
      caption: 'A highly customizable React button component with multiple variants, sizes, and states. Perfect for any modern web application.',
      componentType: 'react-tailwind',
      category: 'Components',
      tags: ['react', 'typescript', 'button', 'ui', 'components'],
      author: {
        id: '2',
        username: 'sarah_codes',
        name: 'Sarah Wilson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true,
        bio: 'Frontend Developer & UI/UX Designer',
        followers: 1234,
        following: 567,
      },
      timestamp: '2 hours ago',
      likes: 156,
      comments: 23,
      shares: 12,
      bookmarks: 45,
      liked: false,
      bookmarked: false,
    };

    const mockRelatedPosts = [
      {
        id: '2',
        type: 'snippet',
        title: 'Input Component with Validation',
        content: 'const Input = ({ label, error, ...props }) => { ... }',
        author: mockPost.author,
        timestamp: '1 day ago',
        likes: 89,
        comments: 12,
        shares: 5,
        bookmarks: 23,
        tags: ['react', 'forms', 'validation'],
      },
      {
        id: '3',
        type: 'documentation',
        title: 'React Component Best Practices',
        content: '# React Component Best Practices\n\nThis guide covers...',
        author: mockPost.author,
        timestamp: '3 days ago',
        likes: 234,
        comments: 45,
        shares: 18,
        bookmarks: 67,
        tags: ['react', 'best-practices', 'components'],
      },
    ];

    setPost(mockPost);
    setRelatedPosts(mockRelatedPosts);
  }, [id]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(post.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleLike = () => {
    setPost((prev: any) => ({
      ...prev,
      liked: !prev.liked,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const handleBookmark = () => {
    setPost((prev: any) => ({
      ...prev,
      bookmarked: !prev.bookmarked,
      bookmarks: prev.bookmarked ? prev.bookmarks - 1 : prev.bookmarks + 1,
    }));
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div>
                <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  {post.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author.username}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.timestamp}</span>
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    post.type === 'snippet' 
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  }`}>
                    {post.type === 'snippet' ? 'Snippet' : 'Documentation'}
                  </span>
                </div>
              </div>
            </div>

            {/* View Mode Toggle */}
            {post.type === 'snippet' && (
              <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors ${
                    viewMode === 'preview'
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setViewMode('code')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors ${
                    viewMode === 'code'
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span>Code</span>
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md font-medium transition-colors ${
                    viewMode === 'split'
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Split</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Author Info */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 mb-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      {post.author.username}
                    </h3>
                    {post.author.verified && (
                      <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-2">{post.author.bio}</p>
                  <div className="flex items-center space-x-4 text-sm text-neutral-500 dark:text-neutral-500">
                    <span>{post.author.followers} followers</span>
                    <span>{post.author.following} following</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
                  Follow
                </button>
              </div>
            </div>

            {/* Caption */}
            {post.caption && (
              <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 mb-6">
                <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed">{post.caption}</p>
              </div>
            )}

            {/* Content */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden mb-6">
              {post.type === 'snippet' ? (
                <>
                  {viewMode === 'preview' && (
                    <div className="h-96">
                      <PreviewPanel
                        code={post.content}
                        language={post.componentType?.includes('react') ? 'typescript' : 'html'}
                      />
                    </div>
                  )}
                  
                  {viewMode === 'code' && (
                    <div className="h-96">
                      <CodeEditor
                        code={post.content}
                        language={post.componentType?.includes('react') ? 'typescript' : 'html'}
                        readOnly
                        height="100%"
                      />
                    </div>
                  )}
                  
                  {viewMode === 'split' && (
                    <div className="h-96 flex">
                      <div className="w-1/2">
                        <CodeEditor
                          code={post.content}
                          language={post.componentType?.includes('react') ? 'typescript' : 'html'}
                          readOnly
                          height="100%"
                        />
                      </div>
                      <div className="w-1/2 border-l border-neutral-200 dark:border-neutral-700">
                        <PreviewPanel
                          code={post.content}
                          language={post.componentType?.includes('react') ? 'typescript' : 'html'}
                        />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-6">
                  <MarkdownPreview content={post.content} />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      post.liked 
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                    <span className="font-medium">{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                    <Share className="w-5 h-5" />
                    <span className="font-medium">{post.shares}</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-2 px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    <span className="font-medium">{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  
                  <button
                    onClick={handleBookmark}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      post.bookmarked 
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${post.bookmarked ? 'fill-current' : ''}`} />
                    <span className="font-medium">Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 mb-6">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4 flex items-center space-x-2">
                  <Tag className="w-5 h-5" />
                  <span>Tags</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-sm rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Related Posts
              </h3>
              <div className="space-y-4">
                {relatedPosts.map(relatedPost => (
                  <PostCard
                    key={relatedPost.id}
                    post={relatedPost}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;