import React, { useState } from 'react';
import axios from 'axios';
import PptxGenJS from 'pptxgenjs';
import { motion } from 'framer-motion';
import { InfinitySpin } from 'react-loader-spinner';
import './CreateWithAI.css';

const CreateWithAI = () => {
  const [topic, setTopic] = useState('');
  const [slidesCount, setSlidesCount] = useState(3);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTemplateImage, setSelectedTemplateImage] = useState('');

  const GEMINI_API =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDsDZJmml18dqhEwVDPSoZdhesZStaBDJ0';
  const PEXELS_API_KEY = 'OXU8cwkMcaVyOXum4Y02FgiUSbnlxUKygSyerIVnK6JBU6VtwkvIoHvd';

  function getFontColorBasedOnTemplate(templatePath) {
  if (templatePath === '/templates/template5.jpg') {
    return '#FFFFFF'; // Pure white for template 5
  }
  return '#111111'; // Thick black for all others
}


  const handleGenerateSlides = async () => {
    if (!topic || slidesCount < 1) return;
    setLoading(true);
    setSlides([]);

    try {
      const prompt = `Create exactly ${slidesCount} PowerPoint slides for a presentation on the topic "${topic}". Format your response exactly as follows:

Slide 1
Title: Slide title here
Paragraph: Slide paragraph here

Slide 2
Title: ...
Paragraph: ...

Only include the content in this exact format. Do not include any introduction, explanations, or extra text.`;

      const res = await axios.post(GEMINI_API, {
        contents: [{ parts: [{ text: prompt }] }],
      });

      const content = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const slideRegex =
        /Slide\s*\d+[\s\S]*?Title:\s*(.*?)\s*[\n\r]+Paragraph:\s*([\s\S]*?)(?=(Slide\s*\d+|$))/gi;
      let matches = [...content.matchAll(slideRegex)];

      if (!matches.length) {
        const fallbackSlides = content.split(/Slide\s*\d+/gi).slice(1);
        matches = fallbackSlides
          .map((chunk) => {
            const titleMatch = chunk.match(/Title:\s*(.*)/i);
            const paraMatch = chunk.match(/Paragraph:\s*([\s\S]*)/i);
            return titleMatch && paraMatch ? [null, titleMatch[1], paraMatch[1]] : null;
          })
          .filter(Boolean);

        if (!matches.length) {
          alert('No slides were parsed. Please try again or reword the topic.');
          return;
        }
      }

      const parsedSlides = matches.slice(0, slidesCount).map((match) => ({
        title: match[1]?.trim(),
        paragraph: match[2]?.trim().replace(/\*+$/, ''),
      }));

      const slidesWithImages = await Promise.all(
        parsedSlides.map(async (slide) => {
          const query = `${topic} ${slide.title} ${slide.paragraph.split(' ').slice(0, 5).join(' ')}`;
          const image = await fetchPexelsImage(query);
          return { ...slide, image };
        })
      );

      setSlides(slidesWithImages);
    } catch (err) {
      console.error('Gemini parsing error:', err);
      alert('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPexelsImage = async (query) => {
    try {
      const res = await axios.get('https://api.pexels.com/v1/search', {
        headers: { Authorization: PEXELS_API_KEY },
        params: { query, per_page: 1 },
      });
      return res.data?.photos?.[0]?.src?.large || '';
    } catch {
      return '';
    }
  };

  const handleManualImageEdit = (index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const localURL = URL.createObjectURL(file);
        const updated = [...slides];
        updated[index].image = localURL;
        setSlides(updated);
      }
    };
    input.click();
  };

  const handleExportPPT = () => {
    const pptx = new PptxGenJS();

    slides.forEach((slideData) => {
      const slide = pptx.addSlide();

      if (selectedTemplateImage) {
        slide.background = { path: selectedTemplateImage };
      } else {
        slide.background = { fill: 'FFFFFF' };
      }

      const textColor = getFontColorBasedOnTemplate(selectedTemplateImage);

      slide.addText(slideData.title, {
        x: 0.5,
        y: 0.3,
        w: 9,
        h: 0.6,
        fontSize: 24,
        bold: true,
        color: textColor,
        align: 'center',
      });

      if (slideData.image) {
        slide.addImage({
          path: slideData.image,
          x: 1.5,
          y: 1.0,
          w: 6,
          h: 2.2,
        });
      }

      slide.addText(slideData.paragraph, {
        x: 0.5,
        y: 3.5,
        w: 9,
        h: 3.2,
        fontSize: 14,
        color: textColor,
        align: 'left',
        lineSpacing: 24,
        wrap: true,
        valign: 'top',
      });
    });

    pptx.writeFile(`${topic}_Presentation.pptx`);
  };

  return (
    <div className="ai-container">
      <h2 className="ai-title">🎓 AI PowerPoint Generator</h2>

      <div className="ai-controls">
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input
          type="number"
          min="1"
          max="10"
          value={slidesCount}
          onChange={(e) => setSlidesCount(Number(e.target.value))}
        />
        <button onClick={handleGenerateSlides}>🚀 Generate PPT</button>
      </div>

      <div className="template-selection">
        <h4>Select Template</h4>
        <div className="template-options">
          {[1, 2, 3, 4, 5].map((num) => {
            const path = `/templates/template${num}.jpg`;
            return (
              <img
                key={num}
                src={path}
                alt={`Template ${num}`}
                onClick={() => setSelectedTemplateImage(path)}
                className={selectedTemplateImage === path ? 'selected' : ''}
              />
            );
          })}
          <button
            className={selectedTemplateImage === '' ? 'selected' : ''}
            onClick={() => setSelectedTemplateImage('')}
          >
            Default Template
          </button>
        </div>
      </div>

      {loading && (
        <div className="ai-loader">
          <InfinitySpin width="200" color="#4f46e5" />
        </div>
      )}

      <div className="ai-slides">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="ai-slide-card"
            style={{
              backgroundImage: selectedTemplateImage ? `url(${selectedTemplateImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: getFontColorBasedOnTemplate(selectedTemplateImage),
              border: '2px solid #ccc',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Slide {index + 1}</h3>
            <label><strong>Title:</strong></label>
            <input
              type="text"
              value={slide.title}
              onChange={(e) => {
                const updatedSlides = [...slides];
                updatedSlides[index].title = e.target.value;
                setSlides(updatedSlides);
              }}
            />
            {slide.image && (
              <>
                <img src={slide.image} alt="slide" className="ai-image" />
                <button onClick={() => handleManualImageEdit(index)} className="ai-edit-btn">
                  🖼️ Edit image
                </button>
              </>
            )}
            <label><strong>Paragraph:</strong></label>
            <textarea
              rows={5}
              value={slide.paragraph}
              onChange={(e) => {
                const updatedSlides = [...slides];
                updatedSlides[index].paragraph = e.target.value;
                setSlides(updatedSlides);
              }}
            />
          </motion.div>
        ))}
      </div>

      {slides.length > 0 && !loading && (
        <div className="ai-export">
          <button onClick={handleExportPPT}>💾 Export PPT</button>
        </div>
      )}
    </div>
  );
};

export default CreateWithAI;
