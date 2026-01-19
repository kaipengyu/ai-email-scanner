import React, { useState, useRef } from 'react';
import './EmailScanner.css';
import FileUploadZone from './components/FileUploadZone';
import ResultsSection from './components/ResultsSection';
import { analyzeWithGemini } from './utils/geminiApi';
import { generateEmailHtml } from './utils/emailTemplateGenerator';

export const PDFToEmail = ({ apiKey = import.meta.env.VITE_GEMINI_API || '' }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedHtml, setGeneratedHtml] = useState(null);
  const [componentData, setComponentData] = useState(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
      setGeneratedHtml(null);
      setComponentData(null);
    } else {
      setError('Please upload a valid PDF file');
      setFile(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError(null);
      setGeneratedHtml(null);
      setComponentData(null);
    } else {
      setError('Please upload a valid PDF file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    if (!apiKey) {
      setError('Gemini API key is not configured. Please add VITE_GEMINI_API to your .env file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const parsedData = await analyzeWithGemini(file, apiKey);
      setComponentData(parsedData);
      
      const html = generateEmailHtml(parsedData);
      setGeneratedHtml(html);
    } catch (err) {
      console.error('Error analyzing PDF:', err);
      setError(err.message || 'Failed to analyze PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedHtml) return;
    try {
      await navigator.clipboard.writeText(generatedHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    if (!generatedHtml) return;
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateComponentData = (sectionIndex, field, value) => {
    const newData = { ...componentData };
    
    // Handle new sections array format
    if (newData.sections && Array.isArray(newData.sections)) {
      newData.sections = [...newData.sections];
      newData.sections[sectionIndex] = {
        ...newData.sections[sectionIndex],
        data: {
          ...newData.sections[sectionIndex].data,
          [field]: value
        }
      };
    } else {
      // Old format handling (backwards compatibility)
      const section = Object.keys(newData)[sectionIndex];
      if (section === 'content' && Array.isArray(newData.content)) {
        const [, index, contentField] = field.split('.');
        if (!newData.content[index]) newData.content[index] = {};
        newData.content[index][contentField] = value;
      } else {
        if (!newData[section]) newData[section] = {};
        newData[section][field] = value;
      }
    }
    
    setComponentData(newData);
    const html = generateEmailHtml(newData);
    setGeneratedHtml(html);
  };

  return (
    <div className="pdf-to-email-storybook">
      <header className="pte-header">
        <h1>🪄 AI Email Generator</h1>
        <p>Upload an email design PDF and let AI generate the HTML code using our storybook components</p>
      </header>

      <div className="pte-main">
        <div className="pte-upload-section">
          <FileUploadZone
            file={file}
            fileInputRef={fileInputRef}
            onFileChange={handleFileChange}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          />

          {error && <div className="pte-error">{error}</div>}

          <button
            className="pte-generate-btn"
            onClick={handleAnalyze}
            disabled={!file || loading || !apiKey}
          >
            {loading ? (
              <>
                <span className="pte-spinner"></span>
                Analyzing PDF with AI...
              </>
            ) : (
              <>
                <span>✨</span> Generate Email HTML
              </>
            )}
          </button>
        </div>

        <ResultsSection
          generatedHtml={generatedHtml}
          componentData={componentData}
          onComponentUpdate={updateComponentData}
          onCopy={handleCopy}
          onDownload={handleDownload}
          copied={copied}
        />
      </div>
    </div>
  );
};

export default PDFToEmail;
