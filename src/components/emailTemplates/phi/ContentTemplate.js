// Generate HTML for content section
export const generateContentHtml = (data) => {
  if (!data) return '';
  
  const textColor = data.textColor || '#170d67';
  const backgroundColor = data.backgroundColor || '#ffffff';
  const textAlign = data.textAlign || 'left';
  
  return `<!-- BEGIN: Content Block -->
<tr>
  <td align="center" style="width: 600px; max-width: 600px;" bgcolor="${backgroundColor}">
    <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" class="mobile" style="width: 490px; max-width: 490px; min-width:490px;" width="490">
      <tbody>
        <tr>
          <td align="${textAlign}" class="mobilepadd" style="font-size: 16px; line-height: 22px; padding-top: 16px; padding-bottom: 16px; font-weight: normal; color: ${textColor}; font-family: Arial, Helvetica, sans-serif; background-color: ${backgroundColor};">${data.textHtml || data.text || ''}</td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- END: Content Block -->`;
};

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
