// src/components/CreateManual.jsx
import React, { useState } from 'react';
import PPTXGenJS from 'pptxgenjs';
import './CreateManual.css';

function CreateManual() {
  const createNewSlide = () => ({
    title: '',
    text: '',
    image: null,
  });

  const [slides, setSlides] = useState([createNewSlide()]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState('');

  const handleChange = (index, field, value) => {
    const updatedSlides = [...slides];
    updatedSlides[index][field] = value;
    setSlides(updatedSlides);
  };

  const addSlide = () => {
    setSlides([...slides, createNewSlide()]);
    setCurrentSlide(slides.length);
  };

  const deleteSlide = (index) => {
    if (slides.length === 1) return;
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides);
    setCurrentSlide(Math.max(0, index - 1));
  };

  const clearImage = (index) => handleChange(index, 'image', null);

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => handleChange(index, 'image', reader.result);
    reader.readAsDataURL(file);
  };

  const exportPPT = () => {
    const pptx = new PPTXGenJS();

    const SLIDE_HEIGHT = 7.0;
    const TITLE_Y = 0.3;
    const TITLE_H = 0.7;
    const SPACING_AFTER_TITLE = 0.2;
    const IMAGE_H = 2.2;
    const SPACING_AFTER_IMAGE = 0;

    slides.forEach((slideData) => {
      const slide = pptx.addSlide();

      // Background
      if (selectedTemplate) {
        slide.background = { path: selectedTemplate };
      }

      // Font color
      const fontColor = selectedTemplate === '/templates/template5.jpg' ? 'FFFFFF' : '000000';

      slide.addText(slideData.title, {
        x: 0.5,
        y: TITLE_Y,
        w: '90%',
        h: TITLE_H,
        fontSize: 24,
        bold: true,
        align: 'center',
        color: fontColor,
      });

      const imageY = TITLE_Y + TITLE_H + SPACING_AFTER_TITLE;
      if (slideData.image) {
        slide.addImage({
          data: slideData.image,
          x: 1.5,
          y: imageY,
          w: 5.5,
          h: IMAGE_H,
        });
      }

      const textY = imageY + IMAGE_H + SPACING_AFTER_IMAGE;
      const remainingHeight = SLIDE_HEIGHT - textY - 0.5;

      slide.addText(slideData.text, {
        x: 0.7,
        y: textY,
        w: 8,
        h: remainingHeight,
        fontSize: 16,
        align: 'left',
        wrap: true,
        shrinkText: true,
        color: fontColor,
      });

      slide.addText('© @Venky | Pandu Manual Generator', {
        x: 0.3,
        y: 6.6,
        w: 9,
        h: 0.3,
        fontSize: 10,
        color: '666666',
        align: 'center',
      });
    });

    pptx.writeFile('Pandu_Manual_PPT.pptx');
  };

  const isTextTooLong = (text) => text.split(' ').length > 100;
  const slide = slides[currentSlide];

  return (
    <div className="manual-container">
      <h2>📘 Create Manual PPT</h2>

      <div className="slide-nav">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={idx === currentSlide ? 'active' : ''}
            onClick={() => setCurrentSlide(idx)}
          >
            Slide {idx + 1}
          </button>
        ))}
        <button onClick={addSlide}>➕ Add Slide</button>
        <button onClick={() => deleteSlide(currentSlide)} className="delete-btn">🗑️ Delete Slide</button>
        <button onClick={() => setPreviewMode(!previewMode)} className="preview-btn">
          {previewMode ? '🛠️ Edit Mode' : '👁️ Preview Mode'}
        </button>
      </div>

      <div className="template-select">
        <label>Select Template:</label>
        <select
          value={selectedTemplate}
          onChange={(e) => {
            setSelectedTemplate(e.target.value);
            setPreviewTemplate(e.target.value);
          }}
        >
          <option value="">Default</option>
          <option value="/templates/template1.jpg">Design 1</option>
          <option value="/templates/template2.jpg">Design 2</option>
          <option value="/templates/template3.jpg">Design 3</option>
          <option value="/templates/template4.jpg">Design 4</option>
          <option value="/templates/template5.jpg">Design 5</option>
        </select>

        {previewTemplate && (
          <div className="template-preview">
            <p><strong>Preview:</strong></p>
            <img src={previewTemplate} alt="Template Preview" width="300" />
          </div>
        )}
      </div>

      {!previewMode ? (
        <div className="slide-editor">title
          <input
            className="title-input"
            placeholder="Enter Slide Title"
            value={slide.title}
            onChange={(e) => handleChange(currentSlide, 'title', e.target.value)}
          />

          <label>
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, currentSlide)}
            />
          </label>

          {slide.image && (
            <div>
              <img src={slide.image} alt="Preview" width="300" />
              <button onClick={() => clearImage(currentSlide)}>Clear Image</button>
            </div>
          )}
paragraph
          <textarea
            placeholder="Enter content below image..."
            value={slide.text}
            onChange={(e) => handleChange(currentSlide, 'text', e.target.value)}
          />

          {/* Live Real-Time Slide Preview Panel */}
          <div className="live-preview-panel">
            <h3>🔍 Live Slide Preview</h3>
            <div className="slide-preview-box" style={{ backgroundImage: `url(${selectedTemplate})` }}>
              <h4 style={{ color: selectedTemplate === '/templates/template5.jpg' ? 'white' : 'black' }}>
                {slide.title}
              </h4>
              {slide.image && <img src={slide.image} alt="Slide Visual" style={{ maxWidth: '200px' }} />}
              <p style={{ color: selectedTemplate === '/templates/template5.jpg' ? 'white' : 'black' }}>
                {slide.text}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="preview-slide">
          <h3>{slide.title}</h3>
          {slide.image && <img src={slide.image} alt="Preview" width="400" />}
          <p>{slide.text}</p>
          {isTextTooLong(slide.text) && (
            <div className="warning">⚠️ Text is too long and may shrink in export.</div>
          )}
        </div>
      )}

      <button className="export-btn" onClick={exportPPT}>
        📤 Export PPT
      </button>
    </div>
  );
}

export default CreateManual;
