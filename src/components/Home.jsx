// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMagic, FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <motion.h1
  className="animated-title"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <span className="brand">@Pandu</span>
  <span className="gradient-glow"> PPT Generator</span>
</motion.h1>


      <motion.p
        className="tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Create beautiful PowerPoint presentations using AI or manually with just a few clicks!
      </motion.p>

      <motion.div
        className="home-buttons"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.button
          className="btn-ai"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/create-ai')}
        >
          <FaMagic className="btn-icon" />
          Create Using AI
        </motion.button>

        <motion.button
          className="btn-manual"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/create-manual')}
        >
          <FaEdit className="btn-icon" />
          Create Manually
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;
