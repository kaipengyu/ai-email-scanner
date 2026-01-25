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
            {copied ? '✓ Copied!' : `📋 Copy ${formatLabel}`}
          </button>
          <button className="pte-btn pte-download-btn" onClick={onDownload}>
            ⬇️ Download {formatLabel}
          </button>
        </div>
      </div>

      <EmailPreview html={generatedHtml} mjml={generatedMjml} format={format} />

      {componentData && (
        <details className="pte-details pte-editor-accordion" open>
          <summary>Edit Email Components</summary>
          <ComponentDataEditor 
            componentData={componentData} 
            onUpdate={onComponentUpdate}
            format={format}
          />
        </details>
      )}

      {componentData && (
        <details className="pte-details">
          <summary>View Raw JSON Data</summary>
          <pre>{JSON.stringify(componentData, null, 2)}</pre>
        </details>
      )}

      <details className="pte-details">
        <summary>View Full {formatLabel} Code</summary>
        <pre><code>{currentOutput}</code></pre>
      </details>
    </div>
  );
};

export default ResultsSection;
