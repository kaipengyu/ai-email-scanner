// Default values for SMECO footer
const SMECO_FOOTER_DEFAULTS = {
  dividerColor: '#00582F',
  facebookUrl: 'https://www.facebook.com/SMECO.coop',
  facebookIcon: 'https://s3.amazonaws.com/eoa_uploads/2026-02-01/jTyG7NNa0T4inOn1O1W5/social_fb.png',
  twitterUrl: 'https://twitter.com/somdelectric',
  twitterIcon: 'https://s3.amazonaws.com/eoa_uploads/2026-02-01/jTyG7NNa0T4inOn1O1W5/social_x.png',
  instagramUrl: 'https://www.instagram.com/somdelectric/',
  instagramIcon: 'https://s3.amazonaws.com/eoa_uploads/2026-02-01/jTyG7NNa0T4inOn1O1W5/social_ig.png',
  partnerLogoUrl: 'https://s3.amazonaws.com/eoa_uploads/2026-02-01/jTyG7NNa0T4inOn1O1W5/lg-empower-dm.png',
  partnerLogoAlt: 'EmPOWER Maryland logo',
  partnerLinkUrl: 'https://www.smeco.coop/energy-efficiency/residential-programs/',
  companyLogoUrl: 'https://s3.amazonaws.com/eoa_uploads/2026-02-01/jTyG7NNa0T4inOn1O1W5/smeco_logo.png',
  companyLogoAlt: 'SMECO logo',
  companyLinkUrl: 'https://www.smeco.coop/energy-efficiency/residential-programs/',
  disclaimerText: 'EmPOWER Maryland programs are funded by a charge on your energy bill. EmPOWER programs can help you reduce your energy use and save you money. To learn more about EmPOWER and how you can participate, go to <a target="_blank" style="color:#363636;text-decoration:underline;font-weight:bold;white-space:nowrap;" href="https://www.smeco.coop/energy-efficiency/residential-programs/">SMECO.coop/save</a>.',
};

