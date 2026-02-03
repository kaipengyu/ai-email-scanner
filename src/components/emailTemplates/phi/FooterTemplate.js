// Generate HTML for footer section
export const generateFooterHtml = (data) => {
  if (!data) return '';

  const backgroundColor = data.backgroundColor || '#eeeeee';

  // Build social icons HTML - using exact PHI template styling
  let socialIconsHtml = '';
  if (data.socialIcons && Array.isArray(data.socialIcons) && data.socialIcons.length > 0) {
    const iconsHtml = data.socialIcons.map((icon, idx) => {
      // Match exact padding from template: Facebook=4px, Twitter=4px 12px, LinkedIn=4px
      let padding = '4px';
      let width = '24';
      if (icon.platform === 'Twitter' || icon.platform === 'X') {
        padding = '4px 12px';
        width = '23';
      } else if (icon.platform === 'LinkedIn') {
        width = '28';
      }
      return `<td style="padding:${padding};"><a href="${icon.linkUrl || '#'}" target="_blank"><img alt="${icon.alt || icon.platform || 'Social'}" border="0" src="${icon.iconUrl || `https://placehold.co/${width}x${width}/png?text=${icon.platform?.charAt(0) || 'S'}`}" width="${width}" /></a></td>`;
    }).join('\n\t\t\t\t\t\t');

    socialIconsHtml = `
<div style="text-align: center;background-color:${backgroundColor};">
<table bgcolor="${backgroundColor}" border="0" cellpadding="0" cellspacing="0" style="width:100%;background-color:${backgroundColor};" width="100%">
	<tbody>
		<tr>
			<td align="center" style="padding-top:20px;">
			<table align="center" border="0" cellpadding="0" cellspacing="0">
				<tbody>
					<tr style="display: inline-block">
						${iconsHtml}
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td style="font-family:arial,helvetica,sans-serif;text-align: center;font-size:12px;padding:20px 30px 40px;color:#333132;">
			<p style="margin:0;">To unsubscribe or manage your subscriptions, please click&nbsp;<a href="${data.unsubscribeUrl || '#'}" style="text-decoration:underline;color:#333132;font-weight:400;">here</a>.</p>

			<p style="margin:0;">&nbsp;</p>

			<p style="margin:0;"><a href="${data.termsUrl || '#'}" style="text-decoration:underline;color:#333132;font-weight:400;">Terms of Use</a> | <a href="${data.privacyUrl || '#'}" style="text-decoration:underline;color:#333132;font-weight:400;">Privacy Policy</a> | <a href="${data.viewInBrowserUrl || '#'}" style="text-decoration:underline;color:#333132;font-weight:400;">View in Browser</a></p>

			<p style="margin:0;">&nbsp;</p>

			<p style="margin:0;">${data.companyName || ''}</p>

			<p style="margin:0;">${data.companyAddress || ''}</p>

			<p style="margin:0;"><span style="text-align: left; color:#333132; text-transform: none; text-indent: 0px; letter-spacing: normal; font-style: normal; font-variant: normal; font-weight: 400; text-decoration: none; word-spacing: 0px; white-space: normal; orphans: 2; float: none; -webkit-text-stroke-width: 0px; background-color: transparent; display: inline !important;">&copy;</span> ${data.companyName || ''}, ${data.copyrightYear || '2026'}</p>
			</td>
		</tr>
	</tbody>
</table>
</div>`;
  }

  return `<!-- BEGIN: Footer -->
<tr>
  <td align="left" valign="top" style="font-size:1px; line-height:1px; background-color: ${backgroundColor};padding-top: 35px">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
      <tbody>
        <tr>
          <td align="left" valign="top">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tbody>
                <tr>
                  <td align="center" valign="top">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tbody>
                        <tr>
                          <td class="col-100" align="left" valign="top">
                            <table role="presentation" align="center" width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tbody>
                                <tr>
                                  <td align="left" valign="top">
                                    <table role="presentation" align="center" width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tbody>
                                        <!-- Logo -->
                                        <tr>
                                          <td class="setPadding_contentarea" style="padding: 0px 30px" align="left" valign="top">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                              <tbody>
                                                <tr>
                                                  <td align="center" valign="top">
                                                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                                                      <tbody>
                                                        <tr>
                                                          <td width="345" align="left" valign="middle">
                                                            <table role="presentation" align="left" width="100%" border="0" cellspacing="0" cellpadding="0">
                                                              <tbody>
                                                                <tr>
                                                                  <td align="left" valign="middle">
                                                                    <a target="_blank" style="display:inline-block;" href="${data.logoLinkUrl || '#'}">
                                                                      <img src="${data.logoUrl || 'https://placehold.co/143x50/png?text=Logo'}" width="143" height="auto" alt="${data.companyName || 'Company'} logo" class="full_width">
                                                                    </a>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <!-- Eligibility/Disclaimer Text -->
                                        <tr>
                                          <td align="left" valign="top">
                                            <table cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                              <tbody>
                                                <tr>
                                                  <td class="setPadding_contentarea" style="padding: 0px 60px" align="left" valign="top">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
                                                      <tbody>
                                                        <tr>
                                                          <td style="padding-top:20px;padding-bottom: 20px" align="left" valign="middle">
                                                            <p style="margin:0;font-family: Arial, Helvetica, sans-serif; font-size: 10px; font-weight: normal; color: #403f40; line-height: 14px;padding-bottom: 5px ">
                                                              ${data.eligibilityTextHtml || data.eligibilityText || data.disclaimerTextHtml || data.disclaimerText || ''}
                                                            </p>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>

${socialIconsHtml || `
<div style="text-align: center;background-color:${backgroundColor};">
<table bgcolor="${backgroundColor}" border="0" cellpadding="0" cellspacing="0" style="width:100%;background-color:${backgroundColor};" width="100%">
	<tbody>
		<tr>
			<td style="font-family:arial,helvetica,sans-serif;text-align: center;font-size:12px;padding:20px 30px 40px;color:#333132;">
			<p style="margin:0;">To unsubscribe or manage your subscriptions, please click&nbsp;<a href="${data.unsubscribeUrl || '#'}" style="text-decoration:underline;color:#333132;font-weight:400;">here</a>.</p>

			<p style="margin:0;">&nbsp;</p>

			<p style="margin:0;"><a href="${data.termsUrl || '#'}" style="text-decoration:underline;color:#333132;font-weight:400;">Terms of Use</a> | <a href="${data.privacyUrl || '#'}" style="text-decoration:underline;color:#333132;font-weight:400;">Privacy Policy</a> | <a href="${data.viewInBrowserUrl || '#'}" style="text-decoration:underline;color:#333132;font-weight:400;">View in Browser</a></p>

			<p style="margin:0;">&nbsp;</p>

			<p style="margin:0;">${data.companyName || ''}</p>

			<p style="margin:0;">${data.companyAddress || ''}</p>

			<p style="margin:0;"><span style="text-align: left; color:#333132; text-transform: none; text-indent: 0px; letter-spacing: normal; font-style: normal; font-variant: normal; font-weight: 400; text-decoration: none; word-spacing: 0px; white-space: normal; orphans: 2; float: none; -webkit-text-stroke-width: 0px; background-color: transparent; display: inline !important;">&copy;</span> ${data.companyName || ''}, ${data.copyrightYear || '2026'}</p>
			</td>
		</tr>
	</tbody>
</table>
</div>`}
<!-- END: Footer -->`;
};

