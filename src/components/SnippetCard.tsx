import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Bookmark, Code, Copy, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SnippetCardProps {
  snippet: any;
}

const SnippetCard = ({ snippet }: SnippetCardProps) => {
  const { toggleLike, toggleBookmark } = useApp();
  const [copied, setCopied] = useState(false);
  const [showFullCode, setShowFullCode] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const truncateCode = (code: string, maxLines: number = 8) => {
    const lines = code.split('\n');
    if (lines.length <= maxLines) return code;
    return lines.slice(0, maxLines).join('\n') + '\n...';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6 animate-fade-in">
      {/* Header */}
      <div className="p-4 flex items-center space-x-3">
        <img 
          src={snippet.author.avatar} 
          alt={snippet.author.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{snippet.author.username}</h3>
            {snippet.author.verified && (
              <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">{snippet.timestamp}</p>
        </div>
      </div>

      {/* Code Block */}
      <div className="relative">
        <div className="bg-dark-900 text-gray-100 p-4 overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-code-400" />
              <span className="text-sm text-gray-400 capitalize">{snippet.language}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-2 py-1 bg-dark-800 hover:bg-dark-700 rounded text-sm transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-code-400" />
                  <span className="text-code-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-sm font-mono whitespace-pre-wrap">
            <code>
              {showFullCode ? snippet.code : truncateCode(snippet.code)}
            </code>
          </pre>
          {snippet.code.split('\n').length > 8 && (
            <button
              onClick={() => setShowFullCode(!showFullCode)}
              className="text-primary-400 text-sm mt-2 hover:underline"
            >
              {showFullCode ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>

      {/* Caption */}
      {snippet.caption && (
        <div className="p-4 pt-3">
          <p className="text-gray-800">{snippet.caption}</p>
        </div>
      )}

      {/* Actions */}
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => toggleLike(snippet.id)}
              className={`flex items-center space-x-1 transition-colors ${
                snippet.liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-6 h-6 ${snippet.liked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{snippet.likes}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm font-medium">{snippet.comments}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
              <Share className="w-6 h-6" />
              <span className="text-sm font-medium">{snippet.shares}</span>
            </button>
          </div>
          
          <button
            onClick={() => toggleBookmark(snippet.id)}
            className={`transition-colors ${
              snippet.bookmarked ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
            }`}
          >
            <Bookmark className={`w-6 h-6 ${snippet.bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;