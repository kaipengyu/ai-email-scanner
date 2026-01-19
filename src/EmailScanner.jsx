import React, { useState, useRef } from 'react';
import './EmailScanner.css';

// Component schema documentation for AI
const COMPONENT_SCHEMA = `
You are an email template generator. Analyze the uploaded PDF email design and generate the appropriate component props.

Available Email Components:

1. **Header** - Top section with promotional text and logo
   Props:
   - promotionalText: string (e.g., "This is a promotional message from Company Name.")
   - logoUrl: string (URL to logo image)
   - logoAlt: string (alt text for logo)
   - backgroundColor: string (hex color, e.g., "#14016c")
   - linkUrl: string (link when clicking logo)

2. **HeroImage** - Full-width hero/banner image
   Props:
   - imageUrl: string (URL to hero image)
   - mobileImageUrl: string (URL to mobile hero image, can be same as imageUrl)
   - altText: string (alt text describing the hero)
   - linkUrl: string (link when clicking hero)

3. **Title** - Main headline text
   Props:
   - headline: string (the main title text)
   - headlineColor: string (hex color, e.g., "#160569")

4. **Content** - Body text paragraphs
   Props:
   - text: string (body content text)
   - textColor: string (hex color, e.g., "#170d67")

5. **EmailButton** - Call-to-action button
   Props:
   - text: string (button text)
   - linkUrl: string (button link)
   - backgroundColor: string (hex color, e.g., "#6e06c1")
   - textColor: string (hex color, e.g., "#ffffff")

6. **Footer** - Bottom section with logos, disclaimer, social links
   Props:
   - companyName: string (e.g., "Company Name Inc.")
   - companyAddress: string (e.g., "123 Main St, City, ST 12345")
   - copyrightYear: string (e.g., "2026")
   - disclaimerText: string (legal disclaimer text)

Based on the email design PDF, output a valid JSON object with this structure:
{
  "header": { /* Header props */ },
  "heroImage": { /* HeroImage props */ },
  "title": { /* Title props */ },
  "content": { /* Content props - can be array for multiple paragraphs */ },
  "button": { /* EmailButton props */ },
  "footer": { /* Footer props */ }
}

Only include sections that appear in the design. For colors, try to match the colors visible in the PDF design.
For image URLs, since you can't extract actual URLs from the PDF, use these placeholder URLs:
- For header logo: "https://placehold.co/143x50/png?text=Logo"
- For hero image: "https://placehold.co/600x300/png?text=Hero+Image"
- For mobile hero image: Use same as hero image
Extract all visible text content accurately from the PDF.
`;

