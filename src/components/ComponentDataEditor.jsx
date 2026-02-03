import React from 'react';
import { generateButtonHtml, generateButtonMjml } from './emailTemplates';

const ComponentDataEditor = ({ componentData, onUpdate, format = 'html' }) => {
  const renderEditableField = (sectionIndex, fieldName, value, label, type = 'text', options = {}) => {
    const fieldId = `section-${sectionIndex}-${fieldName}`;
    const { placeholder } = options;

    return (
      <tr key={fieldId}>
        <td className="pte-table-label">{label}</td>
        <td className="pte-table-control">
          {type === 'html' || type === 'mjml' ? (
            <div className="pte-code-editor-wrapper">
              <div className="pte-code-editor-label">
                {type === 'html' ? 'HTML' : 'MJML'} Code Editor
                <span className="pte-code-hint">You can inject {type === 'html' ? 'HTML' : 'MJML'} code here</span>
              </div>
              <textarea
                value={value || ''}
                onChange={(e) => onUpdate(sectionIndex, fieldName, e.target.value)}
                rows={8}
                className="pte-input pte-code-editor"
                placeholder={`Enter ${type === 'html' ? 'HTML' : 'MJML'} code here...`}
                spellCheck={false}
              />
            </div>
          ) : type === 'textarea' ? (
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
              placeholder={placeholder}
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
          let title = type;

          switch (type) {
            case 'header': title = 'Header'; break;
            case 'heroImage': title = 'Hero Image'; break;
            case 'title': title = 'Title'; break;
            case 'content': title = `Content ${index + 1}`; break;
            case 'infoBox': title = 'Info Box'; break;
            case 'button': title = 'Button'; break;
            case 'footer': title = 'Footer'; break;
          }

          return (
            <details key={index} className="pte-editor-section">
              <summary className="pte-editor-section-title">
                <span className="pte-accordion-icon"></span>
                <span className="pte-accordion-title">{title}</span>
                <span className="pte-accordion-position">Section {index + 1}</span>
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
                      {renderEditableField(index, format === 'html' ? 'headlineHtml' : 'headlineMjml', format === 'html' ? (data.headlineHtml || data.headline || '') : (data.headlineMjml || data.headline || ''), 'Headline', format)}
                      {renderEditableField(index, 'headlineColor', data.headlineColor, 'Text Color', 'color')}
                      {renderEditableField(index, 'backgroundColor', data.backgroundColor, 'Background Color', 'color')}
                      {renderEditableField(index, 'textAlign', data.textAlign, 'Text Alignment', 'select')}
                    </>
                  )}

                  {type === 'content' && (
                    <>
                      {renderEditableField(index, format === 'html' ? 'textHtml' : 'textMjml', format === 'html' ? (data.textHtml || data.text || '') : (data.textMjml || data.text || ''), 'Text', format)}
                      {renderEditableField(index, 'textColor', data.textColor, 'Text Color', 'color')}
                      {renderEditableField(index, 'backgroundColor', data.backgroundColor, 'Background Color', 'color')}
                      {renderEditableField(index, 'textAlign', data.textAlign, 'Text Alignment', 'select')}
                    </>
                  )}

                  {type === 'infoBox' && (
                    <>
                      {renderEditableField(index, 'backgroundColor', data.backgroundColor, 'Background Color', 'color')}
                      {renderEditableField(index, 'textColor', data.textColor, 'Text Color', 'color')}
                      {renderEditableField(index, 'linkColor', data.linkColor, 'Link Color', 'color')}
                      <tr>
                        <td className="pte-table-label">Items (JSON)</td>
                        <td className="pte-table-control">
                          <div className="pte-code-editor-wrapper">
                            <div className="pte-code-editor-label">
                              Info Items
                              <span className="pte-code-hint">Array of items with label, text, and optional linkUrl</span>
                            </div>
                            <textarea
                              value={JSON.stringify(data.items || [], null, 2)}
                              onChange={(e) => {
                                try {
                                  const items = JSON.parse(e.target.value);
                                  onUpdate(index, 'items', items);
                                } catch (err) {
                                  // Invalid JSON, don't update
                                }
                              }}
                              rows={10}
                              className="pte-input pte-code-editor"
                              placeholder='[{"label": "Meeting ID", "text": "123456"}]'
                              spellCheck={false}
                            />
                          </div>
                        </td>
                      </tr>
                    </>
                  )}

                  {type === 'button' && (
                    <>
                      {renderEditableField(index, 'text', data.text, 'Button Text')}
                      {renderEditableField(index, 'linkUrl', data.linkUrl, 'Link URL', 'url')}
                      {renderEditableField(index, 'backgroundColor', data.backgroundColor, 'Button Color', 'color')}
                      {renderEditableField(index, 'textColor', data.textColor, 'Text Color', 'color')}
                      {renderEditableField(index, 'sectionBackgroundColor', data.sectionBackgroundColor, 'Section Background', 'color')}
                      {renderEditableField(index, 'backgroundImage', data.backgroundImage, 'Background Image URL', 'url', { placeholder: 'e.g. https://i.imgur.com/... (HTML only)' })}
                      {renderEditableField(index, 'width', data.width, 'Button Width (px)', 'text', { placeholder: '240' })}
                      {renderEditableField(index, 'height', data.height, 'Button Height (px)', 'text', { placeholder: '50' })}
                      {renderEditableField(index, 'borderColor', data.borderColor, 'Border Color', 'color')}
                      {renderEditableField(index, 'borderRadius', data.borderRadius, 'Border Radius (px)', 'text', { placeholder: '40' })}
                      <tr key={`section-${index}-buttonCode`}>
                        <td className="pte-table-label">
                          {format === 'html' ? 'HTML' : 'MJML'} Code
                        </td>
                        <td className="pte-table-control">
                          <div className="pte-code-editor-wrapper">
                            <div className="pte-code-editor-label">
                              {format === 'html' ? 'HTML' : 'MJML'} Code Editor
                              <span className="pte-code-hint">
                                Updates live from attributes above, or edit directly to override
                              </span>
                            </div>
                            <textarea
                              value={
                                format === 'html'
                                  ? (data.buttonHtml?.trim() ? data.buttonHtml : generateButtonHtml(data))
                                  : (data.buttonMjml?.trim() ? data.buttonMjml : generateButtonMjml(data))
                              }
                              onChange={(e) => onUpdate(index, format === 'html' ? 'buttonHtml' : 'buttonMjml', e.target.value)}
                              rows={10}
                              className="pte-input pte-code-editor"
                              placeholder={`Enter ${format === 'html' ? 'HTML' : 'MJML'} code for this button section...`}
                              spellCheck={false}
                            />
                          </div>
                        </td>
                      </tr>
                    </>
                  )}

                  {type === 'footer' && (
                    <>
                      {renderEditableField(index, 'logoUrl', data.logoUrl, 'Footer Logo URL', 'url')}
                      {renderEditableField(index, 'logoLinkUrl', data.logoLinkUrl, 'Logo Link URL', 'url')}
                      {renderEditableField(index, format === 'html' ? 'eligibilityTextHtml' : 'eligibilityTextMjml', format === 'html' ? (data.eligibilityTextHtml || data.eligibilityText || '') : (data.eligibilityTextMjml || data.eligibilityText || ''), 'Eligibility Text', format)}
                      <tr>
                        <td className="pte-table-label">Social Icons (JSON)</td>
                        <td className="pte-table-control">
                          <div className="pte-code-editor-wrapper">
                            <div className="pte-code-editor-label">
                              Social Media Icons
                              <span className="pte-code-hint">Array of icons with platform, iconUrl, linkUrl, alt</span>
                            </div>
                            <textarea
                              value={JSON.stringify(data.socialIcons || [], null, 2)}
                              onChange={(e) => {
                                try {
                                  const icons = JSON.parse(e.target.value);
                                  onUpdate(index, 'socialIcons', icons);
                                } catch (err) {
                                  // Invalid JSON, don't update
                                }
                              }}
                              rows={6}
                              className="pte-input pte-code-editor"
                              placeholder='[{"platform": "Facebook", "iconUrl": "...", "linkUrl": "..."}]'
                              spellCheck={false}
                            />
                          </div>
                        </td>
                      </tr>
                      {renderEditableField(index, 'companyName', data.companyName, 'Company Name')}
                      {renderEditableField(index, 'companyAddress', data.companyAddress, 'Company Address')}
                      {renderEditableField(index, 'copyrightYear', data.copyrightYear, 'Copyright Year')}
                      {renderEditableField(index, 'unsubscribeUrl', data.unsubscribeUrl, 'Unsubscribe URL', 'url')}
                      {renderEditableField(index, 'termsUrl', data.termsUrl, 'Terms of Use URL', 'url')}
                      {renderEditableField(index, 'privacyUrl', data.privacyUrl, 'Privacy Policy URL', 'url')}
                      {renderEditableField(index, 'viewInBrowserUrl', data.viewInBrowserUrl, 'View in Browser URL', 'url')}
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
