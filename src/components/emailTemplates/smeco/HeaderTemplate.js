// Generate HTML for SMECO email header section (no promotional bar, just logo area if needed)
export const generateHeaderHtml = (data) => {
  if (!data) return '';

  const backgroundColor = data.backgroundColor || '#ffffff';

  return `<!-- HEADER START -->
<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="${backgroundColor}" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
<div style="background:${backgroundColor};background-color:${backgroundColor};margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:${backgroundColor};background-color:${backgroundColor};width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:0;text-align:center;">
          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:600px;" ><![endif]-->
          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td style="vertical-align:middle;padding:20px 40px;">
                    ${data.logoUrl ? `<a href="${data.linkUrl || '#'}" target="_blank"><img src="${data.logoUrl}" alt="${data.logoAlt || 'SMECO Logo'}" border="0" width="146" style="max-width:146px;width:100%;display:block" /></a>` : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
</div>
<!--[if mso | IE]></td></tr></table><![endif]-->
<!-- HEADER END -->`;
};

// Generate MJML for SMECO email header section
export const generateHeaderMjml = (data) => {
  if (!data) return '';

  const backgroundColor = data.backgroundColor || '#ffffff';

  return `      <!-- HEADER START -->
      <mj-section background-color="${backgroundColor}" padding="20px 40px">
        <mj-column>
          ${data.logoUrl ? `<mj-image
            src="${data.logoUrl}"
            alt="${data.logoAlt || 'SMECO Logo'}"
            width="146px"
            align="left"
            padding="0"
            href="${data.linkUrl || '#'}"
          />` : ''}
        </mj-column>
      </mj-section>
      <!-- HEADER END -->`;
};
