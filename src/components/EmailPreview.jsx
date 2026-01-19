import React from 'react';

const EmailPreview = ({ html }) => {
  if (!html) return null;

  return (
    <div className="pte-preview">
      <h3>Preview</h3>
      <div className="pte-preview-frame">
        <iframe
          srcDoc={html}
          title="Email Preview"
          width="100%"
          height="500"
          style={{ border: 'none', background: '#EEEEEE' }}
        />
      </div>
    </div>
  );
};

export default EmailPreview;
