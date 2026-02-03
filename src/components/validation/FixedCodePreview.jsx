import React, { useState } from 'react';

const FixedCodePreview = ({ html, acceptedCount = 0 }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  if (!html) {
    return null;
  }

  // Simulate dark mode email client rendering (like Email on Acid)
  const getDisplayHtml = () => {
    if (!isDarkMode) return html;

    const darkModeStyle = `<style>
      :root { color-scheme: dark; }
      html {
        filter: invert(1) hue-rotate(180deg);
        background-color: #fff !important;
      }
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
          <span className="pte-fixed-preview-subtitle">
            {acceptedCount} change{acceptedCount !== 1 ? 's' : ''} applied
          </span>
        </div>
        <div className="pte-preview-mode-toggle">
          <button
            className={`pte-mode-btn ${!isDarkMode ? 'active' : ''}`}
            onClick={() => setIsDarkMode(false)}
          >
            Light Mode
          </button>
          <button
            className={`pte-mode-btn ${isDarkMode ? 'active' : ''}`}
            onClick={() => setIsDarkMode(true)}
          >
            Dark Mode
          </button>
        </div>
      </div>

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
    </div>
  );
};

export default FixedCodePreview;
