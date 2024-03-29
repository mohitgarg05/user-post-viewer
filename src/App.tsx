// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserPosts from './components/UserPosts';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* User List Screen */}
        <Route path="/users" element={<UserList />} />

        {/* User Posts Screen */}
        <Route path="/user/:userId" element={<UserPosts />} />

        {/* Default Route */}
        <Route path="/" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;
