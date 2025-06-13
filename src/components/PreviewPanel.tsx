import React, { useState, useRef, useEffect } from 'react';
import { Smartphone, Tablet, Monitor, Maximize2, RefreshCw } from 'lucide-react';

interface PreviewPanelProps {
  code: string;
  language: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ code, language }) => {
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const previewSizes = {
    mobile: { width: '375px', height: '667px' },
    tablet: { width: '768px', height: '1024px' },
    desktop: { width: '100%', height: '100%' },
  };

  const generatePreviewHTML = () => {
    if (language === 'html') {
      return code;
    }

    if (language === 'javascript' || language === 'typescript') {
      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f9fafb;
        }
        .preview-container {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        ${code}
        
        // Try to render if it's a React component
        try {
            if (typeof Button !== 'undefined') {
                ReactDOM.render(
                    React.createElement('div', { className: 'preview-container' },
                        React.createElement(Button, { 
                            onClick: () => alert('Button clicked!') 
                        }, 'Click me'),
                        React.createElement('br'),
                        React.createElement('br'),
                        React.createElement(Button, { 
                            variant: 'secondary',
                            size: 'lg'
                        }, 'Secondary Button'),
                        React.createElement('br'),
                        React.createElement('br'),
                        React.createElement(Button, { 
                            variant: 'outline',
                            size: 'sm'
                        }, 'Outline Button')
                    ),
                    document.getElementById('root')
                );
            } else if (typeof Card !== 'undefined') {
                ReactDOM.render(
                    React.createElement('div', { className: 'preview-container' },
                        React.createElement(Card, {
                            title: 'Sample Card',
                            description: 'This is a preview of the Card component',
                            image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop'
                        }, React.createElement('button', { 
                            style: { 
                                padding: '8px 16px', 
                                background: '#6366f1', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '6px',
                                cursor: 'pointer'
                            }
                        }, 'Learn More'))
                    ),
                    document.getElementById('root')
                );
            }
        } catch (error) {
            document.getElementById('root').innerHTML = '<div class="preview-container"><p>Preview not available for this code snippet.</p><p>Error: ' + error.message + '</p></div>';
        }
    </script>
</body>
</html>`;
    }

    if (language === 'css') {
      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Preview</title>
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        ${code}
    </style>
</head>
<body>
    <div class="preview-container">
        <h1>CSS Preview</h1>
        <p>Your CSS styles are applied to this page.</p>
        <button class="btn">Sample Button</button>
        <div class="card">
            <h2>Sample Card</h2>
            <p>This is a sample card to demonstrate your CSS styles.</p>
        </div>
    </div>
</body>
</html>`;
    }

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Preview</title>
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            font-family: 'JetBrains Mono', Monaco, Consolas, monospace;
            background: #f9fafb;
        }
        .code-container {
            background: #1f2937;
            color: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
        }
        pre { margin: 0; }
    </style>
</head>
<body>
    <div class="code-container">
        <pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
    </div>
</body>
</html>`;
  };

  const refreshPreview = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.src = 'about:blank';
        setTimeout(() => {
          if (iframeRef.current) {
            const blob = new Blob([generatePreviewHTML()], { type: 'text/html' });
            iframeRef.current.src = URL.createObjectURL(blob);
          }
          setIsRefreshing(false);
        }, 100);
      }
    }, 300);
  };

  useEffect(() => {
    refreshPreview();
  }, [code, language]);

  const previewModes = [
    { id: 'mobile', icon: Smartphone, label: 'Mobile' },
    { id: 'tablet', icon: Tablet, label: 'Tablet' },
    { id: 'desktop', icon: Monitor, label: 'Desktop' },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex items-center space-x-1">
          {previewModes.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setPreviewMode(id as any)}
              className={`p-2 rounded transition-colors ${
                previewMode === id
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
              title={label}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={refreshPreview}
            disabled={isRefreshing}
            className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors disabled:opacity-50"
            title="Refresh Preview"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-4 bg-neutral-50 dark:bg-neutral-800">
        <div 
          className="mx-auto bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300"
          style={{
            width: previewSizes[previewMode].width,
            height: previewMode === 'desktop' ? '100%' : previewSizes[previewMode].height,
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0"
            title="Code Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;