import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownPreviewProps {
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  return (
    <div className="h-full overflow-auto bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
      <div className="p-6 prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 pb-3 border-b border-neutral-200 dark:border-neutral-700">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 mt-8">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 mt-6">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                {children}
              </p>
            ),
            code: ({ inline, children, ...props }) => (
              inline ? (
                <code className="bg-neutral-100 dark:bg-neutral-800 text-primary-600 dark:text-primary-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              ) : (
                <code className="block bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto font-mono text-sm" {...props}>
                  {children}
                </code>
              )
            ),
            pre: ({ children }) => (
              <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto mb-4">
                {children}
              </pre>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary-500 pl-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-neutral-700 dark:text-neutral-300 italic mb-4">
                {children}
              </blockquote>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 space-y-2 text-neutral-700 dark:text-neutral-300">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed">{children}</li>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto mb-4">
                <table className="min-w-full border border-neutral-200 dark:border-neutral-700 rounded-lg">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-left font-semibold text-neutral-900 dark:text-neutral-100">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-neutral-700 dark:text-neutral-300">
                {children}
              </td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownPreview;