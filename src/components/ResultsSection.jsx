import React, { useState } from 'react';
import EmailPreview from './EmailPreview';
import ComponentDataEditor from './ComponentDataEditor';

const ResultsSection = ({ generatedHtml, generatedMjml, componentData, onComponentUpdate, onCopy, onDownload, copied, format, onFormatChange }) => {
  if (!generatedHtml && !generatedMjml) return null;

  const currentOutput = format === 'mjml' ? generatedMjml : generatedHtml;
  const formatLabel = format === 'mjml' ? 'MJML' : 'HTML';

  return (
    <div className="pte-results">
      <div className="pte-results-header">
        <h2>Generated Email Template</h2>
        <div className="pte-format-toggle">
          <label className="pte-format-label">Format:</label>
          <div className="pte-toggle-group">
            <button 
              className={`pte-toggle-btn ${format === 'html' ? 'active' : ''}`}
              onClick={() => onFormatChange('html')}
            >
              HTML
            </button>
            <button 
              className={`pte-toggle-btn ${format === 'mjml' ? 'active' : ''}`}
              onClick={() => onFormatChange('mjml')}
            >
              MJML
            </button>
          </div>
        </div>
        <div className="pte-action-buttons">
          <button className="pte-btn pte-copy-btn" onClick={onCopy}>
            {copied ? 'Copied!' : `Copy ${formatLabel}`}
          </button>
          <button className="pte-btn pte-download-btn" onClick={onDownload}>
            Download {formatLabel}
          </button>
        </div>
      </div>

      <EmailPreview html={generatedHtml} mjml={generatedMjml} format={format} />

      <div className="pte-main-accordion">
        {componentData && (
          <details className="pte-main-accordion-section" open>
            <summary className="pte-main-accordion-title">
              <span className="pte-accordion-icon"></span>
              <span className="pte-accordion-title">Edit Email Components</span>
            </summary>
            <div className="pte-main-accordion-content">
              <ComponentDataEditor
                componentData={componentData}
                onUpdate={onComponentUpdate}
                format={format}
              />
            </div>
          </details>
        )}

        {componentData && (
          <details className="pte-main-accordion-section">
            <summary className="pte-main-accordion-title">
              <span className="pte-accordion-icon"></span>
              <span className="pte-accordion-title">View JSON Data</span>
            </summary>
            <div className="pte-main-accordion-content pte-main-accordion-code">
              <pre>{JSON.stringify(componentData, null, 2)}</pre>
            </div>
          </details>
        )}

        <details className="pte-main-accordion-section">
          <summary className="pte-main-accordion-title">
            <span className="pte-accordion-icon"></span>
            <span className="pte-accordion-title">View {formatLabel} Code</span>
          </summary>
          <div className="pte-main-accordion-content pte-main-accordion-code">
            <div className="pte-fullcode-wrap">
              <button
                type="button"
                className="pte-btn pte-copy-btn pte-fullcode-copy"
                onClick={onCopy}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
              <pre><code>{currentOutput}</code></pre>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default ResultsSection;
