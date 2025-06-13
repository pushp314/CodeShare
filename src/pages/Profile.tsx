import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Share, Grid, Bookmark, Heart, MessageCircle, Check, Edit } from 'lucide-react';

const Profile = () => {
  const { currentUser, snippets } = useApp();
  const [activeTab, setActiveTab] = useState('snippets');
  const [isEditing, setIsEditing] = useState(false);

  const userSnippets = snippets.filter(snippet => snippet.author.id === currentUser.id);

  const tabs = [
    { id: 'snippets', label: 'Snippets', icon: Grid, count: currentUser.snippets },
    { id: 'saved', label: 'Saved', icon: Bookmark, count: 0 },
    { id: 'liked', label: 'Liked', icon: Heart, count: 0 },
  ];

  return (
    <div className="py-6">
      {/* Profile Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Avatar */}
          <div className="relative">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
              <Edit className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{currentUser.username}</h1>
              {currentUser.verified && (
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            
            <p className="text-gray-800 mb-4 leading-relaxed">{currentUser.bio}</p>
            
            {/* Stats */}
            <div className="flex space-x-6 mb-4">
              <div className="text-center">
                <div className="font-bold text-gray-900">{currentUser.snippets}</div>
                <div className="text-sm text-gray-500">snippets</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">{currentUser.followers.toLocaleString()}</div>
                <div className="text-sm text-gray-500">followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900">{currentUser.following}</div>
                <div className="text-sm text-gray-500">following</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button 
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Edit Profile
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                <Share className="w-4 h-4 inline mr-2" />
                Share
              </button>
              <button className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
                <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'snippets' && (
            <div>
              {userSnippets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userSnippets.map(snippet => (
                    <div key={snippet.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="bg-dark-900 text-gray-100 p-3 rounded text-sm font-mono mb-3 overflow-hidden">
                        <div className="text-xs text-gray-400 mb-2 capitalize">{snippet.language}</div>
                        <div className="truncate">{snippet.code.split('\n')[0]}</div>
                        {snippet.code.split('\n').length > 1 && (
                          <div className="text-gray-500">...</div>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{snippet.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{snippet.comments}</span>
                          </span>
                        </div>
                        <span>{snippet.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Grid className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No snippets yet</h3>
                  <p className="text-gray-500">Start sharing your code with the community!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved snippets</h3>
              <p className="text-gray-500">Bookmark snippets to save them here.</p>
            </div>
          )}

          {activeTab === 'liked' && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No liked snippets</h3>
              <p className="text-gray-500">Like snippets to see them here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;