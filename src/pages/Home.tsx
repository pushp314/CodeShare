import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SnippetCard from '../components/SnippetCard';
import BugStories from '../components/BugStory';
import BugModal from '../components/BugModal';

const Home = () => {
  const { snippets, bugs } = useApp();
  const [selectedBug, setSelectedBug] = useState<any>(null);

  const handleBugClick = (bug: any) => {
    setSelectedBug(bug);
  };

  const closeBugModal = () => {
    setSelectedBug(null);
  };

  return (
    <div className="py-6">
      {/* Bug Stories */}
      <BugStories bugs={bugs} onBugClick={handleBugClick} />
      
      {/* Snippets Feed */}
      <div className="space-y-6">
        {snippets.map(snippet => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>

      {/* Bug Modal */}
      {selectedBug && (
        <BugModal bug={selectedBug} onClose={closeBugModal} />
      )}
    </div>
  );
};

export default Home;