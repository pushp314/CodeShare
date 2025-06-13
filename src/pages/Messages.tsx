import React, { useState } from 'react';
import { Search, MessageCircle, Send, MoreVertical, Phone, Video, Info } from 'lucide-react';

const Messages = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: '1',
      user: {
        id: '2',
        username: 'sarah_codes',
        name: 'Sarah Wilson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        online: true,
      },
      lastMessage: 'Thanks for the code review! 🚀',
      timestamp: '2m',
      unread: 2,
    },
    {
      id: '2',
      user: {
        id: '3',
        username: 'mike_python',
        name: 'Mike Chen',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        online: false,
      },
      lastMessage: 'That Python script worked perfectly!',
      timestamp: '1h',
      unread: 0,
    },
    {
      id: '3',
      user: {
        id: '4',
        username: 'alex_debug',
        name: 'Alex Turner',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        online: true,
      },
      lastMessage: 'Can you help me with this bug?',
      timestamp: '3h',
      unread: 1,
    },
  ];

  const messages = [
    {
      id: '1',
      senderId: '2',
      text: 'Hey! I saw your React hook snippet. Really clean implementation!',
      timestamp: '10:30 AM',
      isMine: false,
    },
    {
      id: '2',
      senderId: '1',
      text: 'Thanks! I spent some time optimizing it for performance.',
      timestamp: '10:32 AM',
      isMine: true,
    },
    {
      id: '3',
      senderId: '2',
      text: 'Could you share more details about the optimization techniques you used?',
      timestamp: '10:33 AM',
      isMine: false,
    },
    {
      id: '4',
      senderId: '1',
      text: 'Sure! I mainly focused on memoization and avoiding unnecessary re-renders. I can create a detailed snippet about it.',
      timestamp: '10:35 AM',
      isMine: true,
    },
    {
      id: '5',
      senderId: '2',
      text: 'Thanks for the code review! 🚀',
      timestamp: '10:40 AM',
      isMine: false,
    },
  ];

  const selectedConversation = conversations.find(conv => conv.id === activeChat);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would typically send the message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-5rem)] flex bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Conversations List */}
      <div className={`w-full lg:w-1/3 border-r border-gray-200 flex flex-col ${activeChat ? 'hidden lg:flex' : 'flex'}`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conversation => (
            <div
              key={conversation.id}
              onClick={() => setActiveChat(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeChat === conversation.id ? 'bg-primary-50 border-primary-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={conversation.user.avatar} 
                    alt={conversation.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-code-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{conversation.user.username}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
                
                {conversation.unread > 0 && (
                  <div className="w-6 h-6 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                    {conversation.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${activeChat ? 'flex' : 'hidden lg:flex'}`}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setActiveChat(null)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ←
                </button>
                <img 
                  src={selectedConversation?.user.avatar} 
                  alt={selectedConversation?.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedConversation?.user.username}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedConversation?.user.online ? 'Online' : 'Last seen 2h ago'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Info className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.isMine
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.isMine ? 'text-primary-100' : 'text-gray-500'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          // Empty State
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the sidebar to start messaging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;