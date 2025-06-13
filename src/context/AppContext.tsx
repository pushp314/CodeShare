import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  snippets: number;
  gender: string;
  verified: boolean;
}

interface Snippet {
  id: string;
  author: User;
  code: string;
  language: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  timestamp: string;
  liked: boolean;
  bookmarked: boolean;
}

interface Bug {
  id: string;
  author: User;
  title: string;
  description: string;
  image: string;
  timestamp: string;
  viewed: boolean;
}

interface Documentation {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: User;
  likes: number;
  comments: number;
  bookmarks: number;
  category: string;
  timestamp: string;
  content: string;
}

interface AppContextType {
  currentUser: User;
  snippets: Snippet[];
  bugs: Bug[];
  documentation: Documentation[];
  toggleLike: (snippetId: string) => void;
  toggleBookmark: (snippetId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser] = useState<User>({
    id: '1',
    username: 'john_dev',
    name: 'John Developer',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Full-stack developer passionate about React, Node.js, and clean code. Building the future one commit at a time.',
    followers: 1234,
    following: 567,
    snippets: 89,
    gender: 'male',
    verified: true,
  });

  const [snippets, setSnippets] = useState<Snippet[]>([
    {
      id: '1',
      author: {
        id: '2',
        username: 'sarah_codes',
        name: 'Sarah Wilson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        bio: 'Frontend specialist',
        followers: 892,
        following: 234,
        snippets: 45,
        gender: 'female',
        verified: true,
      },
      code: `const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};`,
      language: 'javascript',
      caption: 'Custom React hook for localStorage management 🚀 Perfect for persisting state across sessions!',
      likes: 156,
      comments: 23,
      shares: 12,
      bookmarks: 45,
      timestamp: '2 hours ago',
      liked: false,
      bookmarked: false,
    },
    {
      id: '2',
      author: {
        id: '3',
        username: 'mike_python',
        name: 'Mike Chen',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        bio: 'Python enthusiast',
        followers: 1567,
        following: 345,
        snippets: 123,
        gender: 'male',
        verified: false,
      },
      code: `def fibonacci_generator():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Usage
fib = fibonacci_generator()
first_10 = [next(fib) for _ in range(10)]
print(first_10)  # Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
      language: 'python',
      caption: 'Elegant Fibonacci generator using Python generators! Memory efficient and infinite sequence 🐍',
      likes: 203,
      comments: 31,
      shares: 18,
      bookmarks: 67,
      timestamp: '4 hours ago',
      liked: true,
      bookmarked: true,
    },
  ]);

  const [bugs] = useState<Bug[]>([
    {
      id: '1',
      author: {
        id: '4',
        username: 'alex_debug',
        name: 'Alex Turner',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        bio: 'Debug master',
        followers: 456,
        following: 123,
        snippets: 67,
        gender: 'male',
        verified: false,
      },
      title: 'CSS Grid Mystery',
      description: 'Spent 3 hours debugging grid alignment... turns out I had a typo in grid-template-areas 🤦‍♂️',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      timestamp: '1 hour ago',
      viewed: false,
    },
    {
      id: '2',
      author: {
        id: '5',
        username: 'emma_react',
        name: 'Emma Davis',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        bio: 'React developer',
        followers: 789,
        following: 234,
        snippets: 89,
        gender: 'female',
        verified: true,
      },
      title: 'State Management Nightmare',
      description: 'When you forget to use useCallback and your component re-renders infinitely... 🔄',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      timestamp: '3 hours ago',
      viewed: true,
    },
  ]);

  const [documentation] = useState<Documentation[]>([
    {
      id: '1',
      title: 'React Performance Optimization Guide',
      description: 'Learn advanced techniques to optimize your React applications for better performance.',
      thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
      author: {
        id: '6',
        username: 'perf_guru',
        name: 'Performance Guru',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        bio: 'Performance expert',
        followers: 2345,
        following: 456,
        snippets: 234,
        gender: 'male',
        verified: true,
      },
      likes: 456,
      comments: 67,
      bookmarks: 123,
      category: 'React',
      timestamp: '1 day ago',
      content: '# React Performance Optimization\n\nThis guide covers various techniques...',
    },
  ]);

  const toggleLike = (snippetId: string) => {
    setSnippets(prev => prev.map(snippet => 
      snippet.id === snippetId 
        ? { 
            ...snippet, 
            liked: !snippet.liked,
            likes: snippet.liked ? snippet.likes - 1 : snippet.likes + 1
          }
        : snippet
    ));
  };

  const toggleBookmark = (snippetId: string) => {
    setSnippets(prev => prev.map(snippet => 
      snippet.id === snippetId 
        ? { 
            ...snippet, 
            bookmarked: !snippet.bookmarked,
            bookmarks: snippet.bookmarked ? snippet.bookmarks - 1 : snippet.bookmarks + 1
          }
        : snippet
    ));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      snippets,
      bugs,
      documentation,
      toggleLike,
      toggleBookmark,
    }}>
      {children}
    </AppContext.Provider>
  );
};