export const PDFToEmail = ({ apiKey = import.meta.env.VITE_GEMINI_API || '' }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedHtml, setGeneratedHtml] = useState(null);
  const [componentData, setComponentData] = useState(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
      setGeneratedHtml(null);
      setComponentData(null);
    } else {
      setError('Please upload a valid PDF file');
      setFile(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError(null);
      setGeneratedHtml(null);
      setComponentData(null);
    } else {
      setError('Please upload a valid PDF file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const generateEmailHtml = (data) => {
    const headerHtml = data.header ? `<!-- HEADER START -->
<!-- Promotional Message -->
<tr>
  <td align="center" style="width: 600px; max-width: 600px;" bgcolor="#EEEEEE">
    <table bgcolor="#EEEEEE" role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" class="mobile" style="width: 600px; max-width: 600px; min-width:600px;" width="600">
      <tbody>
        <tr>
          <td bgcolor="#EEEEEE" align="left" class="mobilepadd" style="font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:14px;text-align:left;color:#333132; padding:15px 30px;">${data.header.promotionalText || ''}</td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- Brand Logo -->
<tr>
  <td align="left" bgcolor="${data.header.backgroundColor || '#14016c'}" style="text-align: left;" class="mobile">
    <table role="presentation" bgcolor="${data.header.backgroundColor || '#14016c'}" border="0" height="100" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td align="left" height="100" style="width: 600px; max-width: 600px; height: 100px; color:#ffffff; font-size:16px; font-weight:bold; font-family: Arial, Helvetica, sans-serif; padding-left: 20px;" valign="middle" width="600">
            <a href="${data.header.linkUrl || '#'}" target="_blank" style="display:block;">
              <img src="${data.header.logoUrl || 'https://placehold.co/143x50/png?text=Logo'}" alt="${data.header.logoAlt || 'Company Logo'}" border="0" width="143" height="auto" style="border-width:0;width:143px;height:auto;display:block;"/>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- HEADER END -->` : '';

    const heroHtml = data.heroImage ? `<!-- BEGIN: Hero Image -->
<tr>
  <td align="center" class="disappear">
    <a href="${data.heroImage.linkUrl || '#'}" target="_blank" style="display:block;">
      <img src="${data.heroImage.imageUrl || 'https://placehold.co/600x300/png?text=Hero+Image'}" alt="${data.heroImage.altText || 'Hero image'}" width="600" class="fluid-image" style="border-width:0;width:600px;height:auto;display:block;" border="0"/>
    </a>
  </td>
</tr>
<!-- END: Hero Image -->` : '';

    const titleHtml = data.title ? `<!-- BEGIN: Title Block -->
<tr>
  <td style="height: 30px; max-height: 30px; min-height: 30px; line-height: 30px;">&nbsp;</td>
</tr>
<tr>
  <td align="center" style="width: 600px; max-width: 600px;" bgcolor="#ffffff">
    <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" class="mobile" style="width: 490px; max-width: 490px; min-width:490px;" width="490">
      <tbody>
        <tr>
          <td align="left" class="mobilepadd" style="font-size: 24px; line-height:32px; padding-top: 13px; font-weight: bold; color: ${data.title.headlineColor || '#160569'}; font-family: Arial, Helvetica, sans-serif;">${data.title.headline || ''}</td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- END: Title Block -->` : '';

    let contentHtml = '';
    if (data.content) {
      const contents = Array.isArray(data.content) ? data.content : [data.content];
      contentHtml = contents.map(c => `<!-- BEGIN: Content Block -->
<tr>
  <td align="center" style="width: 600px; max-width: 600px;" bgcolor="#ffffff">
    <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" class="mobile" style="width: 490px; max-width: 490px; min-width:490px;" width="490">
      <tbody>
        <tr>
          <td align="left" class="mobilepadd" style="font-size: 16px; line-height: 22px; padding-top: 16px; font-weight: normal; color: ${c.textColor || '#170d67'}; font-family: Arial, Helvetica, sans-serif;">${c.text || ''}</td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- END: Content Block -->`).join('\n');
    }

    const buttonHtml = data.button ? `<!-- BEGIN: Button Block -->
<tr>
  <td align="center" class="mobilepadd" style="width: 220px; padding-top: 30px; padding-bottom: 30px">
    <table role="button" cellpadding="0" cellspacing="0">
      <tbody>
        <tr>
          <td align="center" valign="top">
            <div>
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${data.button.linkUrl || '#'}" style="height:50px;v-text-anchor:middle;width:240px;" arcsize="80%" strokecolor="${data.button.backgroundColor || '#6e06c1'}" fillcolor="${data.button.backgroundColor || '#6e06c1'}">
                <w:anchorlock/>
                <center style="color:${data.button.textColor || '#ffffff'};font-family:sans-serif;font-size:18px;font-weight:bold;">${data.button.text || 'Click Here'}</center>
              </v:roundrect>
              <![endif]-->
              <a href="${data.button.linkUrl || '#'}" style="background-color: ${data.button.backgroundColor || '#6e06c1'}; border:1px solid ${data.button.backgroundColor || '#6e06c1'}; border-radius: 40px; color: ${data.button.textColor || '#ffffff'}; display: inline-block; font-family: sans-serif; font-size: 18px; font-weight: bold; line-height: 50px; text-align: center; text-decoration: none; width: 240px;-webkit-text-size-adjust: none; mso-hide: all;" target="_blank">${data.button.text || 'Click Here'}</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- END: Button Block -->` : '';

    const footerHtml = data.footer ? `<!-- BEGIN: Footer -->
<tr>
  <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
    <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
      <table align="center" cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:0 auto;width:100%;max-width:600px;">
        <tr>
          <td align="left" valign="top" style="text-align:left;padding:30px 15px;">
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td valign="top">
                  <table cellpadding="0" cellspacing="0" border="0" align="left">
                    <tr>
                      <td align="left">
                        <img src="https://placehold.co/143x50/png?text=Logo" alt="${data.footer.companyName || 'Company'} logo" border="0" width="143" height="auto" style="border-width:0;width:143px;height:auto;display:block;"/>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </td>
</tr>

<tr>
  <td class="mobilepadd" align="center" style="padding: 0px 55px 20px 55px; text-align:left; color:#333132; font-size:10px; font-weight:normal; font-family:Arial, Helvetica, sans-serif; line-height: 14px;">
    ${data.footer.disclaimerText || ''}
  </td>
</tr>

<tr>
  <td colspan="100%">
    <table align="center" bgcolor="#eeeeee" border="0" cellpadding="0" cellspacing="0" style="width:100%;background-color:#eeeeee;">
      <tbody>
        <tr>
          <td style="font-family:arial,helvetica,sans-serif;text-align: center;font-size:12px;padding:20px 30px 40px;color:#333132;">
            <p style="margin:0;">To unsubscribe or manage your subscriptions, please click <a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">here</a>.</p>
            <p style="margin:0;">&nbsp;</p>
            <p style="margin:0;"><a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">Terms of Use</a> | <a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">Privacy Policy</a> | <a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">View in Browser</a></p>
            <p style="margin:0;">&nbsp;</p>
            <p style="margin:0;">${data.footer.companyName || ''}</p>
            <p style="margin:0;">${data.footer.companyAddress || ''}</p>
            <p style="margin:0;">© ${data.footer.companyName || ''}, ${data.footer.copyrightYear || '2026'}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- END: Footer -->` : '';

    return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" lang="en">
<head>
<title>Email Template</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">
body, html { margin: 0; padding: 0; background-color: #EEEEEE; font-family: Arial, Helvetica, sans-serif; }
table { border-spacing: 0; }
.mobile { width: 600px; max-width: 600px; }
.mobilepadd { padding-left: 30px; padding-right: 30px; }
@media screen and (max-width: 600px) {
  .mobile { width: 100% !important; max-width: 100% !important; }
  .mobilepadd { padding-left: 30px !important; padding-right: 30px !important; }
  .fluid-image { width: 100% !important; height: auto !important; }
  .disappear { display: none !important; }
  .show-mb { display: block !important; width: 100% !important; max-height: none !important; overflow: visible !important; }
}
</style>
</head>
<body style="width:100%; padding:0px; margin:0 auto; background: #EEEEEE;">

<table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
  <tbody>
    <tr>
      <td align="center" bgcolor="#EEEEEE" style="text-align: center; padding: 15px 0 0;">
        <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" class="mobile" style="width: 600px; max-width: 600px;" width="600" bgcolor="#ffffff">
          <tbody>
${headerHtml}
${heroHtml}
${titleHtml}
${contentHtml}
${buttonHtml}
${footerHtml}
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

</body>
</html>`;
  };

  const analyzeWithGemini = async () => {
    if (!file) {
      setError('Please upload a PDF file first');
      return;
    }

    if (!apiKey) {
      setError('Gemini API key is not configured. Please add VITE_GEMINI_API to your .env file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: COMPONENT_SCHEMA + '\n\nPlease analyze this email design PDF and generate the JSON configuration for the email components. Return ONLY the JSON object, no additional text or markdown formatting.',
                  },
                  {
                    inline_data: {
                      mime_type: 'application/pdf',
                      data: base64,
                    },
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 4096,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to analyze PDF');
      }

      const data = await response.json();
      const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textContent) {
        throw new Error('No response from AI');
      }

      let jsonString = textContent;
      if (textContent.includes('```')) {
        const jsonMatch = textContent.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) {
          jsonString = jsonMatch[1].trim();
        }
      }

      const parsedData = JSON.parse(jsonString);
      setComponentData(parsedData);
      
      const html = generateEmailHtml(parsedData);
      setGeneratedHtml(html);

    } catch (err) {
      console.error('Error analyzing PDF:', err);
      setError(err.message || 'Failed to analyze PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedHtml) return;
    try {
      await navigator.clipboard.writeText(generatedHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    if (!generatedHtml) return;
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateComponentData = (section, field, value) => {
    const newData = { ...componentData };
    
    if (section === 'content' && Array.isArray(newData.content)) {
      // Handle array content
      const [contentSection, index, contentField] = field.split('.');
      if (!newData.content[index]) newData.content[index] = {};
      newData.content[index][contentField] = value;
    } else {
      // Handle single object sections
      if (!newData[section]) newData[section] = {};
      newData[section][field] = value;
    }
    
    setComponentData(newData);
    const html = generateEmailHtml(newData);
    setGeneratedHtml(html);
  };

  const renderEditableField = (section, fieldName, value, label, type = 'text') => {
    const fieldId = `${section}-${fieldName}`;
    
    return (
      <tr key={fieldId}>
        <td className="pte-table-label">{label}</td>
        <td className="pte-table-control">
          {type === 'textarea' ? (
            <textarea
              value={value || ''}
              onChange={(e) => updateComponentData(section, fieldName, e.target.value)}
              rows={3}
              className="pte-input pte-textarea"
            />
          ) : type === 'color' ? (
            <div className="pte-color-input-wrapper">
              <input
                type="color"
                value={value || '#000000'}
                onChange={(e) => updateComponentData(section, fieldName, e.target.value)}
                className="pte-color-picker"
              />
              <input
                type="text"
                value={value || ''}
                onChange={(e) => updateComponentData(section, fieldName, e.target.value)}
                placeholder="#000000"
                className="pte-input pte-color-text"
              />
            </div>
          ) : (
            <input
              type={type}
              value={value || ''}
              onChange={(e) => updateComponentData(section, fieldName, e.target.value)}
              className="pte-input"
            />
          )}
        </td>
      </tr>
    );
  };

  const renderComponentDataEditor = () => {
    if (!componentData) return null;

    return (
      <div className="pte-editor">
        <h3>Edit Email Components</h3>
        <p className="pte-editor-description">
          Modify the values below to customize your email template. Changes update the preview in real-time.
        </p>

        {componentData.header && (
          <details className="pte-editor-section" open>
            <summary className="pte-editor-section-title">📧 Header</summary>
            <table className="pte-editor-table">
              <tbody>
                {renderEditableField('header', 'promotionalText', componentData.header.promotionalText, 'Promotional Text', 'textarea')}
                {renderEditableField('header', 'logoUrl', componentData.header.logoUrl, 'Logo URL', 'url')}
                {renderEditableField('header', 'logoAlt', componentData.header.logoAlt, 'Logo Alt Text')}
                {renderEditableField('header', 'backgroundColor', componentData.header.backgroundColor, 'Background Color', 'color')}
                {renderEditableField('header', 'linkUrl', componentData.header.linkUrl, 'Logo Link URL', 'url')}
              </tbody>
            </table>
          </details>
        )}

        {componentData.heroImage && (
          <details className="pte-editor-section" open>
            <summary className="pte-editor-section-title">🖼️ Hero Image</summary>
            <table className="pte-editor-table">
              <tbody>
                {renderEditableField('heroImage', 'imageUrl', componentData.heroImage.imageUrl, 'Image URL', 'url')}
                {renderEditableField('heroImage', 'mobileImageUrl', componentData.heroImage.mobileImageUrl, 'Mobile Image URL', 'url')}
                {renderEditableField('heroImage', 'altText', componentData.heroImage.altText, 'Alt Text')}
                {renderEditableField('heroImage', 'linkUrl', componentData.heroImage.linkUrl, 'Link URL', 'url')}
              </tbody>
            </table>
          </details>
        )}

        {componentData.title && (
          <details className="pte-editor-section" open>
            <summary className="pte-editor-section-title">📝 Title</summary>
            <table className="pte-editor-table">
              <tbody>
                {renderEditableField('title', 'headline', componentData.title.headline, 'Headline', 'textarea')}
                {renderEditableField('title', 'headlineColor', componentData.title.headlineColor, 'Headline Color', 'color')}
              </tbody>
            </table>
          </details>
        )}

        {componentData.content && (
          <details className="pte-editor-section" open>
            <summary className="pte-editor-section-title">📄 Content</summary>
            <table className="pte-editor-table">
              <tbody>
                {(Array.isArray(componentData.content) ? componentData.content : [componentData.content]).map((content, index) => (
                  <React.Fragment key={`content-${index}`}>
                    {Array.isArray(componentData.content) && componentData.content.length > 1 && (
                      <tr>
                        <td colSpan={2} className="pte-table-subtitle">Paragraph {index + 1}</td>
                      </tr>
                    )}
                    {renderEditableField('content', `content.${index}.text`, content.text, 'Text', 'textarea')}
                    {renderEditableField('content', `content.${index}.textColor`, content.textColor, 'Text Color', 'color')}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </details>
        )}

        {componentData.button && (
          <details className="pte-editor-section" open>
            <summary className="pte-editor-section-title">🔘 Button</summary>
            <table className="pte-editor-table">
              <tbody>
                {renderEditableField('button', 'text', componentData.button.text, 'Button Text')}
                {renderEditableField('button', 'linkUrl', componentData.button.linkUrl, 'Link URL', 'url')}
                {renderEditableField('button', 'backgroundColor', componentData.button.backgroundColor, 'Background Color', 'color')}
                {renderEditableField('button', 'textColor', componentData.button.textColor, 'Text Color', 'color')}
              </tbody>
            </table>
          </details>
        )}

        {componentData.footer && (
          <details className="pte-editor-section" open>
            <summary className="pte-editor-section-title">🏢 Footer</summary>
            <table className="pte-editor-table">
              <tbody>
                {renderEditableField('footer', 'companyName', componentData.footer.companyName, 'Company Name')}
                {renderEditableField('footer', 'companyAddress', componentData.footer.companyAddress, 'Company Address')}
                {renderEditableField('footer', 'copyrightYear', componentData.footer.copyrightYear, 'Copyright Year')}
                {renderEditableField('footer', 'disclaimerText', componentData.footer.disclaimerText, 'Disclaimer Text', 'textarea')}
              </tbody>
            </table>
          </details>
        )}
      </div>
    );
  };

  return (
    <div className="pdf-to-email-storybook">
      <header className="pte-header">
        <h1>🪄 AI Email Generator</h1>
        <p>Upload an email design PDF and let AI generate the HTML code using our storybook components</p>
      </header>

      <div className="pte-main">
        <div className="pte-upload-section">
          <div
            className={`pte-drop-zone ${file ? 'has-file' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
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

          {error && <div className="pte-error">{error}</div>}

          <button
            className="pte-generate-btn"
            onClick={analyzeWithGemini}
            disabled={!file || loading || !apiKey}
          >
            {loading ? (
              <>
                <span className="pte-spinner"></span>
                Analyzing PDF with AI...
              </>
            ) : (
              <>
                <span>✨</span> Generate Email HTML
              </>
            )}
          </button>
        </div>

        {generatedHtml && (
          <div className="pte-results">
            <div className="pte-results-header">
              <h2>Generated Email Template</h2>
              <div className="pte-action-buttons">
                <button className="pte-btn pte-copy-btn" onClick={handleCopy}>
                  {copied ? '✓ Copied!' : '📋 Copy HTML'}
                </button>
                <button className="pte-btn pte-download-btn" onClick={handleDownload}>
                  ⬇️ Download HTML
                </button>
              </div>
            </div>

            <div className="pte-preview">
              <h3>Preview</h3>
              <div className="pte-preview-frame">
                <iframe
                  srcDoc={generatedHtml}
                  title="Email Preview"
                  width="100%"
                  height="500"
                  style={{ border: 'none', background: '#EEEEEE' }}
                />
              </div>
            </div>

            {componentData && (
              <details className="pte-details pte-editor-accordion" open>
                <summary>Edit Email Components</summary>
                {renderComponentDataEditor()}
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
        )}
      </div>
    </div>
  );
};

export default PDFToEmail;
