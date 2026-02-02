// Generate HTML for footer section
export const generateFooterHtml = (data) => {
  if (!data) return '';
  
  const backgroundColor = data.backgroundColor || '#eeeeee';
  
  return `<!-- BEGIN: Footer -->
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
                        <img src="https://placehold.co/143x50/png?text=Logo" alt="${data.companyName || 'Company'} logo" border="0" width="143" height="auto" style="border-width:0;width:143px;height:auto;display:block;"/>
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
    ${data.disclaimerTextHtml || data.disclaimerText || ''}
  </td>
</tr>

<tr>
  <td colspan="100%">
    <table align="center" bgcolor="${backgroundColor}" border="0" cellpadding="0" cellspacing="0" style="width:100%;background-color:${backgroundColor};">
      <tbody>
        <tr>
          <td style="font-family:arial,helvetica,sans-serif;text-align: center;font-size:12px;padding:20px 30px 40px;color:#333132; background-color:${backgroundColor};">
            <p style="margin:0;">To unsubscribe or manage your subscriptions, please click <a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">here</a>.</p>
            <p style="margin:0;">&nbsp;</p>
            <p style="margin:0;"><a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">Terms of Use</a> | <a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">Privacy Policy</a> | <a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">View in Browser</a></p>
            <p style="margin:0;">&nbsp;</p>
            <p style="margin:0;">${data.companyName || ''}</p>
            <p style="margin:0;">${data.companyAddress || ''}</p>
            <p style="margin:0;">© ${data.companyName || ''}, ${data.copyrightYear || '2026'}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
<!-- END: Footer -->`;
};

// Generate MJML for footer section
export const generateFooterMjml = (data) => {
  if (!data) return '';

  const backgroundColor = data.backgroundColor || '#eeeeee';

  return `      <!-- BEGIN: Footer -->
      <mj-section padding="30px 15px" css-class="footer-section">
        <mj-column>
          <mj-image
            src="https://placehold.co/143x50/png?text=Logo"
            alt="${data.companyName || 'Company'} logo"
            width="143px"
            align="left"
            padding="0"
          />
        </mj-column>
      </mj-section>

      <mj-section padding="0 55px 20px 55px" css-class="footer-section">
        <mj-column>
          <mj-text
            font-size="10px"
            line-height="14px"
            color="#333132"
            font-family="Arial, Helvetica, sans-serif"
            align="left"
            padding="0"
          >
            ${data.disclaimerTextMjml || data.disclaimerText || ''}
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-section background-color="${backgroundColor}" padding="20px 30px 40px 30px" css-class="footer-section">
        <mj-column>
          <mj-text
            font-size="12px"
            color="#333132"
            font-family="Arial, Helvetica, sans-serif"
            align="left"
            padding="0"
          >
            <p style="margin:0;">To unsubscribe or manage your subscriptions, please click <a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">here</a>.</p>
            <p style="margin:0;">&nbsp;</p>
            <p style="margin:0;"><a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">Terms of Use</a> | <a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">Privacy Policy</a> | <a href="#" style="text-decoration:underline;color:#333132;font-weight:400;">View in Browser</a></p>
            <p style="margin:0;">&nbsp;</p>
            <p style="margin:0;">${data.companyName || ''}</p>
            <p style="margin:0;">${data.companyAddress || ''}</p>
            <p style="margin:0;">© ${data.companyName || ''}, ${data.copyrightYear || '2026'}</p>
          </mj-text>
        </mj-column>
      </mj-section>
      <!-- END: Footer -->`;
};
