import React from 'react';
import { getTemplateList } from '../../constants/templateConfig';

const TemplateSelector = ({ selectedTemplate, onTemplateChange, disabled = false }) => {
  const templates = getTemplateList();

  return (
    <div className="pte-template-selector">
      <label htmlFor="template-select">Email Template:</label>
      <select
        id="template-select"
        value={selectedTemplate}
        onChange={(e) => onTemplateChange(e.target.value)}
        disabled={disabled}
        className="pte-template-dropdown"
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateSelector;
