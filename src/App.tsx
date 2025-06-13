import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Documentation from './pages/Documentation';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import CodePlayground from './pages/CodePlayground';
import PostDetail from './pages/PostDetail';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { CodeProvider } from './context/CodeContext';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <CodeProvider>
          <Router>
            <Routes>
              <Route path="/playground" element={<CodePlayground />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/documentation" element={<Documentation />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </Router>
        </CodeProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;