import React, { useState } from 'react';
import { Menu, X, Code2, FileText, Settings } from 'lucide-react';
import { useCode } from '../context/CodeContext';
import Sidebar from '../components/Sidebar';
import CodeEditor from '../components/CodeEditor';
import PreviewPanel from '../components/PreviewPanel';
import MarkdownPreview from '../components/MarkdownPreview';
import SplitPane from '../components/SplitPane';
import ThemeToggle from '../components/ThemeToggle';

const CodePlayground: React.FC = () => {
  const { activeSnippet, activeDoc } = useCode();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentCode, setCurrentCode] = useState('');

  React.useEffect(() => {
    if (activeSnippet) {
      setCurrentCode(activeSnippet.code);
    }
  }, [activeSnippet]);

  const handleCodeChange = (value: string) => {
    setCurrentCode(value || '');
  };

  return (
    <div className="h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors lg:hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <Code2 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                CodeGram Playground
              </h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Interactive code editor and preview
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <button className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
          <Sidebar />
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {activeSnippet || activeDoc ? (
            <>
              {/* Content Header */}
              <div className="h-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 flex items-center px-6">
                <div className="flex items-center space-x-3">
                  {activeSnippet ? (
                    <>
                      <Code className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <div>
                        <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {activeSnippet.title}
                        </h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {activeSnippet.description}
                        </p>
                      </div>
                    </>
                  ) : activeDoc ? (
                    <>
                      <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <div>
                        <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">
                          {activeDoc.title}
                        </h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          Documentation
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              {/* Split View */}
              <div className="flex-1">
                {activeSnippet ? (
                  <SplitPane
                    left={
                      <div className="h-full p-4">
                        <CodeEditor
                          code={currentCode}
                          language={activeSnippet.language}
                          onChange={handleCodeChange}
                          height="100%"
                        />
                      </div>
                    }
                    right={
                      <div className="h-full p-4">
                        <PreviewPanel
                          code={currentCode}
                          language={activeSnippet.language}
                        />
                      </div>
                    }
                  />
                ) : activeDoc ? (
                  <div className="h-full p-4">
                    <MarkdownPreview content={activeDoc.content} />
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            // Welcome Screen
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Code2 className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Welcome to CodeGram Playground
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Select a code snippet or documentation from the sidebar to start exploring. 
                  You can edit code in real-time and see the preview instantly.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-neutral-500 dark:text-neutral-500">
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4" />
                    <span>Live Preview</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Markdown Support</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;