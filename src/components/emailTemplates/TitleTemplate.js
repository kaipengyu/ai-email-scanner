// Generate HTML for title section
export const generateTitleHtml = (data) => {
  if (!data) return '';
  
  const headlineColor = data.headlineColor || '#160569';
  const backgroundColor = data.backgroundColor || '#ffffff';
  const textAlign = data.textAlign || 'left';
  
  return `<!-- BEGIN: Title Block -->
<tr>
  <td style="height: 30px; max-height: 30px; min-height: 30px; line-height: 30px;">&nbsp;</td>
</tr>
<tr>
  <td align="center" style="width: 600px; max-width: 600px;" bgcolor="${backgroundColor}">
    <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" class="mobile" style="width: 490px; max-width: 490px; min-width:490px;" width="490">
      <tbody>
        <tr>
          <td align="${textAlign}" class="mobilepadd" style="font-size: 24px; line-height:32px; padding-top: 13px; font-weight: bold; color: ${headlineColor}; font-family: Arial, Helvetica, sans-serif; background-color: ${backgroundColor};">${data.headlineHtml || data.headline || ''}</td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- END: Title Block -->`;
};

// Generate MJML for title section
export const generateTitleMjml = (data) => {
  if (!data) return '';

  const headlineColor = data.headlineColor || '#160569';
  const backgroundColor = data.backgroundColor || '#ffffff';
  const textAlign = data.textAlign || 'left';

  return `      <!-- BEGIN: Title Block -->
      <mj-section background-color="${backgroundColor}" padding="13px 55px 0 55px">
        <mj-column>
          <mj-spacer height="30px" />
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