// Generate HTML for SMECO footer section
export const generateFooterHtml = (data) => {
  if (!data) return '';

  const dividerColor = data.dividerColor || SMECO_FOOTER_DEFAULTS.dividerColor;
  const facebookUrl = data.facebookUrl || SMECO_FOOTER_DEFAULTS.facebookUrl;
  const facebookIcon = data.facebookIcon || SMECO_FOOTER_DEFAULTS.facebookIcon;
  const twitterUrl = data.twitterUrl || SMECO_FOOTER_DEFAULTS.twitterUrl;
  const twitterIcon = data.twitterIcon || SMECO_FOOTER_DEFAULTS.twitterIcon;
  const instagramUrl = data.instagramUrl || SMECO_FOOTER_DEFAULTS.instagramUrl;
  const instagramIcon = data.instagramIcon || SMECO_FOOTER_DEFAULTS.instagramIcon;
  const partnerLogoUrl = data.partnerLogoUrl || SMECO_FOOTER_DEFAULTS.partnerLogoUrl;
  const partnerLogoAlt = data.partnerLogoAlt || SMECO_FOOTER_DEFAULTS.partnerLogoAlt;
  const partnerLinkUrl = data.partnerLinkUrl || SMECO_FOOTER_DEFAULTS.partnerLinkUrl;
  const companyLogoUrl = data.companyLogoUrl || SMECO_FOOTER_DEFAULTS.companyLogoUrl;
  const companyLogoAlt = data.companyLogoAlt || SMECO_FOOTER_DEFAULTS.companyLogoAlt;
  const companyLinkUrl = data.companyLinkUrl || SMECO_FOOTER_DEFAULTS.companyLinkUrl;
  const disclaimerText = data.disclaimerTextHtml || data.disclaimerText || SMECO_FOOTER_DEFAULTS.disclaimerText;

  return `<!-- BEGIN: Footer -->
<!--DIVIDER-->
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
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:0;word-break:break-word;">
                            <p style="border-top:solid 8px ${dividerColor};font-size:1px;margin:0px auto;width:100%;"></p>
                            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 8px ${dividerColor};font-size:1px;margin:0px auto;width:600px;" role="presentation" width="600px" ><tr><td style="height:0;line-height:0;"> &nbsp;</td></tr></table><![endif]-->
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

<!--FOOTER ICONS-->
<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="transparent" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
<div style="background:transparent;background-color:transparent;margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;background-color:transparent;width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:0;text-align:center;">
          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td style="vertical-align:top;padding:0;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style width="100%">
                      <tbody>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" style="padding:24px 0 30px;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
                          <tr>
                            <td height="30" colspan="3"></td>
                          </tr>
                          <tr>
                            <!-- Facebook Icon -->
                            <td align="center" style="font-size:0;line-height:0;mso-line-height-rule:exactly;padding:0 15px 0 0;">
                              <!--[if mso]><table cellpadding="0" cellspacing="0" border="0"><tr><td width="30" height="30"><![endif]-->
                              <a href="${facebookUrl}" target="_blank" style="display:block;">
                                <img src="${facebookIcon}" width="30" height="30" alt="Facebook icon" border="0" style="display:block;border:0;line-height:1;width:30px;height:30px;" />
                              </a>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                            <!-- Twitter/X Icon -->
                            <td align="center" style="font-size:0;line-height:0;mso-line-height-rule:exactly;padding:0 15px;">
                              <!--[if mso]><table cellpadding="0" cellspacing="0" border="0"><tr><td width="30" height="30"><![endif]-->
                              <a href="${twitterUrl}" target="_blank" style="display:block;">
                                <img src="${twitterIcon}" alt="X Twitter icon" border="0" width="30" height="30" style="display:block;border:0;line-height:1;width:30px;height:30px;" />
                              </a>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                            <!-- Instagram Icon -->
                            <td align="center" style="font-size:0;line-height:0;mso-line-height-rule:exactly;padding:0 0 0 15px;">
                              <!--[if mso]><table cellpadding="0" cellspacing="0" border="0"><tr><td width="30" height="30"><![endif]-->
                              <a href="${instagramUrl}" target="_blank" style="display:block;">
                                <img src="${instagramIcon}" alt="Instagram icon" border="0" width="30" height="30" style="display:block;border:0;line-height:1;width:30px;height:30px;" />
                              </a>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                          <tr>
                            <td height="30" colspan="3"></td>
                          </tr>
                        </table>
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

<!-- LOGOS -->
<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="transparent" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
<div style="background:transparent;background-color:transparent;margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;background-color:transparent;width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:0;text-align:center;">
          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td style="vertical-align:top;padding:0;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style width="100%">
                      <tbody>
                        <tr>
                          <td align="left" class="padding-lr-30" style="font-size:0px;padding:0 40px;word-break:break-word;">
                            <table cellpadding="0" cellspacing="0" width="100%" border="0" style="color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:13px;line-height:normal;table-layout:auto;width:100%;border:0;">
                              <tr>
                                <td width="45%" align="left">
                                  <a href="${partnerLinkUrl}" target="_blank"><img src="${partnerLogoUrl}" width="111" style="width:100%; max-width: 111px;display:block" border="0" alt="${partnerLogoAlt}" /></a>
                                </td>
                                <td width="10%">&nbsp;</td>
                                <td width="45%" style="padding-top:6px" align="right">
                                  <a href="${companyLinkUrl}" target="_blank">
                                    <img src="${companyLogoUrl}" width="146" alt="${companyLogoAlt}" style="max-width:146px;width:100%;display:block" border="0" />
                                  </a>
                                </td>
                              </tr>
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

<!--FOOTNOTE-->
<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="transparent" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
<div style="background:transparent;background-color:transparent;margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:transparent;background-color:transparent;width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:0;text-align:center;">
          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td style="vertical-align:top;padding:0;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style width="100%">
                      <tbody>
                        <tr>
                          <td align="left" class="padding-lr-30 txt-aligned-left" style="font-size:0px;padding:25px 40px 24px;word-break:break-word;">
                            <div style="font-family:Arial, Helvetica, sans-serif;font-size:12px;line-height:16px;text-align:left;color:#363636;">${disclaimerText}</div>
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
<!-- END: Footer -->`;
};

