// Generate MJML for content section
export const generateContentMjml = (data) => {
  if (!data) return '';
  
  const textColor = data.textColor || '#170d67';
  const backgroundColor = data.backgroundColor || '#ffffff';
  const textAlign = data.textAlign || 'left';
  
  return `      <!-- BEGIN: Content Block -->
      <mj-section background-color="${backgroundColor}" padding="16px 55px">
        <mj-column>
          <mj-text 
            font-size="16px" 
            line-height="22px" 
            font-weight="normal" 
            color="${textColor}" 
            font-family="Arial, Helvetica, sans-serif"
            align="${textAlign}"
            padding="0"
          >
            ${data.textMjml || data.text || ''}
          </mj-text>
        </mj-column>
      </mj-section>
      <!-- END: Content Block -->`;
};
