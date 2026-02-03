// Generate HTML for email header section
export const generateHeaderHtml = (data) => {
  if (!data) return '';
  
  return `<!-- HEADER START -->
<!-- Promotional Message -->
<tr>
  <td align="center" style="width: 600px; max-width: 600px;" bgcolor="#EEEEEE">
    <table bgcolor="#EEEEEE" role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" class="mobile" style="width: 600px; max-width: 600px; min-width:600px;" width="600">
      <tbody>
        <tr>
          <td bgcolor="#EEEEEE" align="left" class="mobilepadd" style="font-family:Arial, Helvetica, sans-serif;font-size:10px;line-height:14px;text-align:left;color:#333132; padding:15px 30px;">${data.promotionalText || ''}</td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- Brand Logo -->
<tr>
  <td align="left" bgcolor="${data.backgroundColor || '#14016c'}" style="text-align: left;" class="mobile">
    <table role="presentation" bgcolor="${data.backgroundColor || '#14016c'}" border="0" height="100" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td align="left" height="100" style="width: 600px; max-width: 600px; height: 100px; color:#ffffff; font-size:16px; font-weight:bold; font-family: Arial, Helvetica, sans-serif; padding-left: 20px;" valign="middle" width="600">
            <a href="${data.linkUrl || '#'}" target="_blank" style="display:block;">
              <img src="${data.logoUrl || 'https://placehold.co/143x50/png?text=Logo'}" alt="${data.logoAlt || 'Company Logo'}" border="0" width="143" height="auto" style="border-width:0;width:143px;height:auto;display:block;"/>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- HEADER END -->`;
};

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