// Generate MJML for SMECO footer section
export const generateFooterMjml = (data) => {
  if (!data) return '';

  const dividerColor = data.dividerColor || SMECO_FOOTER_DEFAULTS.dividerColor;
  const facebookUrl = data.facebookUrl || SMECO_FOOTER_DEFAULTS.facebookUrl;
  const facebookIcon = data.facebookIcon || SMECO_FOOTER_DEFAULTS.facebookIcon;
  const twitterUrl = data.twitterUrl || SMECO_FOOTER_DEFAULTS.twitterUrl;
  const twitterIcon = data.twitterIcon || SMECO_FOOTER_DEFAULTS.twitterIcon;
  const instagramUrl = data.instagramUrl || SMECO_FOOTER_DEFAULTS.instagramUrl;
  const instagramIcon = data.instagramIcon || SMECO_FOOTER_DEFAULTS.instagramIcon;
  const partnerLogoUrl = data.partnerLogoUrl || SMECO_FOOTER_DEFAULTS.partnerLogoUrl;
  const partnerLogoAlt = data.partnerLogoAlt || SMECO_FOOTER_DEFAULTS.partnerLogoAlt;
  const partnerLinkUrl = data.partnerLinkUrl || SMECO_FOOTER_DEFAULTS.partnerLinkUrl;
  const companyLogoUrl = data.companyLogoUrl || SMECO_FOOTER_DEFAULTS.companyLogoUrl;
  const companyLogoAlt = data.companyLogoAlt || SMECO_FOOTER_DEFAULTS.companyLogoAlt;
  const companyLinkUrl = data.companyLinkUrl || SMECO_FOOTER_DEFAULTS.companyLinkUrl;
  const disclaimerText = data.disclaimerTextMjml || data.disclaimerText || SMECO_FOOTER_DEFAULTS.disclaimerText;

  return `      <!-- BEGIN: Footer -->
      <!-- DIVIDER -->
      <mj-section background-color="#ffffff" padding="0">
        <mj-column>
          <mj-divider border-width="8px" border-color="${dividerColor}" padding="0" />
        </mj-column>
      </mj-section>

      <!-- SOCIAL ICONS -->
      <mj-section background-color="transparent" padding="30px 0">
        <mj-column>
          <mj-social font-size="15px" icon-size="30px" mode="horizontal" align="center" padding="0">
            <mj-social-element name="facebook-noshare" href="${facebookUrl}" src="${facebookIcon}" alt="Facebook" />
            <mj-social-element name="twitter-noshare" href="${twitterUrl}" src="${twitterIcon}" alt="Twitter" />
            <mj-social-element name="instagram" href="${instagramUrl}" src="${instagramIcon}" alt="Instagram" />
          </mj-social>
        </mj-column>
      </mj-section>

      <!-- LOGOS -->
      <mj-section background-color="transparent" padding="0 40px">
        <mj-column width="45%">
          <mj-image
            src="${partnerLogoUrl}"
            alt="${partnerLogoAlt}"
            width="111px"
            align="left"
            padding="0"
            href="${partnerLinkUrl}"
          />
        </mj-column>
        <mj-column width="10%">
          <mj-spacer height="1px" />
        </mj-column>
        <mj-column width="45%">
          <mj-image
            src="${companyLogoUrl}"
            alt="${companyLogoAlt}"
            width="146px"
            align="right"
            padding="6px 0 0 0"
            href="${companyLinkUrl}"
          />
        </mj-column>
      </mj-section>

      <!-- FOOTNOTE -->
      <mj-section background-color="transparent" padding="25px 40px 24px 40px">
        <mj-column>
          <mj-text
            font-size="12px"
            line-height="16px"
            color="#363636"
            font-family="Arial, Helvetica, sans-serif"
            align="left"
            padding="0"
          >
            ${disclaimerText}
          </mj-text>
        </mj-column>
      </mj-section>
      <!-- END: Footer -->`;
};
