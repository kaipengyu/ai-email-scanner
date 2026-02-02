import React, { useState } from 'react';

const FixedCodePreview = ({ html, onCopy, onDownload, acceptedCount = 0 }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('preview'); // 'preview' or 'code'
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCopy = async () => {
    await onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!html) {
    return null;
  }

  // Simulate dark mode email client rendering (like Email on Acid)
  // This inverts colors while preserving images
  const getDisplayHtml = () => {
    if (!isDarkMode) return html;
    
    // Inject dark mode simulation styles that mimic email client dark mode
    const darkModeStyle = `<style>
      /* Force dark mode color scheme */
      :root { color-scheme: dark; }
      
      /* Invert the entire page, then re-invert images to preserve them */
      html {
        filter: invert(1) hue-rotate(180deg);
        background-color: #fff !important;
      }
      
      /* Preserve images and media by inverting them back */
      img, video, picture, svg, [style*="background-image"] {
        filter: invert(1) hue-rotate(180deg);
      }
    </style>`;
    
    if (html.includes('</head>')) {
      return html.replace('</head>', `${darkModeStyle}</head>`);
    } else if (html.includes('<body')) {
      return html.replace('<body', `${darkModeStyle}<body`);
    }
    return darkModeStyle + html;
  };

  const displayHtml = getDisplayHtml();

  return (
    <div className="pte-fixed-preview">
      <div className="pte-fixed-preview-header">
        <div className="pte-fixed-preview-title">
          <h3>Updated HTML</h3>
          <span className="pte-fixed-preview-subtitle">
            {acceptedCount} change{acceptedCount !== 1 ? 's' : ''} applied
          </span>
        </div>
        <div className="pte-fixed-preview-controls">
          <div className="pte-toggle-group">
            <button
              className={`pte-toggle-btn ${viewMode === 'preview' ? 'active' : ''}`}
              onClick={() => setViewMode('preview')}
            >
              Preview
            </button>
            <button
              className={`pte-toggle-btn ${viewMode === 'code' ? 'active' : ''}`}
              onClick={() => setViewMode('code')}
            >
              Code
            </button>
          </div>
          {viewMode === 'preview' && (
            <div className="pte-preview-mode-toggle">
              <button
                className={`pte-mode-btn ${!isDarkMode ? 'active' : ''}`}
                onClick={() => setIsDarkMode(false)}
                title="Light mode"
              >
                ☀️
              </button>
              <button
                className={`pte-mode-btn ${isDarkMode ? 'active' : ''}`}
                onClick={() => setIsDarkMode(true)}
                title="Dark mode"
              >
                🌙
              </button>
            </div>
          )}
          <div className="pte-action-buttons">
            <button className="pte-btn pte-copy-btn" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button className="pte-btn pte-download-btn" onClick={onDownload}>
              Download
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'preview' ? (
        <div className="pte-fixed-preview-frame">
          <iframe
            srcDoc={displayHtml}
            title="Fixed HTML Preview"
            style={{
              width: '100%',
              height: '400px',
              border: 'none',
            }}
          />
        </div>
      ) : (
        <div className="pte-fixed-preview-code">
          <pre>
            <code>{html}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default FixedCodePreview;
