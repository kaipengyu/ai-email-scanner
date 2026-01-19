import React from 'react';

const FileUploadZone = ({ file, fileInputRef, onFileChange, onDrop, onDragOver, onClick }) => {
  return (
    <div
      className={`pte-drop-zone ${file ? 'has-file' : ''}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={onClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      {file ? (
        <div className="pte-file-info">
          <span className="pte-file-icon">📄</span>
          <span className="pte-file-name">{file.name}</span>
          <span className="pte-file-size">({(file.size / 1024).toFixed(1)} KB)</span>
        </div>
      ) : (
        <div className="pte-drop-prompt">
          <span className="pte-upload-icon">📤</span>
          <p>Drag & drop your email design PDF here</p>
          <span className="pte-or-text">or click to browse</span>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
