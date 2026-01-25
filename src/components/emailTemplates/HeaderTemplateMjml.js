// Generate MJML for email header section
export const generateHeaderMjml = (data) => {
  if (!data) return '';
  
  return `      <!-- HEADER START -->
      <!-- Promotional Message -->
      <mj-section background-color="#EEEEEE" padding="15px 30px" css-class="header-section">
        <mj-column>
          <mj-text 
            font-family="Arial, Helvetica, sans-serif" 
            font-size="10px" 
            line-height="14px" 
            color="#333132"
            align="left"
            padding="0"
          >
            ${data.promotionalText || ''}
          </mj-text>
        </mj-column>
      </mj-section>
      
      <!-- Brand Logo -->
      <mj-section background-color="${data.backgroundColor || '#14016c'}" padding="0" css-class="header-section">
        <mj-column>
          <mj-image 
            src="${data.logoUrl || 'https://placehold.co/143x50/png?text=Logo'}" 
            alt="${data.logoAlt || 'Company Logo'}" 
            width="143px"
            align="left"
            padding="20px"
            href="${data.linkUrl || '#'}"
          />
        </mj-column>
      </mj-section>
      <!-- HEADER END -->`;
};
