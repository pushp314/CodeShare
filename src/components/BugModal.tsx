import React, { useEffect } from 'react';
import { X, Clock, User } from 'lucide-react';

interface BugModalProps {
  bug: any;
  onClose: () => void;
}

const BugModal = ({ bug, onClose }: BugModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img 
              src={bug.author.avatar} 
              alt={bug.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{bug.author.username}</h3>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{bug.timestamp}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{bug.title}</h2>
          
          {bug.image && (
            <img 
              src={bug.image} 
              alt={bug.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          
          <p className="text-gray-800 leading-relaxed">{bug.description}</p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <User className="w-4 h-4" />
            <span>Tap outside to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugModal;