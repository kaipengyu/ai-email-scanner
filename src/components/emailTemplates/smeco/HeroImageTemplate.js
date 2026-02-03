// Generate HTML for SMECO hero image section
export const generateHeroImageHtml = (data) => {
  if (!data) return '';

  return `<!-- BEGIN: Hero Image -->
<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
<div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:0;text-align:center;">
          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:600px;" ><![endif]-->
          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td style="vertical-align:middle;padding:0;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                              <tbody>
                                <tr>
                                  <td style="width:600px;">
                                    <a href="${data.linkUrl || '#'}" target="_blank">
                                      <img alt="${data.altText || 'Hero image'}" src="${data.imageUrl || 'https://placehold.co/600x400/00582F/ffffff/png?text=SMECO+Hero'}" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="600" height="auto" />
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
          </div>
          <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
</div>
<!--[if mso | IE]></td></tr></table><![endif]-->
<!-- END: Hero Image -->`;
};

// Generate MJML for SMECO hero image section
export const generateHeroImageMjml = (data) => {
  if (!data) return '';

  return `      <!-- BEGIN: Hero Image -->
      <mj-section background-color="#ffffff" padding="0">
        <mj-column>
          <mj-image
            src="${data.imageUrl || 'https://placehold.co/600x400/00582F/ffffff/png?text=SMECO+Hero'}"
            alt="${data.altText || 'Hero image'}"
            width="600px"
            padding="0"
            href="${data.linkUrl || '#'}"
          />
        </mj-column>
      </mj-section>
      <!-- END: Hero Image -->`;
};
