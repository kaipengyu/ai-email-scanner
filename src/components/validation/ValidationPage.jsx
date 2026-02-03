import React, { useRef, useState } from 'react';
import useValidation from '../../hooks/useValidation';
import FullCodeDiffViewer from './FullCodeDiffViewer';
import FixedCodePreview from './FixedCodePreview';
import TemplateSelector from '../shared/TemplateSelector';
import { DEFAULT_TEMPLATE } from '../../constants/templateConfig';

const ValidationPage = ({ apiKey = import.meta.env.VITE_GEMINI_API || '' }) => {
  const fileInputRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE);
  const [viewMode, setViewMode] = useState('code'); // 'code' or 'preview'
  const {
    originalHtml,
    validationResult,
    acceptedChanges,
    rejectedChanges,
    isValidating,
    error,
    validate,
    acceptChange,
    rejectChange,
    acceptAll,
    reset,
    getExportHtml,
  } = useValidation(apiKey, selectedTemplate);

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    // Reset validation when template changes
    reset();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.html') && !file.name.endsWith('.htm')) {
      alert('Please upload an HTML file');
      return;
    }

    const content = await file.text();
    validate(content);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!file.name.endsWith('.html') && !file.name.endsWith('.htm')) {
      alert('Please upload an HTML file');
      return;
    }

    const content = await file.text();
    validate(content);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCopy = async () => {
    const html = getExportHtml();
    await navigator.clipboard.writeText(html);
  };

  const handleDownload = () => {
    const html = getExportHtml();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fixed-email.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pte-validation-page">
      <header className="pte-header">
        <h1>HTML Validator</h1>
        <p>Upload an HTML email file to validate against brand guidelines and best practices</p>
      </header>

      <div className="pte-main">
        <div className="pte-upload-section">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateChange={handleTemplateChange}
            disabled={isValidating}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept=".html,.htm"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <div
            className={`pte-drop-zone ${originalHtml ? 'has-file' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {originalHtml ? (
              <div className="pte-file-info">
                <span className="pte-file-icon">HTML</span>
                <span className="pte-file-name">HTML file loaded</span>
              </div>
            ) : (
              <div className="pte-drop-prompt">
                <span className="pte-upload-icon">📤</span>
                <p>Drop an HTML file here or click to browse</p>
                <span className="pte-or-text">Accepts .html and .htm files</span>
              </div>
            )}
          </div>

          {error && <div className="pte-error">{error}</div>}

          {isValidating && (
            <div className="pte-validating-banner">
              <span className="pte-spinner"></span>
              <span>Validating HTML with AI...</span>
              <p>Analyzing your code for issues across 6 categories</p>
            </div>
          )}

          {originalHtml && !isValidating && (
            <button className="pte-generate-btn pte-reset-btn" onClick={reset}>
              Upload Different File
            </button>
          )}
        </div>

        {validationResult && (
          <div className="pte-validation-results">
            <FullCodeDiffViewer
              originalHtml={originalHtml}
              issues={validationResult.issues}
              acceptedChanges={acceptedChanges}
              rejectedChanges={rejectedChanges}
              onAccept={acceptChange}
              onReject={rejectChange}
              onAcceptAll={acceptAll}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onCopy={handleCopy}
              onDownload={handleDownload}
              previewComponent={
                <FixedCodePreview
                  html={getExportHtml()}
                  acceptedCount={acceptedChanges.size}
                />
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationPage;
