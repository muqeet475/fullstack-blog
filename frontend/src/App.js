// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Home from './components/Home';
import CreatePost from './components/CreatePost';

const App = () => {
  // Remove the useContext and isAuthenticated logic since AuthContext is removed
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-post" element={<CreatePost />} /> {/* No need to pass isAuthenticated */}
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
