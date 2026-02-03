import React, { useState, useEffect } from 'react';
import mjml2html from 'mjml-browser';

const EmailPreview = ({ html, mjml, format }) => {
  const [previewHtml, setPreviewHtml] = useState(html);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (format === 'mjml' && mjml) {
      try {
        const { html: convertedHtml } = mjml2html(mjml, {
          validationLevel: 'soft',
          minify: false
        });
        // Post-process HTML to force left alignment for header and footer sections
        let processedHtml = convertedHtml;
        
        // Split HTML by comments to identify header and footer sections
        const headerStartRegex = /<!--\s*HEADER\s*START|<!--\s*BEGIN:\s*.*Header/gi;
        const headerEndRegex = /<!--\s*HEADER\s*END|<!--\s*END:\s*.*Header/gi;
        const footerStartRegex = /<!--\s*BEGIN:\s*.*Footer|<!--\s*FOOTER/gi;
        const footerEndRegex = /<!--\s*END:\s*.*Footer/gi;
        
        // Find header section and replace align="center" with align="left"
        let headerStart = processedHtml.search(headerStartRegex);
        let headerEnd = processedHtml.search(headerEndRegex);
        if (headerStart !== -1 && headerEnd !== -1) {
          const beforeHeader = processedHtml.substring(0, headerStart);
          const headerSection = processedHtml.substring(headerStart, headerEnd);
          const afterHeader = processedHtml.substring(headerEnd);
          const fixedHeader = headerSection.replace(/align=["']center["']/gi, 'align="left"');
          processedHtml = beforeHeader + fixedHeader + afterHeader;
        }
        
        // Find footer section and replace align="center" with align="left"
        let footerStart = processedHtml.search(footerStartRegex);
        let footerEnd = processedHtml.search(footerEndRegex);
        if (footerStart !== -1 && footerEnd !== -1) {
          const beforeFooter = processedHtml.substring(0, footerStart);
          const footerSection = processedHtml.substring(footerStart, footerEnd);
          const afterFooter = processedHtml.substring(footerEnd);
          const fixedFooter = footerSection.replace(/align=["']center["']/gi, 'align="left"');
          processedHtml = beforeFooter + fixedFooter + afterFooter;
        }
        
        // Find button section and ensure center alignment
        const buttonStartRegex = /<!--\s*BEGIN:\s*.*Button|<!--\s*Button/gi;
        const buttonEndRegex = /<!--\s*END:\s*.*Button/gi;
        let buttonStart = processedHtml.search(buttonStartRegex);
        let buttonEnd = processedHtml.search(buttonEndRegex);
        if (buttonStart !== -1 && buttonEnd !== -1) {
          const beforeButton = processedHtml.substring(0, buttonStart);
          const buttonSection = processedHtml.substring(buttonStart, buttonEnd);
          const afterButton = processedHtml.substring(buttonEnd);
          // Replace align="left" with align="center" in button section, and ensure center alignment
          let fixedButton = buttonSection.replace(/align=["']left["']/gi, 'align="center"');
          // Also add center alignment to any td without align attribute in button section
          fixedButton = fixedButton.replace(
            /(<td[^>]*class=["'][^"']*button-section[^"']*["'][^>]*)(?!align=)/gi,
            '$1 align="center"'
          );
          processedHtml = beforeButton + fixedButton + afterButton;
        }
        
        // Also replace in sections with css-class header-section or footer-section
        processedHtml = processedHtml.replace(
          /(<td[^>]*class=["'][^"']*header-section[^"']*["'][^>]*align=["'])center(["'])/gi,
          '$1left$2'
        );
        processedHtml = processedHtml.replace(
          /(<td[^>]*class=["'][^"']*footer-section[^"']*["'][^>]*align=["'])center(["'])/gi,
          '$1left$2'
        );
        
        // Ensure button-section has center alignment
        processedHtml = processedHtml.replace(
          /(<td[^>]*class=["'][^"']*button-section[^"']*["'][^>]*align=["'])left(["'])/gi,
          '$1center$2'
        );
        
        setPreviewHtml(processedHtml);
      } catch (error) {
        console.error('Error converting MJML to HTML:', error);
        setPreviewHtml('<div style="padding: 20px; color: red;">Error converting MJML to HTML. Please check the console for details.</div>');
      }
    } else if (format === 'html' && html) {
      setPreviewHtml(html);
    }
  }, [format, html, mjml]);

  if (!previewHtml) return null;

  // Simulate dark mode email client rendering (like Email on Acid)
  // This inverts colors while preserving images
  const getDisplayHtml = () => {
    if (!isDarkMode) return previewHtml;
    
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
    
    if (previewHtml.includes('</head>')) {
      return previewHtml.replace('</head>', `${darkModeStyle}</head>`);
    } else if (previewHtml.includes('<body')) {
      return previewHtml.replace('<body', `${darkModeStyle}<body`);
    }
    return darkModeStyle + previewHtml;
  };

  return (
    <div className="pte-preview">
      <div className="pte-preview-header">
        <h3>Preview</h3>
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
      <div className="pte-preview-frame">
        <iframe
          srcDoc={getDisplayHtml()}
          title="Email Preview"
          width="100%"
          height="500"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default EmailPreview;
