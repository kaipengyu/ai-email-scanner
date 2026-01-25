// Generate MJML for button section (mj-button supports width, height, border; background-image is HTML-only)
export const generateButtonMjml = (data) => {
  if (!data) return '';
  if (data.buttonMjml) return data.buttonMjml;

  const buttonBackgroundColor = data.backgroundColor || '#6e06c1';
  const textColor = data.textColor || '#ffffff';
  const sectionBackgroundColor = data.sectionBackgroundColor || '#ffffff';
  const borderColor = data.borderColor || buttonBackgroundColor;
  const width = parseInt(data.width, 10) || 240;
  const height = parseInt(data.height, 10) || 50;
  const borderRadius = parseInt(data.borderRadius, 10) || 40;

  const borderCss = `1px solid ${borderColor}`;

  return `      <!-- BEGIN: Button Block -->
      <mj-section background-color="${sectionBackgroundColor}" padding="30px 55px" css-class="button-section">
        <mj-column>
          <mj-button 
            background-color="${buttonBackgroundColor}" 
            color="${textColor}" 
            font-size="18px" 
            font-weight="bold"
            border="${borderCss}"
            border-radius="${borderRadius}px"
            width="${width}px"
            height="${height}px"
            href="${data.linkUrl || '#'}"
            align="center"
            inner-padding="0"
          >
            ${data.text || 'Click Here'}
          </mj-button>
        </mj-column>
      </mj-section>
      <!-- END: Button Block -->`;
};
