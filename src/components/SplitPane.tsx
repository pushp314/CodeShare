import React, { useState, useRef, useCallback, useEffect } from 'react';

interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  direction?: 'horizontal' | 'vertical';
}

const SplitPane: React.FC<SplitPaneProps> = ({
  left,
  right,
  defaultSize = 50,
  minSize = 20,
  maxSize = 80,
  direction = 'horizontal',
}) => {
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    let newSize;
    if (direction === 'horizontal') {
      newSize = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    } else {
      newSize = ((e.clientY - containerRect.top) / containerRect.height) * 100;
    }
    
    setSize(Math.min(Math.max(newSize, minSize), maxSize));
  }, [isDragging, minSize, maxSize, direction]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp, direction]);

  if (direction === 'vertical') {
    return (
      <div ref={containerRef} className="flex flex-col h-full">
        <div style={{ height: `${size}%` }} className="overflow-hidden">
          {left}
        </div>
        
        <div
          className="h-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-primary-500 dark:hover:bg-primary-500 cursor-row-resize transition-colors relative group"
          onMouseDown={handleMouseDown}
        >
          <div className="absolute inset-x-0 -top-1 -bottom-1 group-hover:bg-primary-500/20 transition-colors" />
        </div>
        
        <div style={{ height: `${100 - size}%` }} className="overflow-hidden">
          {right}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex h-full">
      <div style={{ width: `${size}%` }} className="overflow-hidden">
        {left}
      </div>
      
      <div
        className="w-1 bg-neutral-200 dark:bg-neutral-700 hover:bg-primary-500 dark:hover:bg-primary-500 cursor-col-resize transition-colors relative group"
        onMouseDown={handleMouseDown}
      >
        <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-primary-500/20 transition-colors" />
      </div>
      
      <div style={{ width: `${100 - size}%` }} className="overflow-hidden">
        {right}
      </div>
    </div>
  );
};

export default SplitPane;