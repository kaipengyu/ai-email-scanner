// Generate MJML for title section
export const generateTitleMjml = (data) => {
  if (!data) return '';
  
  const headlineColor = data.headlineColor || '#160569';
  const backgroundColor = data.backgroundColor || '#ffffff';
  const textAlign = data.textAlign || 'left';
  
  return `      <!-- BEGIN: Title Block -->
      <mj-spacer height="30px" />
      <mj-section background-color="${backgroundColor}" padding="13px 55px 0 55px">
        <mj-column>
          <mj-text 
            font-size="24px" 
            line-height="32px" 
            font-weight="bold" 
            color="${headlineColor}" 
            font-family="Arial, Helvetica, sans-serif"
            align="${textAlign}"
            padding="0"
          >
            ${data.headlineMjml || data.headline || ''}
          </mj-text>
        </mj-column>
      </mj-section>
      <!-- END: Title Block -->`;
};
