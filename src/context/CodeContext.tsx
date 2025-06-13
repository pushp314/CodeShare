import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
}

interface Documentation {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
}

interface CodeContextType {
  snippets: CodeSnippet[];
  documentation: Documentation[];
  activeSnippet: CodeSnippet | null;
  activeDoc: Documentation | null;
  setActiveSnippet: (snippet: CodeSnippet | null) => void;
  setActiveDoc: (doc: Documentation | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CodeContext = createContext<CodeContextType | undefined>(undefined);

export const useCode = () => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error('useCode must be used within a CodeProvider');
  }
  return context;
};

export const CodeProvider = ({ children }: { children: ReactNode }) => {
  const [activeSnippet, setActiveSnippet] = useState<CodeSnippet | null>(null);
  const [activeDoc, setActiveDoc] = useState<Documentation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const snippets: CodeSnippet[] = [
    {
      id: '1',
      title: 'React Button Component',
      description: 'A reusable button component with multiple variants',
      code: `import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }\`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;`,
      language: 'typescript',
      category: 'components',
      tags: ['react', 'typescript', 'button', 'ui'],
      author: 'CodeGram Team',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Custom Hook - useLocalStorage',
      description: 'A custom React hook for managing localStorage',
      code: `import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;`,
      language: 'typescript',
      category: 'hooks',
      tags: ['react', 'typescript', 'hooks', 'localStorage'],
      author: 'CodeGram Team',
      createdAt: '2024-01-16',
      updatedAt: '2024-01-16',
    },
    {
      id: '3',
      title: 'Animated Card Component',
      description: 'A beautiful card component with hover animations',
      code: `import React from 'react';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  children,
  className = '',
}) => {
  return (
    <div className={\`group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 shadow-glass dark:shadow-glass-dark border border-neutral-200 dark:border-neutral-700 transition-all duration-300 hover:scale-105 hover:shadow-xl \${className}\`}>
      {image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
          {title}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          {description}
        </p>
        {children}
      </div>
      
      {/* Glassmorphic overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default Card;`,
      language: 'typescript',
      category: 'components',
      tags: ['react', 'typescript', 'card', 'animation', 'glassmorphism'],
      author: 'CodeGram Team',
      createdAt: '2024-01-17',
      updatedAt: '2024-01-17',
    },
  ];

  const documentation: Documentation[] = [
    {
      id: '1',
      title: 'Getting Started with React',
      content: `# Getting Started with React

React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Key Concepts

### Components

Components are the building blocks of React applications. They're like JavaScript functions that accept inputs (called "props") and return React elements describing what should appear on the screen.

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

### JSX

JSX is a syntax extension to JavaScript. It produces React "elements" and allows you to write HTML-like syntax in your JavaScript code.

\`\`\`jsx
const element = <h1>Hello, world!</h1>;
\`\`\`

### Props

Props are how components talk to each other. They're read-only and help you pass data from parent to child components.

\`\`\`jsx
function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}
\`\`\`

### State

State allows React components to change their output over time in response to user actions, network responses, and anything else.

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Best Practices

1. **Keep components small and focused**
2. **Use functional components with hooks**
3. **Follow naming conventions**
4. **Use TypeScript for better type safety**
5. **Optimize performance with React.memo and useMemo**

## Next Steps

- Learn about React Hooks
- Understand component lifecycle
- Explore state management solutions
- Build your first React application`,
      category: 'react',
      tags: ['react', 'javascript', 'frontend', 'tutorial'],
      author: 'CodeGram Team',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'TypeScript Best Practices',
      content: `# TypeScript Best Practices

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## Why TypeScript?

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-Documenting Code**: Types serve as documentation
- **Easier Refactoring**: Confident code changes

## Essential Types

### Basic Types

\`\`\`typescript
// Primitives
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];
\`\`\`

### Interfaces

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  isActive?: boolean; // Optional property
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
\`\`\`

### Union Types

\`\`\`typescript
type Status = "loading" | "success" | "error";
type ID = string | number;

function handleStatus(status: Status) {
  switch (status) {
    case "loading":
      return "Loading...";
    case "success":
      return "Success!";
    case "error":
      return "Error occurred";
  }
}
\`\`\`

### Generics

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userResponse: ApiResponse<User> = {
  data: user,
  status: 200,
  message: "Success"
};
\`\`\`

## Best Practices

### 1. Use Strict Mode

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

### 2. Prefer Interfaces Over Types

\`\`\`typescript
// Good
interface User {
  name: string;
  age: number;
}

// Less preferred for object shapes
type User = {
  name: string;
  age: number;
};
\`\`\`

### 3. Use Utility Types

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Pick specific properties
type PublicUser = Pick<User, 'id' | 'name' | 'email'>;

// Omit sensitive properties
type SafeUser = Omit<User, 'password'>;

// Make all properties optional
type PartialUser = Partial<User>;
\`\`\`

### 4. Use Const Assertions

\`\`\`typescript
// Without const assertion
const colors = ['red', 'green', 'blue']; // string[]

// With const assertion
const colors = ['red', 'green', 'blue'] as const; // readonly ['red', 'green', 'blue']
\`\`\`

## Common Patterns

### React Component Props

\`\`\`typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  // Component implementation
};
\`\`\`

### API Response Handling

\`\`\`typescript
interface ApiError {
  message: string;
  code: number;
}

type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: ApiError };

async function fetchUser(id: number): Promise<Result<User>> {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { 
      success: false, 
      error: { message: 'Failed to fetch user', code: 500 } 
    };
  }
}
\`\`\`

## Conclusion

TypeScript enhances JavaScript development by providing type safety and better tooling. Start with basic types and gradually adopt more advanced features as you become comfortable with the language.`,
      category: 'typescript',
      tags: ['typescript', 'javascript', 'types', 'best-practices'],
      author: 'CodeGram Team',
      createdAt: '2024-01-16',
      updatedAt: '2024-01-16',
    },
  ];

  return (
    <CodeContext.Provider value={{
      snippets,
      documentation,
      activeSnippet,
      activeDoc,
      setActiveSnippet,
      setActiveDoc,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
    }}>
      {children}
    </CodeContext.Provider>
  );
};