import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, Code, Copy, Check, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import PreviewPanel from './PreviewPanel';
import MarkdownPreview from './MarkdownPreview';

interface PostCardProps {
  post: any;
  onLike?: (postId: string) => void;
  onBookmark?: (postId: string) => void;
  compact?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onBookmark, compact = false }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(post.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  const truncateContent = (content: string, maxLines: number = 8) => {
    const lines = content.split('\n');
    if (lines.length <= maxLines) return content;
    return lines.slice(0, maxLines).join('\n') + '\n...';
  };

  return (
    <div 
      className={`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
        compact ? 'h-80' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{post.author.username}</h3>
              {post.author.verified && (
                <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{post.timestamp}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            post.type === 'snippet' 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
          }`}>
            {post.type === 'snippet' ? 'Snippet' : 'Documentation'}
          </span>
          
          <button
            onClick={(e) => handleActionClick(e, () => navigate(`/post/${post.id}`))}
            className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 pb-3">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2">
          {post.title}
        </h2>
        {post.caption && (
          <p className="text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
            {post.caption}
          </p>
        )}
      </div>

      {/* Content */}
      <div className={`relative ${compact ? 'h-40' : 'max-h-96'} overflow-hidden`}>
        {post.type === 'snippet' ? (
          <>
            {/* Toggle Buttons */}
            <div className="absolute top-3 right-3 z-10 flex bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => handleActionClick(e, () => setViewMode('preview'))}
                className={`p-2 transition-colors ${
                  viewMode === 'preview'
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
                title="Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => handleActionClick(e, () => setViewMode('code'))}
                className={`p-2 transition-colors ${
                  viewMode === 'code'
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
                title="Code"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {viewMode === 'preview' ? (
              <div className="h-full">
                <PreviewPanel
                  code={post.content}
                  language={post.componentType?.includes('react') ? 'typescript' : 'html'}
                />
              </div>
            ) : (
              <div className="h-full">
                <CodeEditor
                  code={compact ? truncateContent(post.content) : post.content}
                  language={post.componentType?.includes('react') ? 'typescript' : 'html'}
                  readOnly
                  height="100%"
                />
              </div>
            )}
          </>
        ) : (
          <div className="h-full p-4">
            <MarkdownPreview content={compact ? truncateContent(post.content, 10) : post.content} />
          </div>
        )}

        {/* Fade overlay for compact mode */}
        {compact && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-neutral-900 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 4).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="px-2 py-1 text-neutral-500 dark:text-neutral-500 text-xs">
                +{post.tags.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={(e) => handleActionClick(e, () => onLike?.(post.id))}
              className={`flex items-center space-x-1 transition-colors ${
                post.liked ? 'text-red-500' : 'text-neutral-600 dark:text-neutral-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            
            <button
              onClick={(e) => handleActionClick(e, () => {})}
              className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
            
            <button
              onClick={(e) => handleActionClick(e, () => {})}
              className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <Share className="w-5 h-5" />
              <span className="text-sm font-medium">{post.shares}</span>
            </button>
          </div>
          
          <button
            onClick={(e) => handleActionClick(e, () => onBookmark?.(post.id))}
            className={`transition-colors ${
              post.bookmarked ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${post.bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;