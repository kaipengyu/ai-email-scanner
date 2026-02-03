// Generate HTML for info box section (e.g., meeting details with light purple background)
export const generateInfoBoxHtml = (data) => {
  if (!data) return '';

  const backgroundColor = data.backgroundColor || '#E4E1F0';
  const textColor = data.textColor || '#170d67';
  const linkColor = data.linkColor || '#160569';

  // Build the content rows
  let contentHtml = '';

  if (data.items && Array.isArray(data.items)) {
    data.items.forEach(item => {
      const isLink = item.linkUrl && item.linkUrl.trim() !== '';
      const textContent = isLink
        ? `<a href="${item.linkUrl}" style="color: ${linkColor}; text-decoration: underline;">${item.text}</a>`
        : item.text;

      if (item.label) {
        contentHtml += `<tr>
          <td align="center" style="font-size: 16px; line-height: 24px; padding: 4px 0; color: ${textColor}; font-family: Arial, Helvetica, sans-serif;">
            ${item.label}: ${textContent}
          </td>
        </tr>`;
      } else {
        contentHtml += `<tr>
          <td align="center" style="font-size: 16px; line-height: 24px; padding: 8px 0; color: ${textColor}; font-family: Arial, Helvetica, sans-serif;">
            ${textContent}
          </td>
        </tr>`;
      }
    });
  }

  return `<!-- BEGIN: Info Box Block -->
<tr>
  <td align="center" style="width: 600px; max-width: 600px;" bgcolor="${backgroundColor}">
    <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" class="mobile" style="width: 490px; max-width: 490px; min-width:490px;" width="490">
      <tbody>
        <tr>
          <td style="padding: 24px 0;">
            <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                ${contentHtml}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- END: Info Box Block -->`;
};

// Generate MJML for info box section
export const generateInfoBoxMjml = (data) => {
  if (!data) return '';

  const backgroundColor = data.backgroundColor || '#E4E1F0';
  const textColor = data.textColor || '#170d67';
  const linkColor = data.linkColor || '#160569';

  // Build the content
  let contentMjml = '';

  if (data.items && Array.isArray(data.items)) {
    data.items.forEach(item => {
      const isLink = item.linkUrl && item.linkUrl.trim() !== '';
      const textContent = isLink
        ? `<a href="${item.linkUrl}" style="color: ${linkColor}; text-decoration: underline;">${item.text}</a>`
        : item.text;

      const displayText = item.label ? `${item.label}: ${textContent}` : textContent;
      const padding = item.label ? '4px 0' : '8px 0';

      contentMjml += `
          <mj-text
            font-size="16px"
            line-height="24px"
            color="${textColor}"
            font-family="Arial, Helvetica, sans-serif"
            align="center"
            padding="${padding}"
          >
            ${displayText}
          </mj-text>`;
    });
  }

  return `      <!-- BEGIN: Info Box Block -->
      <mj-section background-color="${backgroundColor}" padding="24px 55px">
        <mj-column>
          ${contentMjml}
        </mj-column>
      </mj-section>
      <!-- END: Info Box Block -->`;
};
