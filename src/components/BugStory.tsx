import React from 'react';
import { Clock } from 'lucide-react';

interface BugStoryProps {
  bug: any;
  onClick: () => void;
}

const BugStory = ({ bug, onClick }: BugStoryProps) => {
  return (
    <div 
      onClick={onClick}
      className="flex-shrink-0 w-20 cursor-pointer animate-slide-up"
    >
      <div className={`relative w-16 h-16 rounded-full border-2 ${
        bug.viewed ? 'border-gray-300' : 'border-gradient-to-r from-primary-500 to-code-500'
      } p-0.5 mb-2`}>
        <img 
          src={bug.author.avatar} 
          alt={bug.author.name}
          className="w-full h-full rounded-full object-cover"
        />
        {!bug.viewed && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-code-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-600 text-center truncate">{bug.author.username}</p>
    </div>
  );
};

interface BugStoriesProps {
  bugs: any[];
  onBugClick: (bug: any) => void;
}

const BugStories = ({ bugs, onBugClick }: BugStoriesProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">Today's Bugs</h2>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {bugs.map(bug => (
          <BugStory 
            key={bug.id} 
            bug={bug} 
            onClick={() => onBugClick(bug)} 
          />
        ))}
      </div>
    </div>
  );
};

export default BugStories;