import React from 'react';

const ComponentDataEditor = ({ componentData, onUpdate }) => {
  const renderEditableField = (sectionIndex, fieldName, value, label, type = 'text') => {
    const fieldId = `section-${sectionIndex}-${fieldName}`;
    
    return (
      <tr key={fieldId}>
        <td className="pte-table-label">{label}</td>
        <td className="pte-table-control">
          {type === 'textarea' ? (
            <textarea
              value={value || ''}
              onChange={(e) => onUpdate(sectionIndex, fieldName, e.target.value)}
              rows={3}
              className="pte-input pte-textarea"
            />
          ) : type === 'color' ? (
            <div className="pte-color-input-wrapper">
              <input
                type="color"
                value={value || '#000000'}
                onChange={(e) => onUpdate(sectionIndex, fieldName, e.target.value)}
                className="pte-color-picker"
              />
              <input
                type="text"
                value={value || ''}
                onChange={(e) => onUpdate(sectionIndex, fieldName, e.target.value)}
                placeholder="#000000"
                className="pte-input pte-color-text"
              />
            </div>
          ) : type === 'select' ? (
            <select
              value={value || 'left'}
              onChange={(e) => onUpdate(sectionIndex, fieldName, e.target.value)}
              className="pte-input"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          ) : (
            <input
              type={type}
              value={value || ''}
              onChange={(e) => onUpdate(sectionIndex, fieldName, e.target.value)}
              className="pte-input"
            />
          )}
        </td>
      </tr>
    );
  };

  if (!componentData) return null;

  // Support new sections array format
  if (componentData.sections && Array.isArray(componentData.sections)) {
    return (
      <div className="pte-editor">
        <h3>Edit Email Components</h3>
        <p className="pte-editor-description">
          Modify the values below to customize your email template. Changes update the preview in real-time.
        </p>

        {componentData.sections.map((section, index) => {
          const { type, data } = section;
          let icon = '📄';
          let title = type;

          switch (type) {
            case 'header': icon = '📧'; title = 'Header'; break;
            case 'heroImage': icon = '🖼️'; title = 'Hero Image'; break;
            case 'title': icon = '📝'; title = 'Title'; break;
            case 'content': icon = '📄'; title = `Content ${index + 1}`; break;
            case 'button': icon = '🔘'; title = 'Button'; break;
            case 'footer': icon = '🏢'; title = 'Footer'; break;
          }

          return (
            <details key={index} className="pte-editor-section" open>
              <summary className="pte-editor-section-title">
                {icon} {title} <span style={{fontSize: '12px', opacity: 0.7}}>(Position: {index + 1})</span>
              </summary>
              <table className="pte-editor-table">
                <tbody>
                  {type === 'header' && (
                    <>
                      {renderEditableField(index, 'promotionalText', data.promotionalText, 'Promotional Text', 'textarea')}
                      {renderEditableField(index, 'logoUrl', data.logoUrl, 'Logo URL', 'url')}
                      {renderEditableField(index, 'logoAlt', data.logoAlt, 'Logo Alt Text')}
                      {renderEditableField(index, 'backgroundColor', data.backgroundColor, 'Background Color', 'color')}
                      {renderEditableField(index, 'linkUrl', data.linkUrl, 'Logo Link URL', 'url')}
                    </>
                  )}

                  {type === 'heroImage' && (
                    <>
                      {renderEditableField(index, 'imageUrl', data.imageUrl, 'Image URL', 'url')}
                      {renderEditableField(index, 'mobileImageUrl', data.mobileImageUrl, 'Mobile Image URL', 'url')}
                      {renderEditableField(index, 'altText', data.altText, 'Alt Text')}
                      {renderEditableField(index, 'linkUrl', data.linkUrl, 'Link URL', 'url')}
                    </>
                  )}

                  {type === 'title' && (
                    <>
                      {renderEditableField(index, 'headline', data.headline, 'Headline', 'textarea')}
                      {renderEditableField(index, 'headlineColor', data.headlineColor, 'Text Color', 'color')}
                      {renderEditableField(index, 'backgroundColor', data.backgroundColor, 'Background Color', 'color')}
                      {renderEditableField(index, 'textAlign', data.textAlign, 'Text Alignment', 'select')}
                    </>
                  )}

                  {type === 'content' && (
                    <>
                      {renderEditableField(index, 'text', data.text, 'Text', 'textarea')}
                      {renderEditableField(index, 'textColor', data.textColor, 'Text Color', 'color')}
                      {renderEditableField(index, 'backgroundColor', data.backgroundColor, 'Background Color', 'color')}
                      {renderEditableField(index, 'textAlign', data.textAlign, 'Text Alignment', 'select')}
                    </>
                  )}

                  {type === 'button' && (
                    <>
                      {renderEditableField(index, 'text', data.text, 'Button Text')}
                      {renderEditableField(index, 'linkUrl', data.linkUrl, 'Link URL', 'url')}
                      {renderEditableField(index, 'backgroundColor', data.backgroundColor, 'Button Color', 'color')}
                      {renderEditableField(index, 'textColor', data.textColor, 'Text Color', 'color')}
                      {renderEditableField(index, 'sectionBackgroundColor', data.sectionBackgroundColor, 'Section Background', 'color')}
                    </>
                  )}

                  {type === 'footer' && (
                    <>
                      {renderEditableField(index, 'companyName', data.companyName, 'Company Name')}
                      {renderEditableField(index, 'companyAddress', data.companyAddress, 'Company Address')}
                      {renderEditableField(index, 'copyrightYear', data.copyrightYear, 'Copyright Year')}
                      {renderEditableField(index, 'disclaimerText', data.disclaimerText, 'Disclaimer Text', 'textarea')}
                      {renderEditableField(index, 'backgroundColor', data.backgroundColor, 'Background Color', 'color')}
                    </>
                  )}
                </tbody>
              </table>
            </details>
          );
        })}
      </div>
    );
  }

  // Old format support (backwards compatibility) - keep existing code
  return (
    <div className="pte-editor">
      <h3>Edit Email Components</h3>
      <p className="pte-editor-description">
        This email uses the legacy format. Please regenerate from PDF to use the new dynamic sections format.
      </p>
    </div>
  );
};

export default ComponentDataEditor;
