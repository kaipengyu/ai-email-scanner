import React, { useState, useRef } from 'react';
import './EmailScanner.css';
import FileUploadZone from './components/FileUploadZone';
import ResultsSection from './components/ResultsSection';
import TemplateSelector from './components/shared/TemplateSelector';
import { analyzeWithGemini } from './utils/geminiApi';
import { generateEmailHtml, generateEmailMjml } from './utils/emailTemplateGenerator';
import { DEFAULT_TEMPLATE } from './constants/templateConfig';

export const PDFToEmail = ({ apiKey = import.meta.env.VITE_GEMINI_API || '' }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedHtml, setGeneratedHtml] = useState(null);
  const [generatedMjml, setGeneratedMjml] = useState(null);
  const [componentData, setComponentData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState('html'); // 'html' or 'mjml'
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
      setGeneratedHtml(null);
      setGeneratedMjml(null);
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
      setGeneratedMjml(null);
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
      const parsedData = await analyzeWithGemini(file, apiKey, selectedTemplate);
      
      // Initialize format-specific fields from base fields for backwards compatibility
      if (parsedData.sections && Array.isArray(parsedData.sections)) {
        parsedData.sections = parsedData.sections.map(section => {
          const { type, data } = section;
          const newData = { ...data };
          
          // Initialize HTML and MJML versions from base fields
          if (type === 'title' && data.headline && !data.headlineHtml && !data.headlineMjml) {
            newData.headlineHtml = data.headline;
            newData.headlineMjml = data.headline;
          }
          if (type === 'content' && data.text && !data.textHtml && !data.textMjml) {
            newData.textHtml = data.text;
            newData.textMjml = data.text;
          }
          if (type === 'iconsSection' && data.text && !data.textHtml && !data.textMjml) {
            newData.textHtml = data.text;
            newData.textMjml = data.text;
          }
          if (type === 'footer' && data.disclaimerText && !data.disclaimerTextHtml && !data.disclaimerTextMjml) {
            newData.disclaimerTextHtml = data.disclaimerText;
            newData.disclaimerTextMjml = data.disclaimerText;
          }
          
          return { ...section, data: newData };
        });
      }
      
      setComponentData(parsedData);

      const html = generateEmailHtml(parsedData, selectedTemplate);
      const mjml = generateEmailMjml(parsedData, selectedTemplate);
      setGeneratedHtml(html);
      setGeneratedMjml(mjml);
    } catch (err) {
      console.error('Error analyzing PDF:', err);
      setError(err.message || 'Failed to analyze PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const content = format === 'mjml' ? generatedMjml : generatedHtml;
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const content = format === 'mjml' ? generatedMjml : generatedHtml;
    if (!content) return;
    const extension = format === 'mjml' ? 'mjml' : 'html';
    const mimeType = format === 'mjml' ? 'text/mjml' : 'text/html';
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-template.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
  };

  const updateComponentData = (sectionIndex, field, value) => {
    const newData = { ...componentData };
    
    // Handle new sections array format
    if (newData.sections && Array.isArray(newData.sections)) {
      newData.sections = [...newData.sections];
      const section = newData.sections[sectionIndex];
      const isButton = section?.type === 'button';
      const simpleButtonFields = ['text', 'linkUrl', 'backgroundColor', 'textColor', 'sectionBackgroundColor', 'backgroundImage', 'width', 'height', 'borderColor', 'borderRadius'];

      let nextSectionData = { ...section.data, [field]: value };
      if (isButton && simpleButtonFields.includes(field)) {
        const { buttonHtml, buttonMjml, ...rest } = nextSectionData;
        nextSectionData = { ...rest, [field]: value };
      }

      newData.sections[sectionIndex] = {
        ...section,
        data: nextSectionData
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
    const html = generateEmailHtml(newData, selectedTemplate);
    const mjml = generateEmailMjml(newData, selectedTemplate);
    setGeneratedHtml(html);
    setGeneratedMjml(mjml);
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    // Reset file and results when template changes
    setFile(null);
    setGeneratedHtml(null);
    setGeneratedMjml(null);
    setComponentData(null);
    setError(null);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <header className="pte-header">
        <h1>AI Email Generator</h1>
        <p>Upload an email design PDF and let AI generate the HTML code using our storybook components</p>
      </header>

      <div className="pte-main">
        <div className="pte-upload-section">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateChange={handleTemplateChange}
            disabled={loading}
          />

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
              'Generate Email HTML'
            )}
          </button>
        </div>

        <ResultsSection
          generatedHtml={generatedHtml}
          generatedMjml={generatedMjml}
          componentData={componentData}
          onComponentUpdate={updateComponentData}
          onCopy={handleCopy}
          onDownload={handleDownload}
          copied={copied}
          format={format}
          onFormatChange={handleFormatChange}
        />
      </div>
    </>
  );
};

export default PDFToEmail;
