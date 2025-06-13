import React, { useState } from 'react';
import { X, Code, FileText, Eye, EyeOff, Split, Maximize2, Copy, Check } from 'lucide-react';
import CodeEditor from './CodeEditor';
import MarkdownPreview from './MarkdownPreview';
import PreviewPanel from './PreviewPanel';

interface CreatePostProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: any) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ isOpen, onClose, onSubmit }) => {
  const [mode, setMode] = useState<'snippet' | 'documentation'>('snippet');
  const [componentType, setComponentType] = useState<'html-css' | 'html-tailwind' | 'react-tailwind'>('react-tailwind');
  const [code, setCode] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [caption, setCaption] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'split'>('preview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const componentTypes = [
    { id: 'html-css', label: 'HTML + CSS', language: 'html' },
    { id: 'html-tailwind', label: 'HTML + Tailwind', language: 'html' },
    { id: 'react-tailwind', label: 'React + Tailwind', language: 'typescript' },
  ];

  const categories = [
    'Components', 'Hooks', 'Utilities', 'Animations', 'Layouts',
    'React', 'TypeScript', 'JavaScript', 'CSS', 'Best Practices'
  ];

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mode === 'snippet' ? code : markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSubmit = () => {
    const post = {
      id: Date.now().toString(),
      type: mode,
      title: title || (mode === 'snippet' ? 'Code Snippet' : 'Documentation'),
      content: mode === 'snippet' ? code : markdown,
      caption: mode === 'snippet' ? caption : '',
      componentType: mode === 'snippet' ? componentType : undefined,
      category,
      tags,
      author: {
        id: '1',
        username: 'john_dev',
        name: 'John Developer',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        verified: true,
      },
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      bookmarks: 0,
      liked: false,
      bookmarked: false,
    };

    onSubmit(post);
    onClose();
    
    // Reset form
    setCode('');
    setMarkdown('');
    setCaption('');
    setTitle('');
    setCategory('');
    setTags([]);
    setViewMode('preview');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`bg-white dark:bg-neutral-900 rounded-xl shadow-2xl ${
        isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl h-[90vh]'
      } flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Create Post
            </h2>
            
            {/* Mode Toggle */}
            <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
              <button
                onClick={() => setMode('snippet')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  mode === 'snippet'
                    ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>Snippet</span>
              </button>
              <button
                onClick={() => setMode('documentation')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  mode === 'documentation'
                    ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Documentation</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Form */}
          <div className="w-1/3 border-r border-neutral-200 dark:border-neutral-700 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={mode === 'snippet' ? 'Snippet title...' : 'Documentation title...'}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                />
              </div>

              {/* Component Type (Snippet Mode) */}
              {mode === 'snippet' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Component Type
                  </label>
                  <div className="space-y-2">
                    {componentTypes.map(type => (
                      <label key={type.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="componentType"
                          value={type.id}
                          checked={componentType === type.id}
                          onChange={(e) => setComponentType(e.target.value as any)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-neutral-700 dark:text-neutral-300">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Caption (Snippet Mode) */}
              {mode === 'snippet' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Caption
                  </label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Describe your snippet..."
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 resize-none"
                  />
                </div>
              )}

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                >
                  <option value="">Select category...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add tags (press Enter)..."
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-md"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-primary-500 hover:text-primary-700 dark:hover:text-primary-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* View Mode Toggle (Snippet Mode) */}
              {mode === 'snippet' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    View Mode
                  </label>
                  <div className="flex bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('preview')}
                      className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
                        viewMode === 'preview'
                          ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400'
                          : 'text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => setViewMode('code')}
                      className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
                        viewMode === 'code'
                          ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400'
                          : 'text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <EyeOff className="w-4 h-4" />
                      <span>Code</span>
                    </button>
                    <button
                      onClick={() => setViewMode('split')}
                      className={`flex items-center space-x-1 px-3 py-1 rounded text-sm font-medium transition-colors ${
                        viewMode === 'split'
                          ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400'
                          : 'text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <Split className="w-4 h-4" />
                      <span>Split</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={!title || (mode === 'snippet' ? !code : !markdown)}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Publish
                </button>
                <button
                  onClick={handleCopy}
                  className="p-2 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Editor/Preview */}
          <div className="flex-1 flex flex-col">
            {mode === 'snippet' ? (
              <>
                {viewMode === 'preview' && (
                  <div className="flex-1 p-6">
                    <PreviewPanel
                      code={code}
                      language={componentTypes.find(t => t.id === componentType)?.language || 'typescript'}
                    />
                  </div>
                )}
                
                {viewMode === 'code' && (
                  <div className="flex-1 p-6">
                    <CodeEditor
                      code={code}
                      language={componentTypes.find(t => t.id === componentType)?.language || 'typescript'}
                      onChange={(value) => setCode(value || '')}
                      height="100%"
                    />
                  </div>
                )}
                
                {viewMode === 'split' && (
                  <div className="flex-1 flex">
                    <div className="w-1/2 p-3">
                      <CodeEditor
                        code={code}
                        language={componentTypes.find(t => t.id === componentType)?.language || 'typescript'}
                        onChange={(value) => setCode(value || '')}
                        height="100%"
                      />
                    </div>
                    <div className="w-1/2 p-3 border-l border-neutral-200 dark:border-neutral-700">
                      <PreviewPanel
                        code={code}
                        language={componentTypes.find(t => t.id === componentType)?.language || 'typescript'}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex">
                <div className="w-1/2 p-6">
                  <div className="h-full">
                    <CodeEditor
                      code={markdown}
                      language="markdown"
                      onChange={(value) => setMarkdown(value || '')}
                      height="100%"
                    />
                  </div>
                </div>
                <div className="w-1/2 p-6 border-l border-neutral-200 dark:border-neutral-700">
                  <MarkdownPreview content={markdown} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;