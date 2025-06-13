import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Bookmark, 
  UserX, 
  Info, 
  MessageSquare, 
  LogOut, 
  Trash,
  ChevronRight,
  Moon,
  Globe,
  Eye
} from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    messages: true,
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showActivity: true,
    allowMessages: true,
  });

  const settingSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Edit Profile', action: () => console.log('Edit profile') },
        { label: 'Change Password', action: () => console.log('Change password') },
        { label: 'Email Preferences', action: () => console.log('Email preferences') },
      ]
    },
    {
      title: 'Content',
      icon: Bookmark,
      items: [
        { label: 'Saved Snippets', action: () => console.log('Saved snippets') },
        { label: 'Liked Content', action: () => console.log('Liked content') },
        { label: 'Bookmarked Docs', action: () => console.log('Bookmarked docs') },
      ]
    },
    {
      title: 'Social',
      icon: UserX,
      items: [
        { label: 'Blocked Users', action: () => console.log('Blocked users') },
        { label: 'Following', action: () => console.log('Following') },
        { label: 'Followers', action: () => console.log('Followers') },
      ]
    },
    {
      title: 'Support',
      icon: Info,
      items: [
        { label: 'About CodeGram', action: () => console.log('About') },
        { label: 'Send Feedback', action: () => console.log('Feedback') },
        { label: 'Help Center', action: () => console.log('Help') },
      ]
    }
  ];

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and privacy settings.</p>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 capitalize">{key}</h3>
                <p className="text-sm text-gray-500">
                  Get notified when someone {key === 'follows' ? 'follows you' : `${key} your content`}
                </p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`${
                    value ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">Privacy</h2>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {Object.entries(privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">
                  {key === 'profilePublic' && 'Public Profile'}
                  {key === 'showActivity' && 'Show Activity Status'}
                  {key === 'allowMessages' && 'Allow Direct Messages'}
                </h3>
                <p className="text-sm text-gray-500">
                  {key === 'profilePublic' && 'Make your profile visible to everyone'}
                  {key === 'showActivity' && 'Show when you were last active'}
                  {key === 'allowMessages' && 'Let others send you direct messages'}
                </p>
              </div>
              <button
                onClick={() => setPrivacy(prev => ({ ...prev, [key]: !value }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`${
                    value ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Sections */}
      {settingSections.map(section => (
        <div key={section.title} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <section.icon className="w-6 h-6 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {section.items.map(item => (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <span className="font-medium text-gray-900">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Appearance */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Moon className="w-6 h-6 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border-2 border-primary-600 rounded-lg bg-primary-50">
              <div className="w-full h-12 bg-white rounded mb-2"></div>
              <span className="text-sm font-medium text-primary-600">Light</span>
            </button>
            <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div className="w-full h-12 bg-gray-800 rounded mb-2"></div>
              <span className="text-sm font-medium text-gray-600">Dark</span>
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white border border-red-200 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-red-200">
          <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <LogOut className="w-5 h-5 text-red-600" />
              <div>
                <h3 className="font-medium text-red-900">Log Out</h3>
                <p className="text-sm text-red-600">Sign out of your account</p>
              </div>
            </div>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left">
            <div className="flex items-center space-x-3">
              <Trash className="w-5 h-5 text-red-600" />
              <div>
                <h3 className="font-medium text-red-900">Delete Account</h3>
                <p className="text-sm text-red-600">Permanently delete your account and all data</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;