// Generate MJML for footer section
export const generateFooterMjml = (data) => {
  if (!data) return '';

  const backgroundColor = data.backgroundColor || '#eeeeee';

  // Build social icons for MJML
  let socialIconsRow = '';
  if (data.socialIcons && Array.isArray(data.socialIcons) && data.socialIcons.length > 0) {
    const iconsHtml = data.socialIcons.map((icon) => {
      let padding = '4px';
      let width = '24';
      if (icon.platform === 'Twitter' || icon.platform === 'X') {
        padding = '4px 12px';
        width = '23';
      } else if (icon.platform === 'LinkedIn') {
        width = '28';
      }
      return `<td style="padding:${padding};"><a href="${icon.linkUrl || '#'}" target="_blank"><img alt="${icon.alt || icon.platform || 'Social'}" border="0" src="${icon.iconUrl}" width="${width}" /></a></td>`;
    }).join('');

    socialIconsRow = `
		<tr>
			<td align="center" style="padding-top:20px;">
			<table align="center" border="0" cellpadding="0" cellspacing="0">
				<tbody>
					<tr style="display: inline-block">
						${iconsHtml}
					</tr>
				</tbody>
			</table>
			</td>
		</tr>`;
  }

  return `      <!-- BEGIN: Footer -->
      <mj-section background-color="${backgroundColor}" padding="35px 30px 0 30px">
        <mj-column>
          <mj-image
            src="${data.logoUrl || 'https://placehold.co/143x50/png?text=Logo'}"
            alt="${data.companyName || 'Company'} logo"
            width="143px"
            align="left"
            padding="0"
            href="${data.logoLinkUrl || '#'}"
          />
        </mj-column>
      </mj-section>

      <mj-section background-color="${backgroundColor}" padding="20px 60px">
        <mj-column>
          <mj-text
            font-size="10px"
            line-height="14px"
            color="#403f40"
            font-family="Arial, Helvetica, sans-serif"
            align="left"
            padding="0"
          >
            ${data.eligibilityTextMjml || data.eligibilityText || data.disclaimerTextMjml || data.disclaimerText || ''}
          </mj-text>
        </mj-column>
      </mj-section>

      <mj-raw>
        <div style="text-align: center;background-color:${backgroundColor};">
        <table bgcolor="${backgroundColor}" border="0" cellpadding="0" cellspacing="0" style="width:100%;background-color:${backgroundColor};" width="100%">
          <tbody>
            ${socialIconsRow}
            <tr>
              <td style="font-family:arial,helvetica,sans-serif;text-align: center;font-size:12px;padding:20px 30px 40px;color:#333132;">
              <p style="margin:0;">To unsubscribe or manage your subscriptions, please click&nbsp;<a href="${data.unsubscribeUrl || '#'}" style="text-decoration:underline;color:#333132;font-weight:400;">here</a>.</p>

              <p style="margin:0;">&nbsp;</p>

              <p style="margin:0;"><a href="${data.termsUrl || '#'}" style="text-decoration:underline;color:#333132;font-weight:400;">Terms of Use</a> | <a href="${data.privacyUrl || '#'}" style="text-decoration:underline;color:#333132;font-weight:400;">Privacy Policy</a> | <a href="${data.viewInBrowserUrl || '#'}" style="text-decoration:underline;color:#333132;font-weight:400;">View in Browser</a></p>

              <p style="margin:0;">&nbsp;</p>

              <p style="margin:0;">${data.companyName || ''}</p>

              <p style="margin:0;">${data.companyAddress || ''}</p>

              <p style="margin:0;"><span style="color:#333132;">&copy;</span> ${data.companyName || ''}, ${data.copyrightYear || '2026'}</p>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </mj-raw>
      <!-- END: Footer -->`;
};
