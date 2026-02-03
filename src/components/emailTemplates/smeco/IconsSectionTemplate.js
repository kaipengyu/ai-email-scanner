// Default icon URL for SMECO icons section
const DEFAULT_ICON_URL = 'https://s3.amazonaws.com/eoa_uploads/2026-02-01/jTyG7NNa0T4inOn1O1W5/58067-billcredit_icon_v1.png';

// Generate HTML for SMECO icons section (the "Plus" callout with icon + text)
export const generateIconsSectionHtml = (data) => {
  if (!data) return '';

  const backgroundColor = data.backgroundColor || '#E5EEEA';
  const textColor = data.textColor || '#363636';
  const iconUrl = data.iconUrl || DEFAULT_ICON_URL;
  const iconAlt = data.iconAlt || 'icon';

  return `<!-- ICONS SECTION -->
<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="${backgroundColor}" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
<div style="background:${backgroundColor};background-color:${backgroundColor};margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:${backgroundColor};background-color:${backgroundColor};width:100%;">
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
                          <td align="left" class="padding-lr-30" style="font-size:0px;padding:30px 40px 30px 40px;word-break:break-word;">
                            <table cellpadding="0" cellspacing="0" width="100%" border="0" style="color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:13px;line-height:normal;table-layout:auto;width:100%;border:none;">
                              <!-- ROW 1: Icon + Text -->
                              <tr>
                                <td valign="top">
                                  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                    <tr>
                                      <td class="respond pad-right-zero" style="padding-right:20px;font-size:0;line-height:0;mso-line-height-rule:exactly;" valign="top">
                                        <!--[if mso]><table cellpadding="0" cellspacing="0" border="0"><tr><td width="60" height="60"><![endif]-->
                                        <img src="${iconUrl}" width="60" height="60" alt="${iconAlt}" border="0" style="display:block;border:0;line-height:1;width:60px;height:60px;" />
                                        <!--[if mso]></td></tr></table><![endif]-->
                                      </td>
                                      <td valign="middle" class="respond text-center">
                                        <span style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:${textColor};">${data.textHtml || data.text || ''}</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <!-- SPACER -->
                              <tr>
                                <td height="30"></td>
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
<!-- END ICONS SECTION -->`;
};

// Generate MJML for SMECO icons section (matches HTML structure exactly)
export const generateIconsSectionMjml = (data) => {
  if (!data) return '';

  const backgroundColor = data.backgroundColor || '#E5EEEA';
  const textColor = data.textColor || '#363636';
  const iconUrl = data.iconUrl || DEFAULT_ICON_URL;
  const iconAlt = data.iconAlt || 'icon';
  const textContent = data.textMjml || data.text || '';

  return `      <!-- ICONS SECTION -->
      <mj-raw>
<!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="${backgroundColor}" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
<div style="background:${backgroundColor};background-color:${backgroundColor};margin:0px auto;max-width:600px;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:${backgroundColor};background-color:${backgroundColor};width:100%;">
    <tbody>
      <tr>
        <td style="direction:ltr;font-size:0px;padding:0;text-align:center;">
          <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td style="vertical-align:top;padding:0;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style width="100%">
                      <tbody>
                        <tr>
                          <td align="left" class="padding-lr-30" style="font-size:0px;padding:30px 40px 30px 40px;word-break:break-word;">
                            <table cellpadding="0" cellspacing="0" width="100%" border="0" style="color:#000000;font-family:Arial, Helvetica, sans-serif;font-size:13px;line-height:normal;table-layout:auto;width:100%;border:none;">
                              <tr>
                                <td valign="top">
                                  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                                    <tr>
                                      <td class="respond pad-right-zero" style="padding-right:20px;font-size:0;line-height:0;mso-line-height-rule:exactly;" valign="top">
                                        <img src="${iconUrl}" width="60" height="60" alt="${iconAlt}" border="0" style="display:block;border:0;line-height:1;width:60px;height:60px;" />
                                      </td>
                                      <td valign="middle" class="respond text-center">
                                        <span style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:${textColor};">${textContent}</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td height="30"></td>
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
        </td>
      </tr>
    </tbody>
  </table>
</div>
<!--[if mso | IE]></td></tr></table><![endif]-->
      </mj-raw>
      <!-- END ICONS SECTION -->`;
};
