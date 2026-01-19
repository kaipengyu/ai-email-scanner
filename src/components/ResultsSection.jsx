import React from 'react';
import EmailPreview from './EmailPreview';
import ComponentDataEditor from './ComponentDataEditor';

const ResultsSection = ({ generatedHtml, componentData, onComponentUpdate, onCopy, onDownload, copied }) => {
  if (!generatedHtml) return null;

  return (
    <div className="pte-results">
      <div className="pte-results-header">
        <h2>Generated Email Template</h2>
        <div className="pte-action-buttons">
          <button className="pte-btn pte-copy-btn" onClick={onCopy}>
            {copied ? '✓ Copied!' : '📋 Copy HTML'}
          </button>
          <button className="pte-btn pte-download-btn" onClick={onDownload}>
            ⬇️ Download HTML
          </button>
        </div>
      </div>

      <EmailPreview html={generatedHtml} />

      {componentData && (
        <details className="pte-details pte-editor-accordion" open>
          <summary>Edit Email Components</summary>
          <ComponentDataEditor 
            componentData={componentData} 
            onUpdate={onComponentUpdate}
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
        <summary>View Full HTML Code</summary>
        <pre><code>{generatedHtml}</code></pre>
      </details>
    </div>
  );
};

export default ResultsSection;
