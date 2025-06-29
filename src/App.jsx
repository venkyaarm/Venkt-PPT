// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateWithAI from './components/CreateWithAI';
import CreateManual from './components/CreateManual';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-ai" element={<CreateWithAI />} />
        <Route path="/create-manual" element={<CreateManual />} />
      </Routes>
    </Router>
  );
}

export default App;
